module.exports = func => {  //func is the function what we are passing
    return (req, res, next) => { // returns new function that has func exectued
        func(req, res, next).catch(next); // catches the error and passes it to next
    }
}