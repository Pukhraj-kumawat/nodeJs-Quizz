import React, { useState, useEffect } from "react";
import axios from "axios";


const CreateQuizz = (props) => {
  const { setIsModalOpen } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionBody: "", choices: ["", "", "", ""], answerIndex: 0 },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuestions([{ questionBody: "", choices: ["", "", "", ""] }]);
    setCurrentQuestionIndex(0);
  };

  const handleAddQuestion = () => {
    let newQuestions = [...questions];
    if (
      !(
        newQuestions[currentQuestionIndex].questionBody &&
        newQuestions[currentQuestionIndex].choices.every(
          (element) => element !== ""
        )
      )
    ) {
      alert("Fields cannot be empty");
      return;
    }
    newQuestions = [
      ...questions,
      { questionBody: "", choices: ["", "", "", ""], answerIndex: 0 },
    ];
    setQuestions(newQuestions);
    setCurrentQuestionIndex(newQuestions.length - 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handleQuestionChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].questionBody = event.target.value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (choiceIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].choices[choiceIndex] =
      event.target.value;
    setQuestions(newQuestions);
  };

  const handleSelectChoice = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].answerIndex = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ title, questions });
    // Submit the form data to your server or handle it as needed
    const createQuizzResponse = async () => {
      const response = await axios.post(
        "http://localhost:1000/createQuizz",
        {
          questions: questions,
          title: title,
          description:description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setIsModalOpen(false);
        window.location.reload();
      }
    };
    createQuizzResponse();
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-75 overflow-y-auto flex justify-center items-center transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6  rounded shadow-lg my-10 max-h-screen overflow-y-auto  transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-modal">
        <div class="overflow-auto max-h-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Quiz Title
              </label>
              <input
                required
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-2"
              />

              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                required
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-32 h-20"
              />
            </div>
            {questions.map(
              (question, index) =>
                index === currentQuestionIndex && (
                  <div key={index} className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`question-${index}`}
                    >
                      Question {index + 1}
                    </label>
                    <input
                      type="text"
                      required
                      id={`question-${index}`}
                      value={question.questionBody}
                      onChange={handleQuestionChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    <div className="flex flex-wrap justify-between">
                      {["A", "B", "C", "D"].map((choiceLabel, choiceIndex) => (
                        <div key={choiceIndex} className="w-1/2  p-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-1"
                            htmlFor={`question-${index}-choice-${choiceIndex}`}
                          >
                            Choice {choiceLabel}
                          </label>
                          <input
                            required
                            type="text"
                            id={`question-${index}-choice-${choiceIndex}`}
                            value={question.choices[choiceIndex]}
                            onChange={(e) => handleChoiceChange(choiceIndex, e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}

            <div className="flex items-center justify-between">
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-1" /*htmlFor={`question-${index}-correct-answer`}*/
                >
                  Correct Answer
                </label>
                <select
                  // id={`question-${index}-correct-answer`}
                  // value={question.correctAnswer}
                  onChange={handleSelectChoice}
                  className="shadow appearance-none border rounded w-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  {["A", "B", "C", "D"].map((choiceLabel, choiceIndex) => (
                    <option key={choiceIndex} value={choiceIndex} required>
                      {`Option ${choiceLabel}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Question
                </button>
              </div>
            </div>

            {/* <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handlePreviousQuestion}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextQuestion}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        </div> */}

            <br />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizz;
