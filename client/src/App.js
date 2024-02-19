import React from "react";
import Login from "./Pages/Common/Login";
import Registration from "./Pages/Common/Registration";
import Home from "./Pages/Common/Home";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Exams from "./Pages/Admin/Exams";
import AddEditExam from "./Pages/Admin/AddEditExam";
import WriteExam from "./Pages/User/WriteExam";
import UserReports from "./Pages/User/UserReports";
import AdminReports from "./Pages/Admin/AdminReports";


const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
      {/* Common routes */}
        <Route path="/login" element={<Login />}/>
        <Route path='/register' element = {<Registration />}/>
      
      {/* User Routes */}
        <Route path='/' element = {<ProtectedRoute>
            <Home />  
          </ProtectedRoute>}/>
        <Route path='/user/write-exam/:id' element = {<ProtectedRoute>
            <WriteExam />  
          </ProtectedRoute>}/>
        <Route path='/user/reports' element = {<ProtectedRoute>
            <UserReports />  
          </ProtectedRoute>}/>

      {/* Admin Routes */}
        <Route path='/admin/exams' element = {<ProtectedRoute>
            <Exams />  
          </ProtectedRoute>}/>
        <Route path='/admin/exams/add' element = {<ProtectedRoute>
            <AddEditExam />  
          </ProtectedRoute>}/>
        <Route path='/admin/exams/edit/:id' element = {<ProtectedRoute>
            <AddEditExam />  
          </ProtectedRoute>}/>
          <Route path='/admin/reports' element = {<ProtectedRoute>
            <AdminReports />  
          </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;