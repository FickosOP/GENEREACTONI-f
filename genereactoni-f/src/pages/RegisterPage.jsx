import { useState } from "react";
import { saveUserTokenState } from "../actions/actions";
import { postObject } from "../services/axiosService";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function RegisterPage(){

    const[email, setEmail] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[repeatPassword, setRepeatPassword] = useState('');

    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    function register(){
        console.log({username, password, email});
        postObject('users/', {username, password, email}, (response) => {
            console.log(response.data);
            dispatch(saveUserTokenState({id: response.data._id, token: response.data.token}));
            navigate('/', {replace: true});
        });
    }

    return(
        <div className="App-header" style={{justifyContent: 'center'}}>
            <div className="loginWrapper">
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="loginInput"/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="loginInput"/>
                <input type="password" placeholder="Repeat password" onChange={(e) => setRepeatPassword(e.target.value)} className="loginInput"/>
                <label style={{fontSize: '18px'}}>{password === repeatPassword ? '' : 'Passwords are not matching'}</label>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="loginInput"/>
                <button onClick={register} className="loginButton">Register</button>
            </div>
        </div>
    )
}

export default RegisterPage;