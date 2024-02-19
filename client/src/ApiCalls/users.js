const {default:axiosInstance} = require(".");
export const registerUser = async(formData)=>{
    try{
        const response = await axiosInstance.post("/api/users/register",formData);
        return response.data;
    }catch(error){
        return error.response.data;
    }
}
export const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/api/users/login', formData);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
export const getUserInfo = async () => {
    try {
        const response = await axiosInstance.post('/api/users/get-user-info');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}