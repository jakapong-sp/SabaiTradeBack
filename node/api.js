const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const session = require('express-session');

const mongoClient = require("mongodb").MongoClient;
const autoIncrement = require("mongodb-autoincrement");
const formidable = require('formidable');
const mongo_string = "mongodb://localhost:27017";
const mongo_db_name = "SBB";

// router.get('/asset/', function (req, res) {
//     console.log("Assets");
//     mongoClient.connect(mongo_string, function (err, client) {
//         if (err) throw err;
//         var db = client.db(mongo_db_name);
//         db.collection('Assets').find().toArray(function (findErr, result) {
//             if (findErr) throw findErr;
//             console.log(result);
//             res.json(result);
//             client.close();
//         });
//     });
// });


router.get('/asset/', function (req, res) {
    mongoClient.connect(mongo_string, function (err, client) {
        if (err) throw err;
        var db = client.db(mongo_db_name);
        db.collection('Assets')
            .aggregate([
                {
                    $lookup:
                        {
                            from: 'Members',
                            localField: 'MemberRef',
                            foreignField: 'MemberRef',
                            as: 'MemberLookup'
                        }
                }
                , { $sort: { CreateDate: 1 } },
                {
                    $match:{
                       "Active": true,
                       "Status": null
                    }
                 }
            ])
            //.find({ Active: true, Status: null })
            .toArray(function (findErr, result) {
                if (findErr) throw findErr;
                res.json(result);
                client.close();
            });
    });
});

router.get('/assetchecker/', function (req, res) {
    mongoClient.connect(mongo_string, function (err, client) {
        if (err) throw err;
        var db = client.db(mongo_db_name);
        db.collection('Assets')
            .aggregate([
                {
                    $lookup:
                        {
                            from: 'Members',
                            localField: 'MemberRef',
                            foreignField: 'MemberRef',
                            as: 'MemberLookup'
                        }
                }
                , { $sort: { CreateDate: 1 } },
                {
                    $match:{
                       "Active": true,
                       "Status": 'Approve1'
                    }
                 }
            ])
            //.find({ Active: true, Status: null })
            .toArray(function (findErr, result) {
                if (findErr) throw findErr;
                res.json(result);
                client.close();
            });
    });
});
// Approve
// router.put('/asset1', function (req, res) {
//     var query = { AssetRef: '61031200001' };
//     var newvalues = { $set: { Approve1By: "ddddddddddddddddd" } };
//     console.log("Assets http put called: " + req.body_id);
//     console.log(req.body);
//     mongoClient.connect(mongo_string, function (err, client) {
//         var db = client.db(mongo_db_name);
//         db.collection("Assets")
//             .updateOne(query, newvalues, function (err, result) {
//                 if (err) throw err;
//                 const response = { result: "ok", message: result.result.n + " Updated" };
//                 res.json(response); 
//                 client.close();
//             });
//     });
// });

router.put('/asset', function (req, res) {
    mongoClient.connect(mongo_string, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mongo_db_name);
        var query = { AssetRef: req.body.AssetRef };
        req.body.Approve1Date = new Date();
        // var newvalues = { $set: { Approve1By: req.body.Approve1By, Approve1Date: new Date(), Status: 'Approve1' } };
        var newvalues = { $set: req.body };

        dbo.collection("Assets")
            .updateOne(query, newvalues, function (err, result) {
                if (err) throw err;
                console.log("1 document updated");
                const response = { result: "ok", message: result.result.n + " Updated" };
                res.json(response);
                db.close();
            });
    });
});


router.post('/fileUpload/', function (req, res) {
    console.log("Upload File");
    try {
        var form = new formidable.IncomingForm();
        var newname = Date.now();
        form.parse(req, function (err, fields, files) {

            var oldpath = files.filetoupload.path;
            var newpath = path.resolve("node/uploaded/images/") + "/" + newname + "." + files.filetoupload.name.split(".")[1];
            console.log("old path " + oldpath);
            console.log("new path " + newpath);
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('[{"success":1,"messege":"File uploaded and moved!","name":"' + newname + "." + files.filetoupload.name.split(".")[1] + '"}]');
                res.end();
            });
        });
    } catch (err) {
        console.log("err : " + err);
    }
});

router.post('/login', function (req, res) {
    mongoClient.connect(mongo_string, function (err, db) {
        console.log(req.body.Email);
        if (err) throw err;
        var dbo = db.db(mongo_db_name);
        dbo.collection("Users").findOne({
            $and:
                [
                    { Email: req.body.Email },
                    { Password: req.body.Password }
                ]
        }, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });
});

router.post('/logintest', function (req, res) {
    var response;
    response = {
        "email": "jakapong.sp@gmail.com",
        "username": "jakapong",
        "text": "login success"
    };
    console.log(response);
    res.json(response);
});


module.exports = router;
