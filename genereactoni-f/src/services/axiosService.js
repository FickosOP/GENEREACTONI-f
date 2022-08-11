import axios from 'axios';
import { API_URL } from '../config';
import { store } from "../store"

const request = axios.create({});

store.subscribe(getConfig);

function getConfig(){
    let token = store.getState();
    console.log(token.authReducer.token);
    return {'x-access-token': token.authReducer.token};
}

export function postObject(path, obj, callback){
    request
    .post(`${API_URL}/${path}`, obj, {headers: getConfig()})
    .then(response => {
        callback(response);
    })
    .catch(error => {
        console.log(error);
    });
}

export function getAllModelsForUser(callback){
    request
    .get(`${API_URL}/model/user/${store.getState().authReducer.id}`, {headers: getConfig()})
    .then(response => {
        callback(response);
    })
    .catch(error => {
        console.log(error);
    });
}

export function getById(path, id, callback){
    request
    .get(`${API_URL}/model/`)
    .then(response => {
        callback(response);
    })
    .catch(error => {
        console.log(error);
    });
}