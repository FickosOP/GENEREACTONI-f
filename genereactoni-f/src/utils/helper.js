export function getBgColor(type){
    switch(type){
        case 1:
            return "#61dafb";
        case 2:
            return "#19667B";
        default:
            return "#ffff00";
    }
}

export function getName(type){
    switch(type){
        case 1:
            return "Component";
        case 2:
            return "Page";
        case 3:
            return "Service";
        case 4:
            return "Util";
        default:
            return "";
    }
}