export function reduxName(type){
    switch(type){
        case 1:
            return 'components';
        case 2:
            return 'pages';
        case 3:
            return 'services';
        case 4:
            return 'utils';
        default:
            return '';
    }
}