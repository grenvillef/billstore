var express = require('express');
var router = express.Router();


/* GET Signup  page. */

router.get('/', function(req, res, next) {

	res.render('signup');
        if (err){
            res.json(err);
        }
});

module.exports = router;
