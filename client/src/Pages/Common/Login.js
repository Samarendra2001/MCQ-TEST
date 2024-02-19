import { Link } from "react-router-dom";
import { useState } from "react";
import {message} from "antd";
import { loginUser } from "../../ApiCalls/users";



const Login = ()=>{
    //const [loading, setLoading] = useState(false);
    const [formData,setformData]= useState({});
    const handleChange = (e)=>{
        setformData({
            ...formData,[e.target.id]:e.target.value,
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await loginUser(formData);
            if (response.success){
                message.success(response.message)
                localStorage.setItem("token",response.data);
                window.location.href = "/"
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
            <h1 className="text-3xl font-semibold text-center my-7">IntelliExam - LogIn</h1>
            <input
              type="email"
              id="email"
              placeholder="email"
              className="border p-3 w-[80%] rounded-lg"
              required
              onChange={handleChange}
            
            />
            <input
              type="password"
              id="password"
              placeholder="password"
              className="border p-3 w-[80%] rounded-lg"
              required
              onChange={handleChange}
            />
            <button
              //disabled={loading}
              className="border p-3 w-[80%] rounded-lg bg-blue-400 uppercase hover:opacity-90"
            >
            SignIn
            </button>
            <button className="border p-3 w-[80%] rounded-lg bg-red-600 uppercase hover:opacity-90 ">
              SignIn With Google
            </button>
          </form>
          <div className="flex gap-2 mt-5 m-2 mb-7 ">
            <p>Don't have any Account?</p>
            <Link to="/register">
              <span className="text-blue-700 hover:underline">SignUp here</span>
            </Link>
          </div>
        </div>
      );
}

export default Login;