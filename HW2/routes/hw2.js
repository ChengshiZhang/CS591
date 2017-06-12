const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/sample')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})
const Schema = mongoose.Schema
const strSchema = new Schema({
    _string: String,
    _length: Number,
});

const strModel = mongoose.model('string', strSchema)

//GET: When passing a string on the query (i.e. http://localhost:3000/hw2/longstring),
// first look in the database to see if the string is already present.
// If it is, return the string and its length as read from the database.
// If it isn’t, compute the length, store the string and its length in the database,
// and return both to the client.

router.get('/:_str', function (req, res, next) {
    strModel.find({_string: req.params._str}, function (err, results) {

        // Cannot find given string in database, create new object in database
        if(Object.keys(results).length == 0){

            console.log("New string:", req.params._str, "\nCreating new object in database");

            let str = req.params._str;
            let len = str.length;
            const aString = new strModel({
                _string: str,
                _length: len
            });

            aString.save(function(err) {
                if (err) {res.send(err)}
                //send back the new person
                else {
                    res.json({string: str, length: len});
                }
            })
        }
        // String found in database, return object to client
        else{
            console.log("String found in database");
            res.json({string: results[0]._doc._string, length: results[0]._doc._length});
        }
    })
});


//GET (new route): If no parameter is passed on the URI(i.e. http://localhost: 3000/hw2),
// return all strings currently stored in the database.

router.get('/', function (req, res, next) {
    strModel.find({}, function (err, results) {
        res.json(results);
    })
});

//POST: Similar to the GET, when passed a string,
// first look in the database to see if the string is already present.
// If it is, return the string and its length as read from the database.
// If it isn’t, compute the length,
// store the string and its length in the database,and return both to the client.
// If no string is passed,
// return a message in JSON format prompting the user to provide a string.

router.post('/', function(req, res, next) {

    // The request body has a valid _string field
    if(req.body._string){

        strModel.find({_string: req.body._string}, function (err, results) {

            // Cannot find given string in database, create new object in database
            if(Object.keys(results).length == 0){

                console.log("New string:", req.body._string, "\nCreating new object in database");

                let str = req.body._string;
                let len = str.length;
                const aString = new strModel({
                    _string: str,
                    _length: len
                });

                aString.save(function(err) {
                    if (err) {res.send(err)}
                    //send back the new person
                    else {
                        res.json({string: str, length: len});
                    }
                })
            }
            // String found in database, return object to client
            else{
                console.log("String", results[0]._doc._string, "found in database");
                res.json({string: results[0]._doc._string, length: results[0]._doc._length});
            }
        })

    }
    // The _string field of the body is invalid(undefined/null/empty string)
    else{
        res.send("Please enter a valid _string parameter for the POST request body")
    }
});


//DELETE: This route takes a string, and if the string is present in the database,
// it deletes the document and returns a message in JSON format indicating success.
// If the string is not present, return a ‘string not found’ message in JSON format

router.delete('/:_str', function (req, res, next) {
    strModel.findOneAndRemove({_string: req.params._str}, function (err, doc, result) {

        // In Mongoose, the findOneAndRemove method does not return
        // an error object when the condition does not meet.(unless there's no _string field)
        // Therefore, the easiest way is to check the document before updating
        // If the _string cannot be found in the database, then doc will be null
        if(doc == null) {res.json({message: 'String not found'});}
        else {res.json({message: 'Successful. Object has been deleted.'});}
    })
});

module.exports = router;