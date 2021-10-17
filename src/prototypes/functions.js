// Globals Functions

function inputNameValid (req, res, next) {
    let nums = [0,1,2,3,4,5,6,7,8,9];
    for (const letter of req.params.name) {
        if (nums.includes(Number(letter))) {
            res.status(404).send('Introduce a valid name of the pokemon');
            return false;
        }
    }
    next();
};

module.exports = {inputNameValid};