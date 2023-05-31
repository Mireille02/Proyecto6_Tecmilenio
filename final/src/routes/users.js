const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const {isAuthenticated} = require('../helpers/auth')

const passport = require('passport')

router.get('notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
})

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup',async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (name.length <= 0) {
        errors.push({ text: 'Por favor ingresa un nombre' });
    }
    if (password != confirm_passowrd) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña tiene que ser de al menos 4 carácteres' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = Users.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'El email ya esta en uso');
            res.redirect('/users/signiup');
        }
        const newUsers = new Users({ name, email, password });
        newUsers.password = await newUsers.encryptPassword(password);
        await newUsers.save();
        req.flash('succes_msg', 'Estas registrado');
        res.redirect('/users/signin');
    }
});

router.get('users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;