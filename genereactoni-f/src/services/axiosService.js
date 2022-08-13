import axios from 'axios';
import { API_URL } from '../config';
import { store } from "../store"
import { saveAs } from 'file-saver';
import FileSaver from 'file-saver';
import fileDownload from 'js-file-download';
import download from 'downloadjs';

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

export function downloadZip(path, obj, callback){
    axios.post(`${API_URL}/${path}`, obj, {responseType: 'blob'})
    .then((res) => {
        fileDownload(res.data, 'xxx.zip');
    })
    // request.post(`${API_URL}/${path}`, obj)
    // .then(response => {
    //     // FileSaver.saveAs(response.blob(), 'dawdada.zip');
    //     console.log(response);
    //     // download(new Blob([response], {type: 'application/zip'}), 'dxxxxx.zip', 'application/zip');
    // })
    // .catch(error => {
    //     console.log(error);
    // })
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