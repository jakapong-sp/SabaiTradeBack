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

const dateFormat = require('dateformat');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jakapong.sp@gmail.com', // your email
        pass: 'golflogin@ja' // your email password
    }
});

// mongoClient.connect(mongo_string, function (err, client) {
//     if (err) throw err;
//     var db = client.db(mongo_db_name);
//     cursor = db.Assets.changes([
//         {'$match': {
//             'operationType': {'$in': ['insert', 'replace']}
//         }},
//         {'$match': {
//             'newDocument.n': {'$gte': 1}
//         }}
//     ])
// });

// mongoClient.connect(mongo_string, function (err, client) {
//     if (err) throw err;
//     var db = client.db('local');
//     var collection = db.collection('oplog.rs');
//     console.log('oplog');
//     collection.find({}, {tailable:true}).each(function(error, entry){
//         if (error) {
//             // handle error
//         } else {
//             // get a new oplog entry
//             console.log('--- entry', entry);
//         }
//     })
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
                    $match: {
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

// #region Asset


// Asset Maker
router.get('/assetmaker/', function (req, res) {
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
                    $match: {
                        "Active": true
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

router.put('/assetmaker', function (req, res) {
    mongoClient.connect(mongo_string, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mongo_db_name);
        var query = { AssetRef: req.body.AssetRef };
        req.body.Approve1Date = new Date();
        console.log(req.body);
        // var newvalues = { $set: { Approve1By: req.body.Approve1By, Approve1Date: new Date(), Status: 'Approve1' } };
        var newvalues = {
            $set: req.body,
            $push: { Approve1: { amount: req.body.Amount, appby: req.body.Approve1By, appdate: new Date() } }
        };
        dbo.collection("Assets")
            .updateOne(query, newvalues, function (err, result) {
                if (err) throw err;
                console.log("1 Asset document updated (Approve By Maker");
                const response = { result: "ok", message: result.result.n + " Updated" };
                res.json(response);
                db.close();
            });
    });
});

// Asset Checker
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
                    $match: {
                        "Active": true,
                        Status: { $ne: null }
                        // "Approve1By": { $ne: null }
                    }
                }
            ])
            .toArray(function (findErr, result) {
                if (findErr) throw findErr;
                res.json(result);
                client.close();
            });
    });
});

router.put('/assetchecker', function (req, res) {
    mongoClient.connect(mongo_string, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mongo_db_name);
        // dbo.collection("Members").findOne({
        //     $and:
        //         [
        //             { MemberRef: req.body.MemberRef },
        //             { Active: true }
        //         ]
        // }, function (err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);
        //     db.close();
        // });

        var query = { AssetRef: req.body.AssetRef };
        console.log(req.body);

        if (req.body.Status == 'Approve2') {
            const mailBody = `
            <b>Approved ${req.body.AssetType}</b>
            <b>Ref : ${req.body.AssetRef} </b>
            <b>Amount : ${req.body.amount} </b>
            `;
            let mailOptions = {
                from: 'jakapong.sp@gmail.com', // sender
                to: 'gjsp.fn@gmail.com',// list of receivers
                subject: 'Sabai Trade Admin Approve Success',// Mail subject
                html: mailBody   // HTML body
            };
            transporter.sendMail(mailOptions, function (error, response) {
                transporter.close();
                if (error) {
                    console.log(error);
                } else {
                    console.log('Send Email Approve Success');
                }
            });
        }
        var newvalues = {
            $set: req.body,
            $push: { Approve2: { amount: req.body.Amount, apptype: req.body.Status, appby: req.body.Approve2By, appdate: new Date() } }
        };
        dbo.collection("Assets")
            .updateOne(query, newvalues, function (err, result) {
                if (err) throw err;
                console.log("1 Asset document updated (Approve Checker");
                const response = { result: "ok", message: result.result.n + " Updated" };
                res.json(response);
                db.close();
            });
    });
});

// #endregion

// #region Function

function refnumber(num, len) {
    return (Array(len).join("0") + num).slice(-len);
}
// #endregion 



router.post('/asset', function (req, res) {
    mongoClient.connect(mongo_string, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mongo_db_name);
        console.log(req.body);
        // dbo.collection("Assets").find({Active: true}).count(function(err,count){
        //     console.log(count);
        // });
        autoIncrement.getNextSequence(dbo, 'Assets', function (err, autoIndex) {
            req.body.AssetRef = 'DP' + refnumber(autoIndex, 5);
            req.body.MemberRef = req.body.MemberRef;
            req.body.AssetType = req.body.AssetType;
            req.body.Amount = null;
            req.body.AmountRequest = req.body.AmountRequest;
            req.body.Status = null;
            req.body.Approve1Date = null;
            req.body.Approve1By = null;
            req.body.Approve2Date = null;
            req.body.Approve2By = null;
            req.body.Active = true;
            req.body.CreateDate = new Date();
            req.body.CreateBy = req.body.CreateBy;
            dbo.collection("Assets").insertOne(req.body, function (err, result) {
                if (err) throw err;
                console.log("1 document inserted (Assets Deposit)");
                const response = { result: "ok", message: result.result.n + " Updated" };
                res.json(response);
                console.log(req.body);
                db.close();
            });
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
