import axios from 'axios';
import { API_URL } from '../config';

export function postObject(path, obj, callback){
    axios
    .post(`${API_URL}/${path}`, obj)
    .then(response => {
        callback(response);
    })
    .catch(error => {
        console.log(error);
    });
}

export function getAllModelsForUser(callback){
    axios
    .get(`${API_URL}/model/user/${1}`)
    .then(response => {
        callback(response);
    })
    .catch(error => {
        console.log(error);
    });
}

export function getById(path, id, callback){
    axios
    .get(`${API_URL}/model/`)
    .then(response => {
        callback(response);
    })
    .catch(error => {
        console.log(error);
    });
}