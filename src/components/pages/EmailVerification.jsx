import {Button} from "@mui/joy";
import {useState} from "react";
import emailVerifiationService from "../../services/emailVerifiationService.js";
import {useNavigate, useSearchParams} from "react-router-dom";

const EmailVerification = (params) =>{
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();
    // console.log(token);

    async function handleVerification(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            await emailVerifiationService.sendEmailVerification(token);
            navigate('/login');
        }catch(error){
            setError("Email Verification Failed" + error);
            console.log(error);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div>
            <Button onClick={handleVerification}>Click here to verify your email</Button>
        </div>
    )
}
export default EmailVerification;