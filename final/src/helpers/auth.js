const help = {};

helpers.isAthenticated = (req, res, next) => {
    if(req.isAthenticated()){
        return next();
    }
    req.flash('error_ms', 'No autorizado');
    res.rdirect('users/signin');
};

module.export = helpers;