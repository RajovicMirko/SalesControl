export function formatPhoneNumber(numString, type = ''){
    if(!numString) return numString;
    
    const numRegex = new RegExp("(\\d{3})(\\d{3})(\\d{2})(\\d+)", "g")
    const justNumbers = numString.match(/\d+/);
    
    const formatMapping = {
        default: "$1/$2-$3-$4",
        fullNumber: "+$1/0 $2-$3-$4"
    }
    return type ? justNumbers[0].replace(numRegex, formatMapping[type]) : numString;
}
