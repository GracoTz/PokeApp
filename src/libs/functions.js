// Globals Functions

// Va a recibir un string y separarlo por comas
const createArray = (string) => {
    let res = [];
    if (string.indexOf(',') !== -1) {
        res = string.split(',');
    } else {
        res[0] = string;
    }
    return res;
}

module.exports = {createArray};