import React, { useState, useEffect } from "react";
import TakeQuizz from "./takeQuizz";

const ListQuizzs = (props) => {
  const [takeQuizzId, setTakeQuizzId] = useState(null);
  const { quizzs } = props;

  const handleTakeQuiz = (quizId) => {
    console.log("Taking quiz with ID:", quizId);
    setTakeQuizzId(quizId);
  };

  const truncateDescription = (description) => {
    if (description && description.length > 100) {
      return description.substring(0, 100) + "...";
    }
    return description;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Quizzs</h1>

      {takeQuizzId ? (
        <TakeQuizz takeQuizzId={takeQuizzId} setTakeQuizzId = {setTakeQuizzId} />
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {quizzs.map((quizz, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              <h2 className="text-xl font-semibold mb-2">{quizz.title}</h2>
              <p className="text-gray-700 mb-4">
                {truncateDescription(quizz.description)}
              </p>
              <br />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute bottom-4 right-4"
                onClick={() => handleTakeQuiz(quizz._id)}
              >
                Take Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListQuizzs;
