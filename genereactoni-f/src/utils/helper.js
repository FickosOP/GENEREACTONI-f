export function getBgColor(type){
    switch(type){
        case 1:
        case 2:
            return "#61dafb";
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