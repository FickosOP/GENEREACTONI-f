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