var express = require('express');
var router = express.Router();

// GET the page for the root of path /hw1
// Loads the page
router.get('/', function(req, res, next) {
    res.render('hw1', {title: "My secrets"});
});

// GET a page under the path /hw1 with a named parameter
// Return a JSON object with the parameter and its length
router.get('/:namedParam', function (req, res, next) {
    let theParam = req.params.namedParam;
    res.json({string: theParam, length: theParam.length})
});

// POST to the page for the root of path /hw1
// Return a JSON object with the object's "keyString" parameter and its length
router.post('/', function (req, res, next) {
    let str = req.body.keyString;
    res.json({string: str, length: str.length})
});

module.exports = router;