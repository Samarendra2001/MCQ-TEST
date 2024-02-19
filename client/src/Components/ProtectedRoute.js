import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../Redux/usersSlice";
import { useNavigate } from "react-router-dom";
 import {message} from "antd";
 import { useEffect,useState } from "react";
 import { getUserInfo } from "../ApiCalls/users";
const ProtectedRoute = ({children})=>{

    const {user} = useSelector((state)=> state.users)
    const [menu, setMenu] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userMenu = [
      {
        title: "Home",
        paths: ["/", "/user/write-exam"],
        icon: <i className="ri-home-line"></i>,
        onClick: () => navigate("/"),
      },
      {
        title: "Reports",
        paths: ["/user/reports"],
        icon: <i className="ri-bar-chart-line"></i>,
        onClick: () => navigate("/user/reports"),
      },
      {
        title: "Profile",
        paths: ["/profile"],
        icon: <i className="ri-user-line"></i>,
        onClick: () => navigate("/profile"),
      },
      {
        title: "Logout",
        paths: ["/logout"],
        icon: <i className="ri-logout-box-line"></i>,
        onClick: () => {
          localStorage.removeItem("token");
          navigate("/login");
        },
      },
    ];
  
    const adminMenu = [
      {
        title: "Home",
        paths: ["/", "/user/write-exam"],
        icon: <i className="ri-home-line"></i>,
        onClick: () => navigate("/"),
      },
      {
        title: "Exams",
        paths: ["/admin/exams", "/admin/exams/add"],
        icon: <i className="ri-file-list-line"></i>,
        onClick: () => navigate("/admin/exams"),
      },
      {
        title: "Reports",
        paths: ["/admin/reports"],
        icon: <i className="ri-bar-chart-line"></i>,
        onClick: () => navigate("/admin/reports"),
      },
      {
        title: "Profile",
        paths: ["/profile"],
        icon: <i className="ri-user-line"></i>,
        onClick: () => navigate("/profile"),
      },
      {
        title: "Logout",
        paths: ["/logout"],
        icon: <i className="ri-logout-box-line"></i>,
        onClick: () => {
          localStorage.removeItem("token");
          navigate("/login");
        },
      },
    ];

    const getUserData = async()=>{
        try{
            const response = await getUserInfo();
            if(response.success){
                //message.success(response.message);
                dispatch(SetUser(response.data));
                if (response.data.isAdmin) {
                  setMenu(adminMenu);
                } else {
                  setMenu(userMenu);
                }
            }else{
                message.error(response.message);
            }
        }catch(error){
            navigate("/login")
            message.error(error.message);
        }
    }
    useEffect(()=>{
      if(localStorage.getItem("token")){
        getUserData();
      }else{
        navigate("/login");
      }
        
    },[])
    const activeRoute = window.location.pathname;
    const getIsActiveOrNot = (paths)=>{
      if(paths.includes(activeRoute)){
        return true;
      }else{
        return false;
      }
    }
    return (
        <div className="layout flex p-[15px] gap-2 ">
          <div className="sidebar bg-indigo-400 p-10 rounded-lg border-r-2 h-screen text-white flex items-center justify-center">
            {/* Sidebar content */}
            <div className="menu">
            {menu.map((item, index) => {
              return <div className={`menu-item flex items-center gap-4 p-3 pl-5 pr-5 m-[5px] cursor-pointer ${getIsActiveOrNot(item.paths) &&"active-menu-item border-2 border-solid border-white border-r-5 rounded-lg"}`}key={index}
                  onClick={item.onClick}>  
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
                </div>
            })}
            </div>
          </div>
          <div className="body w-full">
            <div className="header bg-indigo-400 flex justify-between p-6 rounded-lg border-r-5 items-center">
            {!collapsed && (
              <i
                className="ri-close-line text-white text-2xl cursor-pointer"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            {collapsed && (
              <i
                className="ri-menu-line text-white text-2xl  cursor-pointer"
                onClick={() => setCollapsed(false)}
              ></i>
            )}
              <h1 className="text-2xl text-white">IntelliExam</h1>
              <div className="flex gap-2 items-center">
                <i className="ri-user-line  text-white text-2x"></i>
                <h1 className="text-2xl text-white underline">{user?.name}</h1>
              </div>         
            </div>
            <div className="content p-4">
              {/* Content area */}
              {children}
            </div>
          </div>
        </div>
      );
    };

export default ProtectedRoute;