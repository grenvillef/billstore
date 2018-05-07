var express = require('express');
var router = express.Router();


/* GET login page. */

router.get('/', function(req, res, next) {

	res.redirect(302, 'login');
        if (err){
            res.json(err);
        }
});

module.exports = router;
