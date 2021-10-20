// Globals Functions

function inputNameValid (req, res, next) {
    let nums = [0,1,2,3,4,5,6,7,8,9];
    let name = req.params.name;
    for (const letter of name) {
        if (nums.includes(Number(letter))) {
            res.status(404).send('Introduce a valid name of the pokemon');
            return false;
        }
    }
    next();
};

function validIdField (req, res, next) {
    const { id } = req.params;
    if (isNaN(Number(id))) res.send('That is not a valid id');
    else next();
}

module.exports = {inputNameValid, validIdField};