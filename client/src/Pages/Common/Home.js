import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
//import PageTitle from "../../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { getAllExams } from "../../ApiCalls/exams";
import Typist from 'react-typist';

function Home() {
  const [exams, setExams] =useState([]);
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      //dispatch(ShowLoading());
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        console.error(response.message);
      }
      //dispatch(HideLoading());
    } catch (error) {
      console.error(error.message);
      //dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    user && (
      <div>
         <Typist className="cursor-none">
          <h1 className="text-3xl font-semibold mb-4">Hi {user.name}, Welcome to IntelliExam</h1>
        </Typist>

        <div className="flex flex-wrap gap-4">
          {exams.map((exam) => (
            <div className="max-w-md rounded overflow-hidden shadow-lg border border-gray-300">
              <div className="px-6 py-4">
                <div className="font-semibold text-xl mb-2">{exam.examName}</div>
                <p className="text-gray-700 text-base mb-2">Category: {exam.category}</p>
                <p className="text-gray-700 text-base mb-2">Total Marks: {exam.totalMarks}</p>
                <p className="text-gray-700 text-base mb-2">Passing Marks: {exam.passingMarks}</p>
                <p className="text-gray-700 text-base mb-2">Duration: {exam.duration}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                  onClick={() => navigate(`/user/write-exam/${exam._id}`)}
                >
                  Start Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default Home;
