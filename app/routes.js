
var mongoose = require('mongoose');
var lecturer = require("./models/lecturer.js");
var post = require("./models/post.js");
module.exports = function(app, passport) {

    app.get('/', guestOnly, function(req, res) {
        res.render('search.ejs')
    });

    app.get('/reviewPage', function(req, res){
      res.render('reviewPage.ejs')
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    app.get('/signup', guestOnly, function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', guestOnly, passport.authenticate('local-signup', {
        successRedirect : '/home', 
        failureRedirect : '/signup', 
        failureFlash : true 
    }));

    app.get('/home', isLoggedIn, function(req, res) {
        res.render('home.ejs', {
            user : req.user 
        });
    });

    app.get('/logout', isLoggedIn, function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/lecturers', function(req, res) {
        lecturer.find(function(err, results){
            res.json(results)
        });
    })

    app.get('/api/lecturers/:query', function(req, res) {
        lecturer.find({$or:[{"firstname": new RegExp(req.params.query, 'i')},{"lastname": new RegExp(req.params.query, 'i')},{"subject": new RegExp(req.params.query, 'i')}, {"modules": new RegExp(req.params.query, 'i')}]}, function(err, results){
            res.json(results)
        });
    })
    app.post('/api/lecturer', isLoggedIn, function(req, res){
        lecturer.create({ firstname: req.body.firstname , lastname: req.body.lastname, subject: req.body.subject}, function (err, new_lecturer) {
            if (err) return handleError(err);
            new_lecturer.username = new_lecturer.firstname.toLowerCase() + '.' + new_lecturer.lastname.toLowerCase();
            new_lecturer.save();
            res.redirect('/lecturer');
        });
    })
    app.get('/lecturer', isLoggedIn, function(req, res) {
        res.render('lecturer');
    })
    app.get('/lecturer/:username', function(req, res) {
        lecturer.findOne({"username": req.params.username}, function(err, result){
            if(!result) res.redirect('/');
            post.find({"lecturer": req.params.username}, function(err, new_posts){
                var sum = 0;
                var count = 0;
                new_posts.forEach(post => {
                    sum += post.rating;
                    console.log(sum);
                    count += 1;
                });
                var avg = (sum/count).toFixed(2);
                res.render('profile.ejs', {
                    lecturer: result,
                    posts: new_posts,
                    avg: avg,
                    url: '/lecturer/' + req.params.username,
                    module_url: '/lecturer/' + req.params.username + '/modules/'
                })
            }).sort({createdAt: -1})
        }).limit(1);
    })
    app.post('/lecturer/:username',isLoggedIn, function(req, res) {
        var comment = req.body.comment;
        var rating = req.body.rating;
        lecturer.findOne({"username": req.params.username}, function(err, result){
            if(!result) res.redirect('/');
            post.create({comment: comment, rating: rating, lecturer: req.params.username, user: req.user.local.username}, function(err, new_post) {
                res.redirect('/lecturer/'+req.params.username);
            })
        })
    })
    app.post('/lecturer/:username/modules',isLoggedIn, function(req, res) {
        var new_module = req.body.module;
        lecturer.findOne({"username": req.params.username}, function(err, result){
            result.modules.push(new_module);
            result.save();
            res.redirect('/lecturer/'+req.params.username)
        })
    });
    app.get('/lecturer/:username/modules', isLoggedIn, function(req, res) {
        lecturer.findOne({"username": req.params.username}, function(err, lecturer_new){
            res.render('modules.ejs', {
                url: '/lecturer/' + req.params.username + '/modules'
            });
        })
    })
    app.get('/user', isLoggedIn, function(req, res) {
        post.find({user: req.user.local.username}, function(err, results){
            res.render('user.ejs', {
                user: req.user,
                posts: results
            })
        }).sort({createdAt: -1})
    })
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}
function guestOnly(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/home')
}
