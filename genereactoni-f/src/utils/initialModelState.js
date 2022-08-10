export const INITIAL_MODEL = {
    structure: {
        folder: "",
        subfolders: [
            {
                folder: "src",
                subfolders: [
                    {
                        folder: "pages",
                        subfolders: []
                    },
                    {
                        folder: "components",
                        subfolders: []
                    },
                    {
                        folder: "utils",
                        subfolders: []
                    },
                    {
                        folder: "services",
                        subfolders: []
                    }
                ]
            },
            {
                folder: "public",
                subfolders: []
            }
        ]        
    },
    model: {
        components: [],
        pages: [],
        services: [],
        utils: []
    }
}

export const INITIAL_COMPONENT_STATE = {
    path: "",
    name: "",
    states: [],
    effects: [],
    actions: [],
    return: "",
    children: []
}

export function addPathToModel(path, modelState){
    modelState.structure.folder = path;

    modelState.model.components.forEach((comp) => {
        comp.path = `${path}/${comp.path ? comp.path : 'src/components'}`;
        console.log(`${comp.name} is on path : ${comp.path}`);
    });

    modelState.model.pages.forEach((page) => {
        page.path = `${path}/${page.path ? page.path : 'src/pages'}`;
        console.log(`${page.name} is on path: ${page.path}`);
    })

    return modelState;
}
