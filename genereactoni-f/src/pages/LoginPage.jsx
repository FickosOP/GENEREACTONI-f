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
            <div className="loginWrapper">
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="loginInput"/>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="loginInput"/>
                <button onClick={login} className="loginButton">Login</button>
                <div>
                <a href="/" className="reactColor">Continue without account</a><br/>
                <a href="/register" className="reactColor">Register</a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;