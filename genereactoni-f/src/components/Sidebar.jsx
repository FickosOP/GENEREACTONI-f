import { useState } from "react";
import Picture from "./Picture";

import comp from "../assets/images/component.png";
import page from "../assets/images/page.png";
import serv from "../assets/images/service.png";
import util from "../assets/images/util.png";
import { postObject } from "../services/axiosService";

const pictureList = [
    {
        id:1,
        url: comp
    },
    {
        id:2,
        url: page
    },
    {
        id:3,
        url: serv
    },
    {
        id:4,
        url: util
    }
]

function Sidebar(){

    const [displayGeneral, setDisplayGeneral] = useState(true);

    const [displayAdvanced, setDisplayAdvanced] = useState(true);

    function handleGenerate(e){
        console.log(e.target.value);
        console.log('Generisi');
        let obj = {
"structure": {
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
    },
"model": {
    "components": [
        {
            "path": "C:/Users/x/Desktop/test3/src/components/navbar",
            "name": "Navbar",
            "states": [{"name": "links", "default": "[]"}],
            "effects": [],
            "actions": ["handleNavBarClick"],
            "return": "<nav></nav>",
            "children": []
        },
        {
            "path": "C:/Users/x/Desktop/test3/src/components",
            "name": "ComponentOne",
            "states": [{"name": "one", "default": "1"}],
            "effects": [{"name": "getOneComponent", "relativePath": "../services/services", "absolutePath": "C:/Users/x/Desktop/test3/src/services/service"}],
            "actions": [],
            "return": "<div><h1>Hello World!</h1></div>",
            "children": [{"name": "ComponentTwo", "relativePath": "./kurac", "absolutePath": "C:/Users/x/Desktop/test3/src/components"}]
        },
        {
            "path": "C:/Users/x/Desktop/test3/src/components",
            "name": "ComponentTwo",
            "states": [{"name": "two", "default": "{}"}, {"name": "twoHelper", "default": "{}"}],
            "effects": [{"name": "getTwoComponents", "relativePath": "../services/services", "absolutePath": "C:/Users/x/Desktop/test3/src/services/service"}],
            "actions": ["setFieldTwo"],
            "return": "<div><h2>Hello World!</h2></div>",
            "children": []
        }
    ],
    "pages": [
        {
            "props": ["pageSize", "pageCount"],
            "path": "C:/Users/x/Desktop/test3/src/pages",
            "name": "PageOne",
            "states": [{"name": "one", "default": "1"}, {"name": "components", "default": "[]"}],
            "effects": [{"name": "getOneComponent", "relativePath": "../services/services", "absolutePath": "C:/Users/x/Desktop/test3/src/services/services"}],
            "actions": [],
            "return": "<div><h1 name=\"dyn-value-one\">Hello World TO SHOW!</h1><table><tbody name=\"dyn-for-components\"></tbody></table></div>",
            "children": [{"name":"ComponentOne", "relativePath": "../components/kurcina", "absolutePath": "C:/Users/x/Desktop/test3/src/components"}]
        }
    ],
    "services": ["addNewCategory", "getCategoryById", "getOneComponent", "getTwoComponents"],
    "utils": ["checkJwtExpiry"]
}
}
    postObject('model/generate', obj, (response) => {
        console.log(response.data);
    })
    }

    return(
        <div className="sidebarContainer" >
            <button className="expandable" onClick={() => setDisplayGeneral(!displayGeneral)}>General</button>
            <div className="sidebarBlockGeneral" style={{display: displayGeneral ? "" : "none"}}>
                <div className="draggable">
                {
                    pictureList.map((picture) => {
                        return <Picture url={picture.url} id={picture.id} inCanvas={false} key={picture.id}/>;
                    })
                }
                </div>
            </div>
            <button className="expandable" onClick={() => setDisplayAdvanced(!displayAdvanced)}>Advanced</button>
            <div className="sidebarBlockAdvanced" style={{display: displayAdvanced ? "" : "none"}}>
                display
            </div>
            <input type='file' directory='' webkitdirectory='' onChange={handleGenerate}/>
            <button className="button" onClick={handleGenerate}>Generate React project</button>
        </div>
    )
}

export default Sidebar;