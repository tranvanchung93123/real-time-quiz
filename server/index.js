// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const quizData = require('../quizData');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());

let scores = {}; // Keeps track of user scores
let leaderboards = {}; // Stores leaderboard info per quiz

// Mock function to find quiz by ID
const findQuizById = (quizId) => quizData.quizzes.find(q => q.quizId === quizId);

// Add this endpoint to retrieve quiz questions by quizId
app.get('/api/quiz/:quizId', (req, res) => {
  const quizId = req.params.quizId;
  const quiz = findQuizById(quizId);
  if (quiz) {
    res.json(quiz.questions);
  } else {
    res.status(404).json({ error: 'Quiz not found' });
  }
});

// API to join quiz
app.post('/api/join', (req, res) => {
  const { userId, quizId } = req.body;
  if (!findQuizById(quizId)) return res.status(404).json({ error: 'Quiz not found' });

  scores[userId] = 0;
  if (!leaderboards[quizId]) leaderboards[quizId] = [];
  leaderboards[quizId].push({ userId, score: 0 });

  res.json({ message: 'Joined quiz', quizId });
});

// Socket connection for real-time score and leaderboard updates
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('submit_answer', ({ userId, quizId, answer, questionIndex }) => {
    const quiz = findQuizById(quizId);
    const question = quiz?.questions[questionIndex];
    console.log('submit_answer', question);
    if (question && question.answer === answer) {
      scores[userId] = (scores[userId] || 0) + 1;

      const leaderboard = leaderboards[quizId].find(l => l.userId === userId);
      leaderboard.score = scores[userId];
    }

    // Emit updated leaderboard to all users in the quiz room
    console.log("update_leaderboardupdate_leaderboard", leaderboards[quizId])
    io.emit('update_leaderboard', leaderboards[quizId]);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
