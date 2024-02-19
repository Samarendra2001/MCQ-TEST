import React, { useEffect, useState } from "react";
import moment from "moment";
import { getAllReports } from "../../ApiCalls/reports";
import { message } from "antd";

const AdminReports=()=> {
  const [reportsData, setReportsData] = useState([]);
  //const dispatch = useDispatch();

  const getData = async () => {
    try {
      //dispatch(ShowLoading());
      const response = await getAllReports();
      if (response.success) {
        setReportsData(response.data);
    } else {
        message.error(response.message);
      }
      //dispatch(HideLoading());
    } catch (error) {
      //dispatch(HideLoading());
      message.error(error.message);
    }
  }      

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Reports</h1>
      <div className="divider border-t border-gray-300 my-4"></div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exam Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Marks
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Passing Marks
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Obtained Marks
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Verdict
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reportsData.map((report, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {report.exam.examName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {report.user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {moment(report.createdAt).format("DD-MM-YYYY hh:mm:ss")}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {report.exam.totalMarks}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {report.exam.passingMarks}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {report.result.correctAnswers.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {report.result.verdict}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReports;
