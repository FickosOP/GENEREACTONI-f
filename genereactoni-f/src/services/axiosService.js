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
    })
}