// Leaderboard.js
import React, { useEffect } from 'react';

function Leaderboard({ leaderboard }) {
  useEffect(() => {
    console.log(leaderboard);
  }, [leaderboard]);

  return (
    <div className="card shadow-sm p-4 mt-4">
      <h2 className="mb-3">Leaderboard</h2>
      {leaderboard && leaderboard.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.userId}>
                <td>{entry.userId}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No scores available yet.</p>
      )}
    </div>
  );
}

export default Leaderboard;
