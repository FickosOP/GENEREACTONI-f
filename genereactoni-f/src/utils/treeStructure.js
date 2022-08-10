import { TreeItem, TreeView } from '@mui/lab';
//import { INITIAL_MODEL } from './initialModelState';

export const INITIAL_MODEL_POSTMAN = 
{"structure": {
    "folder": "C:/Users/x/Desktop/test3",
    "subfolders": [
        {
            "folder": "src",
            "subfolders": [
                {
                    "folder": "pages",
                    "subfolders": [
                        {
                            "folder": "projects",
                            "subfolders": [{
                                "folder": "expensive",
                                "subfolders": [],
                                "files": ["1", "2"]
                            },
                            {
                                "folder": "cheap",
                                "subfolders": [],
                                "files": ["1"]
                            }]
                        }
                    ],
                    "files": ["ComponentsPage.jsx"]
                },
                {
                    "folder": "components",
                    "subfolders": [
                        {
                            "folder": "navbar",
                            "subfolders": [],
                            "files": ["1"]
                        }
                    ],
                    "files": ["ComponentsComponent.jsx"]
                },
                {
                    "folder": "utils",
                    "subfolders": [],
                    "files": ["ComponentsUtils.js"]
                },
                {
                    "folder": "services",
                    "subfolders": [],
                    "files": ["ComponentsService.js"]
                }
            ],
            "files": ["App.js"]
        },
        {
            "folder": "public",
            "subfolders": [],
            "files": ["index.html"]
        }
    ],
    "files": ["package.json"]
    }
}

export function createTreeViewFromStructure(node = 'src', structure=INITIAL_MODEL_POSTMAN){
    let id = 0;
    const renderTree = (root) => (
        <TreeItem key={++id} nodeId={++id} label={root.folder} onDoubleClick={() => handleDoubleClick(root.folder)}>
        {
            Array.isArray(root.subfolders) ? root.subfolders.map((node) => renderTree(node)) : null
        }
        {
            Array.isArray(root.files) ? root.files.map((node) => <TreeItem key={++id} nodeId={++id} label={node} />) : null
        }
        </TreeItem>
    )
    return renderTree(INITIAL_MODEL_POSTMAN.structure.subfolders[0]);
}

function handleDoubleClick(e){
    console.log(e);
}

// function dfs(root){
//     const name = root.folder;
//     if(root.subfolders.length == 0){
//         console.log(`${root.folder} nema podfoldere`);
//         return {id: name, name: name};
//     }
//     else{
//         console.log(`${root.folder} ima podfoldere`);
//         for(let folder of root.subfolders){
//             return { id: folder.folder, name: folder.folder, children: [dfs(folder)]};
//         }
//     }
// }