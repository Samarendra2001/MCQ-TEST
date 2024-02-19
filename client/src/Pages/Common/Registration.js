import { Link } from "react-router-dom";
import {message} from "antd";
import { useState } from "react";
import { registerUser } from "../../ApiCalls/users";


const Registration = ()=>{
    //const [loading, setLoading] = useState(false);
    const [formData,setformData]= useState({});
    const handleChange = (e) => {
    const newFormData = {
        ...formData,
        [e.target.id]: e.target.value,
      };
  
      // Log the form data in the console
      console.log("Form Data:", newFormData);
  
      // Update the state with the new form data
      setformData(newFormData);
    };

    const handleSubmit = async(e)=>{
       e.preventDefault();
       try{
        const response = await registerUser(formData);
        if (response.success){
            message.success(response.message)
        }else{
            message.error(response.message)
        }
       }catch(error){
        message.error(error.message)
       }
    };

    return (
        <div className="bg-slate-300 p-1 m-28 shadow-lg max-w-lg mx-auto rounded-lg">
          <form onSubmit={handleSubmit}
        
            className="flex flex-col gap-4 items-center"
          >
            <h1 className="text-3xl font-semibold text-center my-7">IntelliExam - SignUp</h1>
            <input
                type="text"
                id="name"
                placeholder="name"
                className="border p-3 w-[80%] rounded-lg"
                required
                onChange = {handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="email"
              className="border p-3 w-[80%] rounded-lg"
              required
                onChange = {handleChange}
            
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              className="border p-3 w-[80%] rounded-lg"
              required
               onChange = {handleChange}           
            
            />
            <button
              //disabled={loading}
              className="border p-3 w-[80%] rounded-lg bg-blue-400 uppercase hover:opacity-90"
            >
            SignUp
            </button>
            <button className="border p-3 w-[80%] rounded-lg bg-red-600 uppercase hover:opacity-90 ">
              SignUp With Google
            </button>
          </form>
          <div className="flex gap-2 mt-5 m-2 mb-7 ">
            <p>Already have any Account?</p>
            <Link to="/login">
              <span className="text-blue-700 hover:underline">SignIn</span>
            </Link>
          </div>
        </div>
      );
}

export default Registration;