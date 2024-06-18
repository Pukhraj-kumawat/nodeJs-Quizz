import React, { useState, useEffect } from "react";
import axios from "axios";

const TakeQuizz = (props) => {
  const { takeQuizzId,setTakeQuizzId } = props;

  const [quizz, setQuizz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timer, setTimer] = useState(120);
  const [selectedIndex,setSelectedIndex] = useState(null)
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    axios
      .post(
        "http://localhost:1000/takeQuizz",
        {
          quizzId: takeQuizzId,
        },
        {
          withCredentials: true,
        }
      )
      .then((quizzResponse) => {
        setQuizz(quizzResponse.data.quizz);
        setQuestions(quizzResponse.data.questions);
        startTimer()
        console.log(quizzResponse.data);
      });
  }, []);

  const handleAnswerSelect = (choice,index) => {
    setSelectedAnswer(choice);
    setSelectedIndex(index)
  };

  const handleSubmitAnswer = async () => {    
    try {
        console.log(questions[currentQuestionIndex]._id);
      const response = await axios.post('http://localhost:1000/submitQuizz', {
        quizzId: quizz._id,
        questionId: questions[currentQuestionIndex]._id,
        selectedIndex: selectedIndex,
      },
      {
        withCredentials:true,
      });

    //   console.log(response.data);
      nextQuestion();
    } catch (error) {
      console.error('Error submitting answer:', error);

    }
    
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      resetTimer();
    } else {      
      console.log('Quiz completed!');
      setTakeQuizzId(null)
      window.location.reload();
      
    }
    console.log("next question clicked");
    startTimer()
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  
  const resetTimer = () => {
    setTimer(120);
    setTimerRunning(false);
  };

  useEffect(() => {
    let interval;
    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      
      nextQuestion();
    }

    return () => clearInterval(interval);
  }, [timerRunning, timer]);



  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50">
        {questions && quizz ? (
          <div className="flex bg-white p-6 rounded shadow-lg mt-20 mb-2 mx-8 max-h-screen overflow-y-auto  transform transition-transform duration-300 ease-in-out scale-95 opacity-0 animate-modal">
            <div className="w-3/5 px-6">
              <h1 className="text-lg font-semibold mb-4">{quizz.title}</h1>
              <p className="text-gray-700 mb-4">{quizz.description}</p>
            </div>
            <div className="flex flex-col items-center justify-center  w-2/5 ">
              <div className="max-w-lg w-full p-4 bg-white shadow-md rounded-md">
                <h2 className="text-lg font-semibold mb-4 select-none">
                  {questions[currentQuestionIndex].questionBody}
                </h2>
                <ul className="space-y-2 select-none ">
                  {questions[currentQuestionIndex].choices.map(
                    (choice, index) => (
                      <li
                        key={index}
                        className={`p-2 cursor-pointer ${
                          selectedAnswer === choice
                            ? "bg-blue-200"
                            : "bg-gray-100"
                        }`}
                        onClick={() => handleAnswerSelect(choice,index)}
                      >
                        {choice}
                      </li>
                    )
                  )}
                </ul>
                <button
                  className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded-md ${
                    selectedAnswer ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                >
                  Submit Answer
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Time remaining: {Math.floor(timer / 60)}:
                {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading quiz...</p>
        )}
      </div>
    </>
  );
};

export default TakeQuizz;
