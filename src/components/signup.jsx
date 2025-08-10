import React,{useState} from "react";
import Input from '@mui/joy/Input';
import {Alert, Button, IconButton, LinearProgress, Stack, Typography} from "@mui/joy";
import ReportIcon from '@mui/icons-material/Report';
import MailIcon from '@mui/icons-material/Mail';
import Face2Icon from '@mui/icons-material/Face2';
import KeyIcon from '@mui/icons-material/Key';
import {Face2} from "@mui/icons-material";

function Signup(){
    const [input, setInput] = useState({username: "", password: "",email: ""});
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    // const[passwordValue,setPasswordValue] = useState('');
    const minpasswordLength = 8;

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(input),
            });
            const data = await res.json();
            if(res.ok){
                // localStorage.setItem("token",data.token);
                setSuccess("Sign up successfull!");
                setError(null);
            }else{
                setError(data.message || "Signup failed");
                setSuccess(null);
            }
        }catch(err){
            setError("Sign Up Failed!" + err.message);
        }
    };

    return (
        <div class="flex h-screen w-screen max-h-screen">
            <div className="w-1/2 flex flex-col justify-center aspect-square bg-sky-400">
            {/*    INSERT VECTOR HERE*/}
            </div>
            <div className="w-1/2 flex flex-col justify-center">
                <form onSubmit={handleSubmit} class={"w-4/6 flex flex-col justify-center m-auto gap-2"}>
                    <div className={"my-2"}>
                        {/*Can have an image here*/}
                        <h1 className={"text-2xl font-bold"}>Signup to Cafelina</h1>
                        <p className='my-1 text-sm text-slate-400'>Already a Member? <a className='text-blue-500 no-underline' href='/src/components/Login'>Log In</a></p>
                    </div>
                    <Input
                        startDecorator={<MailIcon />}
                        color="neutral"
                        placeholder="example@email.com"
                        size="lg"
                        variant="soft"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                        required
                        fullWidth
                        type = "email"
                        sx = {(theme)=>({
                            borderRadius: '10px',
                        })}
                    />
                    <Input
                        startDecorator={<Face2Icon />}
                        color="neutral"
                        placeholder="Username"
                        size="lg"
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
                    <Stack spacing = {0.5} sx = {{'--hue':Math.min(input.password.length*10,120)}}>
                        <Input
                            startDecorator={<KeyIcon />}
                            color="neutral"
                            type = 'password'
                            placeholder="Password"
                            size="lg"
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
                        <LinearProgress
                            determinate
                            size = "sm"
                            value = {Math.min(input.password.length*100/minpasswordLength,100)}
                            sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)' }}
                        />
                        <Typography
                            level = "body-xs"
                            sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
                        >
                            {input.password.length < 3 && 'Very weak'}
                            {input.password.length >=3 && input.password.length <6 && 'Weak'}
                            {input.password.length >= 6 && input.password.length < 10 && 'Strong'}
                            {input.password.length >= 10 && 'Very strong'}
                        </Typography>
                    </Stack>
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

export default Signup;
