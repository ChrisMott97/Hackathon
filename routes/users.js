var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  return user.list_all_users;
});
router.post('/', function(req, res, next) {
  res.json(user.create_a_user);
});


module.exports = router;
