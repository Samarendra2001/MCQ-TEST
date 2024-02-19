import { useState,useEffect } from "react";
import { addExam, editExamById, getExamById } from "../../ApiCalls/exams";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AddEditQuestion from "./AddEditQuestion";

const AddEditExam = ()=>{

    const params = useParams();
    const [questions, setQuestions] = useState([]);
    const [formData,setformData] = useState({});
    const [examData, setExamData] =useState(null);
    const [activeTab, setActiveTab] = useState("examDetails");
    const navigate = useNavigate();
    const [showAddEditQuestionModal, setShowAddEditQuestionModal] = useState(false);
    const handleChange = (e)=>{
        setformData({
            ...formData,[e.target.id]:e.target.value,
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
          let response;
          if(params.id){
            response = await editExamById({
              ...formData,
              examId:params.id,
            });
          }
         else {
          response = await addExam(formData);
         }
         if (response.success){
             message.success(response.message)
             navigate("/admin/exams");
         }else{
             message.error(response.message)
         }
        }catch(error){
         message.error(error.message)
        }
     };
     const getExamData = async () => {
      try {
        //dispatch(ShowLoading());
        const response = await getExamById({
          examId: params.id,
        });
        //dispatch(HideLoading());
        if (response.success) {
          setExamData(response.data);
          setformData(response.data);
          //console.log(formData)
          if (response.data && response.data.questions) {
            setQuestions(response.data.questions);
          } else {
            setQuestions([]);
          }
        } else {
          message.error(response.message);
        }
      } catch (error) {
        //dispatch(HideLoading());
        message.error(error.message);
      }
    };
    const handleEditQuestion = (questionId) => {
      // Logic to handle edit question
    };
  
    // Function to handle delete question
    const handleDeleteQuestion = (questionId) => {
      // Logic to handle delete question
    };
  
    useEffect(() => {
      if (params.id) {
        getExamData();
      }
    }, [params.id]);
    return (<div>
        {params.id ? "Edit Exam" : "Add Exam"} 
        {params.id && (  
        <div className="mb-4">
          <button
            className={`mr-4 px-4 py-2 ${
              activeTab === "examDetails" ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded-md`}
            onClick={() => setActiveTab("examDetails")}
          >
            Exam Info
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "questionDetails" ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded-md`}
            onClick={() => setActiveTab("questionDetails")}
          >
            Question Info
          </button>
        </div>
      )}

        {activeTab === "examDetails" && (
          //exam details content goes here
              <form className="grid grid-cols-3 gap-4 mb-4 border-r-2 border-solid" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="examName" className="block text-sm font-medium text-gray-700">Exam Name</label>
                  <input type="text" id="examName" name="examName" className="mt-1 p-2 border rounded-md w-full border-r-2 border-solid " onChange={handleChange} value={formData.examName || ''}  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                  <input type="number" id="duration" name="duration" className="mt-1 p-2 border rounded-md w-full border-r-2 border-solid " onChange={handleChange} value={formData.duration || ''} />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <select name="category" id="category" className="mt-1 p-2 border rounded-md w-full border-r-2 border-solid " onChange={handleChange} value={formData.category || ''} >
                    <option value="">Select Category</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Node">Node</option>
                    <option value="MongoDB">MongoDB</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="totalMarks" className="block text-sm font-medium text-gray-700">Total Marks</label>
                  <input type="number" id="totalMarks" name="totalMarks" className="mt-1 p-2 border rounded-md w-full border-r-2 border-solid " onChange={handleChange} value={formData.totalMarks || ''}  />
                </div>
                <div>
                  <label htmlFor="passingMarks" className="block text-sm font-medium text-gray-700">Passing Marks</label>
                  <input type="number" id="passingMarks" name="passingMarks" className="mt-1 p-2 border rounded-md w-full border-r-2 border-solid " onChange={handleChange} value={formData.passingMarks || ''} />
                </div>

                    <div class="flex justify-end mt-4">
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                    </div>

              </form>
          
        )}

        {activeTab === "questionDetails" && (
        <div>
          <div className="flex justify-end mt-2 ">
            <button
              className="text-indigo-400 font-serif p-3 pl-5 pr-5 border-[3px] border-solid border-indigo-400"
              onClick={() => setShowAddEditQuestionModal(true)}
            >
              <i className="ri-add-line"></i>
              Add Questions
            </button>
          </div>
          <div className="mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Options
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correct Option
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{question.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Object.entries(question.options).map(([key, value]) => (
                        <div key={key}>{`${key}: ${value}`}</div>
                      ))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`${question.correctOption}. ${question.options[question.correctOption]}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 ri-pencil-line text-xl"
                        onClick={() => handleEditQuestion(question)}
                      >
                        
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900 ml-4 ri-delete-bin-line text-xl "
                        onClick={() => handleDeleteQuestion(question)}
                      >
                      
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

        {showAddEditQuestionModal && (
        <AddEditQuestion
          setShowAddEditQuestionModal={setShowAddEditQuestionModal}
          showAddEditQuestionModal={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
        />
      )}
        
</div>

    

    )
}

export default AddEditExam;