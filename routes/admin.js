/**
 * Created by lenovo on 2016/5/17.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/addpage', function(req, res, next) {
   res.send(req.body.content)
});

module.exports = router;