import React,{useState} from "react";
import Input from '@mui/joy/Input';
import {Alert, Button, IconButton} from "@mui/joy";
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Face2Icon from '@mui/icons-material/Face2';
import KeyIcon from '@mui/icons-material/Key';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

const Login = () => {
    const [credentials, setCredentials] = useState({username: "", password: ""});
    const [error,setError] = useState("");
    // const [success,setSuccess] = useState("");
    const [loading,setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            await login(credentials);
            navigate('/dashboard');
        }catch(err){
            // console.log(err.message);
            setError("Login Failed" + err.message);
        } finally{
            setLoading(false);
        }
    };

    return (
        <div class="flex h-screen w-screen max-h-screen">
            <div className="w-1/2 flex flex-col justify-center aspect-square bg-amber-800">
            </div>
            <div className="w-1/2 flex flex-col justify-center">
                <form onSubmit={handleSubmit} class={"w-4/6 flex flex-col justify-center m-auto gap-2"}>
                    <div className={"my-2"}>
                        {/*Can have an image here*/}
                        <h1 className={"text-2xl font-bold"}>Login to Cafelina</h1>
                        <p className='my-1 text-sm text-slate-400'>Not a Member? <a className='text-blue-500 no-underline' href='/signup'>Sign Up</a></p>
                    </div>
                    <Input
                        startDecorator={<Face2Icon />}
                        color="neutral"
                        placeholder="Username"
                        size="lg"
                        variant="soft"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx = {(theme)=>({
                            borderRadius: '10px',
                        })}
                    />
                    <Input
                        startDecorator={<KeyIcon />}
                        color="neutral"
                        type = 'password'
                        placeholder="Password"
                        size="lg"
                        variant="soft"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx = {(theme)=>({
                            borderRadius: '10px',
                        })}
                    />
                    <Button
                        type = "submit"
                        color="success"
                        size="lg"
                        variant="soft"
                    >Submit</Button>
                    {/*<input type="email" name = "email" value={input.email} onChange={handleChange} placeholder="Email" />*/}
                    {/*<input type="password" name = "password" value={input.password} onChange={handleChange} placeholder="Password" />*/}
                    {/*<button type="submit">Login</button>*/}
                    {/*{success && <Alert*/}
                    {/*    startDecorator={<ReportIcon />}*/}
                    {/*    color={"primary"}*/}
                    {/*    size={"md"}*/}
                    {/*    variant={"plain"}*/}
                    {/*    sx = {{alignItems: "flex-start"}}*/}
                    {/*>{success}</Alert>}*/}
                    {error && <Alert
                        startDecorator={<ReportIcon />}
                        color={"danger"}
                        size={"md"}
                        variant={"plain"}
                        sx = {{alignItems: "flex-start"}}
                    >{error}</Alert>}
                </form>
            </div>
        </div>
    );
}

export default Login;
