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

export function getOffsetForItem(item){
    switch(item){
        case 1:
            return {x: 9, y: 138}
        case 2:
            return {x: 140, y: 158}
        case 3:
            return {x: 19, y: 298}
        case 4:
            return {x: 140, y: 298}
        default:
            return;
    }
}