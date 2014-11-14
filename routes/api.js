var express = require('express');
var router = express.Router();

/* GET appointments listing. */
router.get('/appointments', function(req, res) {
    var json = require('../public/v1/personal-training-schedule/appointments');
    console.warn('GET. Server response: ' + res.statusCode);
    console.dir(json);
    res.send(JSON.stringify(json));
});

/* GET appointment. */
router.get('/appointments/*', function(req, res) {
    var json = require('../public/v1/personal-training-schedule/appointment');
    console.warn('GET. Server response: ' + res.statusCode);
    console.dir(json);
    res.send(JSON.stringify(json));
});

router.put('/update', function(req, res) {
    console.info('PUT schedule. Server response: ' + res.statusCode);
    console.dir(req.body);
    var json = require('../public/v1/personal-training-schedule/reschedule');
    res.send(JSON.stringify(json));
});

router.post('/create', function(req, res) {
    console.info('POST schedule. Server response: ' + res.statusCode);
    console.dir(req.body);
    var json = require('../public/v1/personal-training-schedule/create');
    res.send(JSON.stringify(json));
});

router.put('/cancel', function(req, res) {
    console.info('PUT schedule. Server response: ' + res.statusCode);
    console.dir(req.body);
    var json = require('../public/v1/personal-training-schedule/cancel');
    res.send(JSON.stringify(json));
});

router.get('/error', function(req, res) {
    'use strict';
    var json = require('../public/v1/personal-training-schedule/appointment-error');
    console.warn('GET. Server response: ' + res.statusCode);
    console.dir(json);
    res.send(JSON.stringify(json));
});

module.exports = router;

