import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../ApiCalls/exams";
import Instructions from "./Instructions";
import { addReport } from "../../ApiCalls/reports";
import { useSelector } from "react-redux";

const WriteExam = () => {
  const [examData, setExamData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("instructions");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result,setResult] = useState([]);
  const [timeUp,setTimeUp]= useState(false);
  const[secondsLeft=0,setSecondsLeft]= useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useSelector((state) => state.users);
  const getExamData = async () => {
    try {
      const response = await getExamById({
        examId: params.id,
      });
      if (response.success) {
        setExamData(response.data);
        setQuestions(response.data.questions);
        setSecondsLeft(response.data.duration)
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handlePreviousClick = () => {
    if (selectedQuestionIndex > 0) {
      setSelectedQuestionIndex(selectedQuestionIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (selectedQuestionIndex < questions.length - 1) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
    }
  };
  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };
      setResult(tempResult);
      //dispatch(ShowLoading());
      const response = await addReport({
        exam: params.id,
        result: tempResult,
        user: user._id,
      });
      //dispatch(HideLoading());
      if (response.success) {
        setView("result");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      //dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, [params.id]);
  
  return (
    examData && (
      <div className="mt-2">
        <div className="flex justify-center items-center border-b border-gray-200 py-4">
          <h1 className="text-3xl font-sans text-center">{examData.examName}</h1>
        </div>

        {view === "instructions" && (
          <Instructions examData={examData} setView={setView} startTimer ={startTimer} />
        )}

        {view === "questions" && (
          <div className="p-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">
              Question {selectedQuestionIndex + 1}:
              {questions[selectedQuestionIndex].name}
            </h2>
            <div className="timer">
            <span className="text-2xl">{secondsLeft}</span>
            </div>
          </div>
            <div className="space-y-4">
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-start p-2 rounded-lg cursor-pointer ${
                      selectedOptions[selectedQuestionIndex] === option
                        ? "bg-blue-100"
                        : "bg-white"
                    }`}
                    onClick={() =>
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuestionIndex]: option,
                      })
                    }
                  >
                    <span className="font-semibold">{option}</span> :{" "}
                    {questions[selectedQuestionIndex].options[option]}
                  </div>
                )
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedQuestionIndex === 0 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"
                }`}
                onClick={handlePreviousClick}
                disabled={selectedQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                className={`px-4 py-2 rounded-md ${
                  selectedQuestionIndex === questions.length - 1 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"
                }`}
                onClick={handleNextClick}
                disabled={selectedQuestionIndex === questions.length - 1}
              >
                Next
              </button>
              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    clearInterval(intervalId);
                    setTimeUp(true);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
        {view === "result" && (
          <div className="flex items-center mt-8 justify-center result">
            <div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-semibold">RESULT</h1>
            <div className="divider w-20 border-b-2 border-gray-400"></div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                <h2 className="text-lg font-medium">Total Marks:</h2>
                <p className="text-lg">{examData.totalMarks}</p>
                </div>
                <div className="flex justify-between">
                <h2 className="text-lg font-medium">Obtained Marks:</h2>
                <p className="text-lg">{result.correctAnswers.length}</p>
                </div>
                <div className="flex justify-between">
                <h2 className="text-lg font-medium">Wrong Answers:</h2>
                <p className="text-lg">{result.wrongAnswers.length}</p>
                </div>
                <div className="flex justify-between">
                <h2 className="text-lg font-medium">Passing Marks:</h2>
                <p className="text-lg">{examData.passingMarks}</p>
                </div>
                <div className="flex justify-between">
                <h2 className="text-lg font-medium">VERDICT:</h2>
                <p className="text-lg">{result.verdict}</p>
                </div>
            </div>
            </div>
            <div className="ml-8">
            {result.verdict === "Pass" && (
                <lottie-player
                src="https://assets2.lottiefiles.com/packages/lf20_ya4ycrti.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: "200px", height: "200px" }}
                ></lottie-player>
            )}
            {result.verdict === "Fail" && (
                <lottie-player
                src="https://assets4.lottiefiles.com/packages/lf20_qp1spzqv.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: "200px", height: "200px" }}
                ></lottie-player>
            )}
            </div>
          </div>
       )}
      </div>
    )
  );
};

export default WriteExam;
