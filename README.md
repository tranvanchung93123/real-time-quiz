# Real-Time Quiz Application

This is a real-time vocabulary quiz application built using **React** for the frontend, **Node.js/Express** for the backend, and **Socket.io** for real-time communication. Users can join a quiz session, submit answers, and see real-time updates on the leaderboard.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

## Features

- Real-time quiz participation with unique `quiz_id` for each session.
- Users can join a quiz session and answer questions.
- Real-time score updates as users submit answers.
- Real-time leaderboard displaying current standings of all participants.

## Architecture

The application consists of three main parts:

1. **Frontend (React)**:
   - Renders the quiz interface, allows users to join a quiz, answer questions, and view the leaderboard in real-time.
   - Connects to the backend via HTTP for joining quizzes and via WebSocket for real-time updates.
  
2. **Backend (Node.js/Express + WebSocket Server)**:
   - Handles HTTP requests for joining quizzes.
   - Manages WebSocket events for real-time quiz updates and leaderboard functionality.
   - Processes and updates user scores.

3. **WebSocket Server (Socket.io)**:
   - Integrated into the backend for real-time communication.
   - Handles events such as `quiz_data`, `submit_answer`, and `update_leaderboard`.

## Technologies

- **Frontend**: React, Socket.io-client
- **Backend**: Node.js, Express, Socket.io
- **Database**: Mock data using `quizData.js`

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/real-time-quiz-app.git
   cd real-time-quiz-app
   
2. **Install Backend Dependencies:**:
   ```bash
   npm install
   
3. **Navigate to the Frontend and Install Dependencies:**:
   ```bash
   cd client
   npm install
   
4. **Run the Backend Server:**:
   ```bash
   cd ..
   node server.js

   This will start the backend server on `http://localhost:5000`.

