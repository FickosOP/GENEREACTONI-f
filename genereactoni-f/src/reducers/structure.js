import { INITIAL_MODEL } from "../utils/initialModelState";

const structureReducer = (state = INITIAL_MODEL.structure, action) => {
    switch(action.type){
        case 'ADD_TO_STRUCTURE':
            let tokens = action.payload.path.split('/');
            let i = 0
            console.log(tokens);
            const dfs = (level = state, folderToAdd = tokens[i]) => {
                if(i >= tokens.length - 1){
                    return state;
                }
                if(level.folder == tokens[i]){
                    dfs(level, tokens[++i])
                }
                console.log(`I: ${i}, tokens.length: ${tokens.length}`);
                console.log(`Current folder: ${level.folder}`);
                let flag = false;
                level.subfolders?.map((sub) => {
                    if(sub.folder === folderToAdd){
                        flag = true;
                        dfs(sub, tokens[++i])
                    }
                })
                if(!flag){
                    if(folderToAdd)
                        level.subfolders.push({folder: `${folderToAdd}`, subfolders: []});
                    dfs(level, tokens[i]);
                }
            }; dfs();

            return state;
        case 'REMOVE_FROM STRUCTURE':
            console.log(action.payload);
            return state;
        case 'LOAD_PROJECT':
            return action.payload.full.structure;
        case 'NEW_PROJECT':
            return Object.assign({}, INITIAL_MODEL.structure);
        default: 
            return state;
    }
}

export default structureReducer;