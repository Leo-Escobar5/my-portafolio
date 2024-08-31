import { Component, OnInit, OnDestroy } from '@angular/core';
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
  public nameInput: string = '';
  public userIdInput: string = ''; // ID único del usuario ingresado por el usuario
  public roomInput: string = 'sala1'; // Sala por defecto
  public userId: string = ''; // ID del usuario generado o ingresado

  ngOnInit() {
    this.socket = io('http://localhost:3000');

    // Cargar mensajes anteriores de la sala seleccionada
    this.socket.on('loadMessages', (loadedMessages: { name: string; message: string }[]) => {
      this.messages = loadedMessages;
    });

    // Escuchar nuevos mensajes
    this.socket.on('mensaje', (data: { name: string; message: string }) => {
      this.messages.push(data);
    });

    // Escuchar la lista de usuarios en la sala
    this.socket.on('roomUsers', (users: { userId: string; name: string }[]) => {
      this.users = users;
    });

    // Escuchar la confirmación de que el usuario abandonó la sala
    this.socket.on('userLeft', (message: string) => {
      alert(message); // Mensaje de confirmación
    });
  }

  // Método para unirse a una sala
  joinRoom() {
    if (this.nameInput.trim() === '' || this.userIdInput.trim() === '') {
      alert('Por favor, ingresa tu nombre y un ID único.');
      return;
    }

    this.userId = this.userIdInput; // Asignar el ID ingresado por el usuario
    this.socket.emit('joinRoom', { room: this.roomInput, name: this.nameInput, userId: this.userId });
  }

  // Método para enviar mensajes
  sendMessage() {
    if (this.messageInput.trim() !== '' && this.nameInput.trim() !== '') {
      this.socket.emit('mensaje', {
        room: this.roomInput, // Enviar la sala junto con el mensaje
        name: this.nameInput,
        message: this.messageInput,
      });
      this.messageInput = ''; // Limpiar el campo de entrada de mensaje
    }
  }

  // Método para abandonar la sala
  leaveRoom() {
    this.socket.emit('leaveRoom', { room: this.roomInput, userId: this.userId });
    this.messages = []; // Limpiar los mensajes de la sala
    this.users = []; // Limpiar la lista de usuarios
  }

  ngOnDestroy() {
    // Desconectar el socket cuando el componente se destruya
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
