import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nodejs-api',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nodejs-api.component.html',
  styleUrls: ['./nodejs-api.component.css']
})
export class NodejsApiComponent implements OnInit, OnDestroy {

  private socket!: Socket;
  public messages: { name: string; message: string }[] = [];
  public users: { userId: string; name: string }[] = []; // Usuarios en la sala
  public messageInput: string = '';
  public userName: string = '';
  public roomInput: string = 'sala1'; // Sala por defecto
  public userId: string = '';
  public isInRoom: boolean = false; // Estado de si el usuario está en una sala
  public rooms: string[] = ['sala1', 'sala2', 'sala3', 'sala4', 'sala5', 'sala6', 'sala7', 'sala8', 'sala9', 'sala10'];

  constructor(private ngZone: NgZone) { } // Cambiado 'zone' a 'ngZone' para consistencia

  ngOnInit() {
    // Obtener datos del usuario de localStorage
    const token = localStorage.getItem('authToken');
    this.userId = localStorage.getItem('userId') || '';
    this.userName = localStorage.getItem('firstName') || '';
    const storedRoom = localStorage.getItem('currentRoom');
    console.log('Token obtenido:', token);
    console.log('ID de usuario obtenido:', this.userId);
    console.log('Nombre de usuario obtenido:', this.userName);
    console.log('Sala almacenada:', storedRoom);

    // Conectar al servidor de Socket.IO y enviar el token en el handshake
    this.socket = io('http://20.127.152.201:3000', {
      auth: {
        token: token
      }
    });

    // Cuando el socket se conecte, verifica si hay una sala almacenada
    this.socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
      if (storedRoom) {
        this.roomInput = storedRoom;
        this.joinRoom();
      }
    });

    // Manejadores de eventos del socket
    this.socket.on('loadMessages', (loadedMessages: { name: string; message: string }[]) => {
      this.ngZone.run(() => {
        this.messages = loadedMessages;
        this.isInRoom = true;
        console.log('Evento loadMessages recibido, isInRoom establecido a true');
      });
    });

    this.socket.on('mensaje', (data: { name: string; message: string }) => {
      this.ngZone.run(() => {
        this.messages.push(data);
      });
    });

    this.socket.on('roomUsers', (users: { userId: string; name: string }[]) => {
      this.ngZone.run(() => {
        // Eliminar duplicados basados en userId
        const uniqueUsersMap = new Map<string, { userId: string; name: string }>();
        users.forEach(user => {
          uniqueUsersMap.set(user.userId, user);
        });
        this.users = Array.from(uniqueUsersMap.values());
      });
    });

    this.socket.on('userLeft', (message: string) => {
      this.ngZone.run(() => {
        alert(message); // Mensaje de confirmación
        this.isInRoom = false;
        this.messages = [];
        this.users = [];
        console.log('Evento userLeft recibido, isInRoom establecido a false');
      });
    });

    this.socket.on('disconnect', () => {
      this.ngZone.run(() => {
        console.log('Desconectado del servidor de Socket.IO');
        this.isInRoom = false;
      });
    });
  }

  joinRoom() {
    if (!this.isInRoom) {
      this.socket.emit('joinRoom', { room: this.roomInput, name: this.userName, userId: this.userId });
      this.isInRoom = true;
      console.log('Unido a la sala:', this.roomInput, 'isInRoom:', this.isInRoom);
      // Almacena la sala en localStorage
      localStorage.setItem('currentRoom', this.roomInput);
    }
  }

  sendMessage() {
    if (this.messageInput.trim() !== '' && this.userName.trim() !== '') {
      this.socket.emit('mensaje', {
        room: this.roomInput,
        name: this.userName,
        message: this.messageInput,
      });
      this.messageInput = '';
    }
  }

  leaveRoom() {
    if (this.isInRoom) {
      this.socket.emit('leaveRoom', { room: this.roomInput, userId: this.userId });
      // Limpiar la sala de localStorage
      localStorage.removeItem('currentRoom');
      this.isInRoom = false;
      this.messages = [];
      this.users = [];
      console.log('Abandonaste la sala, isInRoom establecido a false');
    }
  }

  ngOnDestroy() {
    if (this.socket) {
      if (this.isInRoom) {
        this.leaveRoom();
      }
      this.socket.disconnect();
    }
    this.isInRoom = false;
  }
}
