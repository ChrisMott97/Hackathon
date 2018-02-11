// app/routes.js
var mongoose = require('mongoose');
var lecturer = require("./models/lecturer.js");
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', guestOnly, function(req, res) {
        res.render('search.ejs')
    });

    app.get('/reviewPage', function(req, res){
      res.render('reviewPage.ejs')
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', guestOnly, function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', guestOnly, passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/search', function(req, res) {
        res.render('search.ejs')
    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/lecturers', function(req, res) {
        lecturer.find(function(err, results){
            res.json(results)
        });
    })

    app.get('/lecturers/:query', function(req, res) {
        lecturer.find({"firstname": new RegExp(req.params.query)}, function(err, results){
            res.json(results)
        });
    })

    app.get('/lecturer', function(req, res) {
        res.render('lecturer.ejs')
    })

    app.post('/lecturer', isLoggedIn, function(req, res){
        lecturer.create({ firstname: req.body.firstname , lastname: req.body.lastname, subject: req.body.subject}, function (err, new_lecturer) {
            if (err) return handleError(err);
            console.log(new_lecturer);
            res.redirect('/lecturers');
        });
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
function guestOnly(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/home')
}
