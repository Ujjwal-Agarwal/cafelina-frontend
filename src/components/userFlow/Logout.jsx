import {Button} from "@mui/joy";
import React, {useState} from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";

const Logout = () =>{
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {logout} = useAuth();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            await logout();
            navigate("/login");
        }catch (error){
            setError("Logout Failed" + error.message);
        }finally {
            setLoading(false);
        }
    };
    return(
        <div><Button
            type = "submit"
            color="danger"
            size="lg"
            variant="soft"
            startDecorator={<LogoutIcon />}
            onClick={handleSubmit}
        >Logout</Button></div>
    );
}
export default Logout;