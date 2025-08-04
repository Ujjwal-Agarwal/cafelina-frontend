import React,{useState} from "react";
import Input from '@mui/joy/Input';
import {Alert, Button, IconButton} from "@mui/joy";
import ReportIcon from '@mui/icons-material/Report';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Login(){
    const [input, setInput] = useState({username: "", password: ""});
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:8080/api/auth/signin", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(input),
            });
            const data = await res.json();
            if(res.ok){
                localStorage.setItem("accessToken",data.accessToken);
                setSuccess("Login successfull!");
            }else setError(data.message || "Login failed");
        }catch(err){
            setError("Login Failed");
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
                        color="neutral"
                        placeholder="Username"
                        size="md"
                        variant="soft"
                        name="username"
                        value={input.username}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx = {(theme)=>({
                            borderRadius: '10px',
                        })}
                    />
                    <Input
                        color="neutral"
                        type = 'password'
                        placeholder="Password"
                        size="md"
                        variant="soft"
                        name="password"
                        value={input.password}
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
                    {success && <Alert
                        startDecorator={<ReportIcon />}
                        color={"primary"}
                        size={"md"}
                        variant={"plain"}
                        sx = {{alignItems: "flex-start"}}
                    >{success}</Alert>}
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
