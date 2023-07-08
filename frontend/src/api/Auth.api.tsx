import axios from "axios";
import { IAuthData } from "../Interface";
import Cookies from "js-cookie";
import {useContext} from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export const useAuthApi = () => {
    const {setToken, setDecodedToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const authApi = axios.create({
        baseURL: "http://localhost:3000/auth",
        withCredentials: true
    })

    const signup = async (data: IAuthData): Promise<any> => {
        const res = await authApi.post("/signup", data);
        return res.data;
    }

    const signin = async (data: IAuthData): Promise<any> => {
        console.log("api before exec")
        const res = await authApi.post("/signin", data);
        console.log("api exec")
        return res.data;
    }

    const signout = async () => {
        await authApi.post("/signout");
        Cookies.remove("token");
        setToken('');
        setDecodedToken('');
        setTimeout(() => {
            navigate("/signup");
        }, 1000)
       
    }

    return {signup, signin, signout};
}

