import React, { useState } from "react";
//import { useDispatch } from "react-redux";
import { addQuestionToExam, editQuestionById } from "../../ApiCalls/exams";
import { message } from "antd";
//import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function AddEditQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion,
}) {
  //const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: selectedQuestion?.name || "",
    correctOption: selectedQuestion?.correctOption || "",
    options: {
      A: selectedQuestion?.options?.A || "",
      B: selectedQuestion?.options?.B || "",
      C: selectedQuestion?.options?.C || "",
      D: selectedQuestion?.options?.D || "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onFinish = async () => {
    try {
      //dispatch(ShowLoading());

      const requiredPayload = {
        name: formData.name,
        correctOption: formData.correctOption,
        options: {
          A: formData.A,
          B: formData.B,
          C: formData.C,
          D: formData.D,
        },
        exam: examId,
      };

      let response;

      if (selectedQuestion) {
        response = await editQuestionById({
          ...requiredPayload,
          questionId: selectedQuestion._id,
        });
      } else {
        response = await addQuestionToExam(requiredPayload);
      }

      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }

      setSelectedQuestion(null);
      //dispatch(HideLoading());
    } catch (error) {
      //dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div className={`modal ${showAddEditQuestionModal ? "block" : "hidden"} fixed z-10 inset-0 overflow-y-auto`}>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Add Question</p>
            <span className="cursor-pointer text-2xl" onClick={() => setShowAddEditQuestionModal(false)}>&times;</span>
          </div>
          <form onSubmit={onFinish}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Question:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correctOption">Correct Option:</label>
              <input type="text" name="correctOption" value={formData.correctOption} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="A">Option A:</label>
                <input type="text" name="A" value={formData.A} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="B">Option B:</label>
                <input type="text" name="B" value={formData.B} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="C">Option C:</label>
                <input type="text" name="C" value={formData.C} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="D">Option D:</label>
                <input type="text" name="D" value={formData.D} onChange={handleInputChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={() => {
                setShowAddEditQuestionModal(false);
                //setSelectedQuestion(null);
              }}>Cancel</button>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEditQuestion;
