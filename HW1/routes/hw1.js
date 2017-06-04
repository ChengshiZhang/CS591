var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send('Hi there!');
});

router.get('/:namedParam', function (req, res, next) {
    let theParam = req.params.namedParam;
    res.json({string: theParam, length: theParam.length})
});

module.exports = router;