import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdSentimentDissatisfied } from "react-icons/md";

const ViewCreatedQuizz = (props) => {
  const { yourCreatedQuizzs, setIsCreatedQuizz } = props;
  const [selectedQuizz, setSelectedQuizz] = useState(null);
  const [questions, setQuestions] = useState(null);


  const handleViewInfo = async (quizz) => {
    const questionsRes = await axios.post(
      "http://localhost:1000/fetchQuestions",
      {
        questionsIds: quizz.questions,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (questionsRes) {
      console.log(questionsRes);
      setSelectedQuizz(quizz);
      setQuestions(questionsRes.data);
    }
  };

  const handleClosePopup = () => {
    setSelectedQuizz(null);
  };

  return (
    <div className="fixed inset-0  bg-gray-800 bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ease-in-out">
      {/* <h1 className="text-2xl font-bold mb-4">Your Quizzes</h1> */}

      <div className=" bg-white p-4 rounded shadow h-4/5 w-4/5  ">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold mb-4">Your created quizzs</h1>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => {
              setIsCreatedQuizz(false);
            }}
          >
            Close
          </button>
        </div>
        <br />

        <div className="space-y-2 overflow-y-auto h-5/6">

          {selectedQuizz && questions ? (
            <div className="bg-gray-200 rounded shadow px-2 py-6 h-full">
              <h2 className="text-xl font-semibold px-4">
                {selectedQuizz.title}
              </h2>
              <p className="text-gray-700 mb-2 px-4">
                {selectedQuizz.description}
              </p>
              <div className="overflow-y-auto h-4/5">
                <div className="p-4 ">
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 bg-gray-100 rounded shadow"
                    >
                      <h2 className="text-lg font-semibold">
                        {index + 1}. {question.questionBody}
                      </h2>
                      <ul className="mt-2 list-disc pl-5">
                        {question.choices.map((choice, choiceIndex) => (
                          <p key={choiceIndex} className="mt-1">
                            <b>{String.fromCharCode(65 + choiceIndex)}</b> .{" "}
                            {choice}
                            {question.answerIndex === choiceIndex && (
                              <span className="text-green-600 font-bold ml-2">
                                Correct option
                              </span>
                            )}
                          </p>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : yourCreatedQuizzs.length > 0 ? (
            yourCreatedQuizzs.map((quizz) => (
              <div key={quizz._id} className="bg-gray-200 rounded shadow p-4 ">
                <h2 className="text-xl font-semibold">{quizz.title}</h2>
                <p className="text-gray-700 mb-4">
                  {quizz.description.length > 100
                    ? `${quizz.description.substring(0, 100)}...`
                    : quizz.description}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleViewInfo(quizz)}
                >
                  View Info
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <MdSentimentDissatisfied className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500">No quizz found!</p>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default ViewCreatedQuizz;
