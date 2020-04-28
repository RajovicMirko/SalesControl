export function getInitials(name){
    if(name){
        const nameArr = name.split(' ');
        return nameArr.length > 1
            ? (nameArr[0][0] + nameArr[nameArr.length - 1][0]).toUpperCase()
            : nameArr[0][0];
    } else {
        return '';
    }
}