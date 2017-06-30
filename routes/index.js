var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET report page.*/ 
router.get('/report', function(req, res, next) {
  res.render('report');
});


module.exports = router;
