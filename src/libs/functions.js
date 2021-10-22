// Globals Functions
function validIdField (id) {
    if (isNaN(Number(id))) return false;
    else return true;
}

module.exports = {validIdField};