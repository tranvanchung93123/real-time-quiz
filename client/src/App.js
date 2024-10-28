// App.js
import React, { useState } from "react";
import Quiz from "./components/Quiz";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = async () => {
    const response = await fetch("http://localhost:5000/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, quizId }),
    });

    if (response.ok) setJoined(true);
    else alert("Failed to join quiz");
  };

  return (
    <div className="App container mt-5">
      {joined ? (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Quiz userId={userId} quizId={quizId} />
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              <h1 className="text-center mb-4">Join Quiz</h1>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quiz ID"
                  value={quizId}
                  onChange={(e) => setQuizId(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100" onClick={handleJoin}>
                Join Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
