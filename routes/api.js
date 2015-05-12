/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Philippe Leefsma 2014 - ADN/Developer Technical Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

var express = require('express');
var request = require('request');

var router = express.Router();

var cors = require('cors');

var corsOptions = {
  origin: 'http://secure-token.herokuapp.com'
};

router.get('/tokenadsk', function (req, res) {

    //steals access token from http://secure-token.herokuapp.com
    request('http://secure-token.herokuapp.com/api/token',
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });
});



///////////////////////////////////////////////////////////////////////////////
// Generates access token
///////////////////////////////////////////////////////////////////////////////
router.get('/token', cors(corsOptions),function (req, res) {
    var params = {
        client_id:  process.env.ConsumerKey , 
        client_secret:  process.env.ConsumerSecret, 
        grant_type: 'client_credentials'
    }

    // var thisHost = req.headers.refer;//req.protocol + '://' + req.get('host');
    //var appHost = 'http://secure-token.herokuapp.com';

    // if (thisHost != appHost) {
    //     var strMsg = ' request host: ' + thisHost;
    //     strMsg = strMsg + ' app host: ' + appHost;
    //     res.send('host restricted.' + strMsg);
    //     return;
    // }


    request.post(
        process.env.BaseUrl + '/authentication/v1/authenticate',
        { form: params },

        function (error, response, body) {
            if (!error && response.statusCode == 200) {

                // Website you wish to allow to connect
                //res.setHeader('Access-Control-Allow-Origin', appHost);

                // Request methods you wish to allow
                //res.setHeader('Access-Control-Allow-Methods', 'GET');

                // // Request headers you wish to allow
                // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

                // // Set to true if you need the website to include cookies in the requests sent
                // // to the API (e.g. in case you use sessions)
                // res.setHeader('Access-Control-Allow-Credentials', true);

                res.send(body);
            }
        });
});

module.exports = router;
