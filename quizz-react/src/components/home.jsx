import React, { useState, useEffect } from "react";
import axios from "axios";
import { useData } from "./dataContext";
import CreateQuizz from "./createQuizz";
import ListQuizzs from "./listQuizzs";
import ViewCreatedQuizz from "./viewCreatedQuizzs";
import ViewYourQuizzs from "./viewYourQuizzs";
import { ClipLoader } from "react-spinners";

const Home = (props) => {
  const { setIsLoggedIn } = props;
  const [userName, setUserName] = useState();
  const [allQuizzs, setAllQuizzs] = useState();
  const [yourCreatedQuizzs, setYourCreatedQuizzs] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatedQuizz, setIsCreatedQuizz] = useState(false);
  const [isYourQuizz, setIsYourQuizz] = useState(false);
  // const [yourQuizzs,setYourQuizzs] = useState()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:1000/home", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        // console.log(response.data);
        if (response.status === 200 && response.data.userInfo) {
          setUserName(response.data.userInfo.name);
          setAllQuizzs(response.data.allQuizzs);
          // setYourQuizzs(response.data.takenQuizzs)
          setYourCreatedQuizzs(response.data.createdQuizzs);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          localStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
        }
      }
    })();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {userName ? (
        <div>
          <div className="flex flex-row justify-between p-4">
            <div>
              <p className="ml-4">
                Welcome, <b>{userName} </b>
              </p>

              <div className="flex flex-row justify-between m-4 ">
                <button
                  className="bg-yellow-200 hover:bg-yellow-300 font-bold text-yellow  py-2 px-2 mr-2 rounded "
                  onClick={() => {
                    setIsCreatedQuizz(true);
                  }}
                >
                  Created quizzs
                </button>
                <button
                  className="bg-purple-200 hover:bg-purple-300 font-bold text-yellow  py-2 px-4 rounded "
                  onClick={() => {
                    setIsYourQuizz(true);
                  }}
                >
                  Your quizzs
                </button>
              </div>
            </div>
            <div className="">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleOpenModal}
              >
                Create quizz
              </button>
            </div>
          </div>

          {isModalOpen && <CreateQuizz setIsModalOpen={setIsModalOpen} />}

          {allQuizzs && <ListQuizzs quizzs={allQuizzs} />}

          {isCreatedQuizz && yourCreatedQuizzs && (
            <ViewCreatedQuizz
              setIsCreatedQuizz={setIsCreatedQuizz}
              yourCreatedQuizzs={yourCreatedQuizzs}
            />
          )}

          {isYourQuizz && <ViewYourQuizzs setIsYourQuizz = {setIsYourQuizz} /> }
            
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color="#4A90E2" loading={true} size={100} />
        </div>
      )}
    </>
  );
};

export default Home;
