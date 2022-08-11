import { useState } from "react";
import { postObject } from "../services/axiosService";
import { saveUserTokenState } from "../actions/actions";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <div>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <button onClick={login}>Login</button>
                <a href="/">Continue without account</a>
                <a href="/register">Register</a>
            </div>
        </div>
    )
}

export default LoginPage;