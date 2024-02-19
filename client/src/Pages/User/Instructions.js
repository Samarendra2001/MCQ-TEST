import { useNavigate } from "react-router-dom";

const Instructions = ({ examData, setView,startTimer }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="">
        <h1 className="text-3xl font-semibold mb-4 underline">Instructions</h1>
        <ul className="list-disc text-left">
          <li className="mb-2">
            Exam must be completed in <span className="font-bold">{examData.duration}</span> seconds.
          </li>
          <li className="mb-2">
            Exam will be submitted automatically after <span className="font-bold">{examData.duration}</span> seconds.
          </li>
          <li className="mb-2">Once submitted, you cannot change your answers.</li>
          <li className="mb-2">Do not refresh the page.</li>
          <li className="mb-2">
            You can use the <span className="font-bold">"Previous"</span> and <span className="font-bold">"Next"</span> buttons to navigate between questions.
          </li>
          <li>
            Total marks of the exam is <span className="font-bold">{examData.totalMarks}</span>, and passing marks are{" "}
            <span className="font-bold">{examData.passingMarks}</span>.
          </li>
        </ul>
      </div>

      <div className="flex gap-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigate("/")}
        >
          CLOSE
        </button>
        <button 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() =>{
            startTimer();
            setView("questions")}}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
};

export default Instructions;
