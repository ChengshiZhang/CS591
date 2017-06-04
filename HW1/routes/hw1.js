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
// Return the body of request as a JSON object
router.post('/', function (req, res, next) {
    res.json(req.body)
})

module.exports = router;