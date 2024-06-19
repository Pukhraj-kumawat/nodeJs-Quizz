import React, { useState, useEffect } from "react";
import TakeQuizz from "./takeQuizz";
import { MdSentimentDissatisfied } from "react-icons/md";

const ListQuizzs = (props) => {
  const [takeQuizzId, setTakeQuizzId] = useState(null);
  const { quizzs } = props;

  const handleTakeQuiz = (quizId) => {
    setTakeQuizzId(quizId);
  };

  const truncateDescription = (description) => {
    if (description && description.length > 100) {
      return description.substring(0, 75) + "...";
    }
    return description;
  };

  return (
    <div className="container mx-auto p-4">
      {takeQuizzId ? (
        <TakeQuizz takeQuizzId={takeQuizzId} setTakeQuizzId={setTakeQuizzId} />
      ) : quizzs.length > 0 ? (
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
              <br /> <br />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute bottom-4 right-4"
                onClick={() => handleTakeQuiz(quizz._id)}
              >
                Take Quiz
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">  
        <br /><br /><br /><br /><br /><br /><br />        
          <MdSentimentDissatisfied className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500">No quizz found!</p>
        </div>
      )}
    </div>
  );
};

export default ListQuizzs;
