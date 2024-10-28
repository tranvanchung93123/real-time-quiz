// Quiz.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Leaderboard from "./Leaderboard";

const socket = io("http://localhost:5000");

function Quiz({ userId, quizId }) {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/quiz/${quizId}`
        );
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch quiz questions:", error);
      }
    };
    fetchQuestions();

    socket.on("update_leaderboard", (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
    });

    return () => {
      socket.off("update_leaderboard");
    };
  }, [quizId]);

  const handleSubmitAnswer = () => {
    if (questionIndex < questions.length) {
      socket.emit("submit_answer", { userId, quizId, answer, questionIndex });
      setAnswer("");

      if (questionIndex + 1 < questions.length) {
        setQuestionIndex((prev) => prev + 1);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  return (
    <div className="container mt-5">
      {quizCompleted ? (
        <h2 className="text-success text-center">
          Quiz Completed! Thank you for participating.
        </h2>
      ) : questions.length > 0 ? (
            <div className="card shadow-sm p-4 mb-4">
              <h2 className="mb-4">
                Question: {questions[questionIndex].question}
              </h2>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Your Answer"
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitAnswer}
                >
                  Submit
                </button>
              </div>
            </div>
      ) : (
        <p className="text-center">Loading questions...</p>
      )}
      <Leaderboard leaderboard={leaderboard} />
    </div>
  );
}

export default Quiz;
