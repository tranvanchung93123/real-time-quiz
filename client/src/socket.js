// socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Initialize socket connection once

export default socket; // Export this single socket instance
