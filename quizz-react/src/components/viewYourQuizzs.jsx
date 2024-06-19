import axios from "axios";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { MdSentimentDissatisfied } from "react-icons/md";

const ViewYourQuizzs = (props) => {
  const { setIsYourQuizz } = props;
  //   console.log(yourQuizzs);

  const [selectedQuizz, setSelectedQuizz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [yourQuizzsState, setYourQuizzsState] = useState("loading");


  useEffect(() => {
    axios
      .get("http://localhost:1000/fetchYourQuizzs", {
        withCredentials: true,
      })
      .then((results) => {        
        if (results.data.length > 0) {
          setYourQuizzsState(results.data);          
        } else {
          setYourQuizzsState(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleViewResult = async (quizz) => {
    const response = await axios.post(
      "http://localhost:1000/fetchYourQuizz",
      {
        quizzId: quizz._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response) {
      console.log(response.data);
      setSelectedQuizz(quizz);
      setQuestions(response.data);
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
          <h1 className="text-3xl font-bold mb-4">Your taken quizzs</h1>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => {
              setIsYourQuizz(false);
            }}
          >
            Close
          </button>
        </div>
        <br />

        <div className="space-y-2 overflow-y-auto h-5/6">
          {selectedQuizz ? (
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
                                {question.selectedIndex === question.answerIndex
                                  ? "Your answer is correct"
                                  : "Correct answer"}
                              </span>
                            )}
                            {question.selectedIndex === choiceIndex &&
                              choiceIndex !== question.answerIndex && (
                                <span className="text-red-600 font-bold ml-2">
                                  Your answer
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
          ) : (yourQuizzsState !== "loading" && yourQuizzsState ? (
            yourQuizzsState.map((quizz) => (
              <div key={quizz._id} className="bg-gray-200 rounded shadow p-4 ">
                <h2 className="text-xl font-semibold">{quizz.title}</h2>
                <p className="text-gray-700 mb-4">
                  {quizz.description.length > 100
                    ? `${quizz.description.substring(0, 100)}...`
                    : quizz.description}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleViewResult(quizz)}
                >
                  View result
                </button>
              </div>
            ))
          ) : (yourQuizzsState === "loading" ? (
            <div className="flex justify-center items-center ">
              <ClipLoader color="#4A90E2" loading={true} size={50} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <MdSentimentDissatisfied className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-500">No quizz found!</p>
            </div>
          ))
          
          )
          
          }
          
        </div>
      </div>
    </div>
  );
};

export default ViewYourQuizzs;
