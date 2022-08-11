const authReducer = (state = {token: '', id: ''}, action) => {
    switch(action.type){
        case 'ADD_USER_AUTH':
            console.log(action.payload);
            return action.payload;
        case 'REMOVE_USER_AUTH':
            console.log('LOGOUT');
            return {token: '', id: ''};
        default: 
            return state;
    }
}

export default authReducer;