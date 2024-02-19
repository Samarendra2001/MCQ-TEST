
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { deleteExamById, getAllExams } from '../../ApiCalls/exams';
//import { ShowLoading, HideLoading } from 'your-loading-actions';

const Exams = ()=>{
  const navigate = useNavigate();
  const [exams, setExams] =useState([]);
  //const dispatch = useDispatch();

  const getExamsData = async () => {
    try {
      //dispatch(ShowLoading());
      const response = await getAllExams();
      //dispatch(HideLoading());
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      //dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
      //dispatch(ShowLoading());
      const response = await deleteExamById({
        examId,
      });
      //dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
     // dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExamsData();
  }, []);
  
  const handleEdit = (examId) => {
    navigate(`/admin/exams/edit/${examId}`);
  };


  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
      <h1 className="text-3xl font-sans">Exams</h1>
        <button className=" text-indigo-400 font-serif p-3 pl-5 pr-5 border-[3px] border-solid border-indigo-400" onClick={()=>navigate("/admin/exams/add")}>
        <i className="ri-add-line"></i>
            Add Exam
        </button>
      </div>
      <hr className="my-4 border-t-2 border-solid border-gray-300" />

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Exam Name</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Total Marks</th>
            <th className="px-4 py-2">Passing Marks</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id} onClick={() => handleEdit(exam._id)} className="cursor-pointer">
              <td className="border px-4 py-2">{exam.examName}</td>
              <td className="border px-4 py-2">{exam.duration}</td>
              <td className="border px-4 py-2">{exam.category}</td>
              <td className="border px-4 py-2">{exam.totalMarks}</td>
              <td className="border px-4 py-2">{exam.passingMarks}</td>
              <td className="border px-4 py-2 flex gap-2 items-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 ri-pencil-line  gap-2"
                  onClick={(e) => {
                      e.stopPropagation(); // Prevent the row click event from being triggered
                      handleEdit(exam._id);
                    }}
                >
                
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 ri-delete-bin-line"
                  onClick={() => deleteExam(exam._id)}
                >
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Exams;
