import { useState } from "react";
import { postObject } from "../services/axiosService";
import { saveUserTokenState } from "../actions/actions";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { minHeight } from "@mui/system";

function LoginPage(){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function login(){
        console.log({username, password});
        postObject('users/login', {username, password}, (response) => {
            if(response.data?._id){
                dispatch(saveUserTokenState({id: response.data._id, token: response.data.token}));
                
                navigate('/', {replace: true});
            }
        });
    }

    return(
        <div className="App-header" style={{justifyContent: 'center'}}> 
            <div style={{width: '50%', display:'flex', flexDirection: 'column', minHeight: '500px'}}>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="loginInput"/>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="loginInput"/>
                <button onClick={login} className="loginButton">Login</button>
                <div>
                <a href="/" style={{color: '#61dafb'}}>Continue without account</a><br/>
                <a href="/register" style={{color: '#61dafb'}}>Register</a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;