var Tea = require('../models/tea');
var Producer = require('../models/producer');
var Type = require('../models/type');
var Package = require('../models/package');
var async = require('async');
const { body,validationResult } = require('express-validator');

exports.producer_list = function(req, res, next) {
    Producer.find({}, 'country name')
            .exec((err, producers_list) => {
                if (err) return next(err);
                res.render('producerList', { title: 'Producer List', producers_list: producers_list })
            })
}

exports.producer_detail = function(req, res, next) {
    async.parallel({
        producer: function(callback) {
            Producer.findById(req.params.id)
                    .exec(callback)
        },
        producer_teas: function(callback){
            Tea.find({'producer': req.params.id})
                .exec(callback)
        }
    }, (err, results) => {
        if (err) return next(err);
        if (results.producer == null){
            var err = new Error('Producer not found');
            err.status = 404;
            return next(err);
        }
        res.render('producerDetail', { title:'Producer Detail', producer: results.producer, producer_teas: results.producer_teas })
    })
}

exports.producer_create_get = function(req, res, next) { 
    res.render('producerForm', { title: 'Express' });
};


exports.producer_create_post = [

    body('country_name', 'Country of origin must not be empty.').trim().isLength({ min: 3 }),
    body('country_name').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        var producer = new Producer({
            country: req.body.country_name,
            name: req.body.farm_name,
            established: req.body.established
        });

        if (!errors.isEmpty()){
            res.render('producerForm', { title: 'Producer form', producer: producer, errors: errors.array()});
            return
        } else {
            //Find out if producer with same country name and farm name already exists
            Producer.find({'country': req.body.country_name})
                    .exec((err, producers) => {
                        if (err) return next(err);
                        if (producers.length > 0){
                          for (var i=0; i<producers.length; i++) {
                            if (producers[i].name == req.body.farm_name){
                                res.redirect(producers[i].url)
                                return
                            }
                            }   
                        } else {
                          producer.save(err => {
                            if(err) return next(err)
                            res.redirect(producer.url);
                        })  
                        } 
                        
                    })
        }
    }
]

exports.producer_delete_get = function (req, res, next) {
    async.parallel({
        producer: function(callback) {
          Producer.findById(req.params.id).exec(callback)
        },
        producer_teas: function(callback) {
          Tea.find({'producer': req.params.id}).exec(callback)
        },
      }, (err, results) => {
        if (err) return next(err); 
        if (results.producer == null) {
          res.redirect('/producers');
        }
        res.render('producerDelete', {title: 'Delete producer', producer: results.producer, producer_teas: results.producer_teas });
      })
}

exports.producer_delete_post = function (req, res, next) {
    Producer.findById(req.params.id).exec((err, producer) => {
        if (err) return next(err);
        if (producer == null){
            res.redirect('/producers')
            return
        } else if(req.body.password !== process.env.PASSWORD){
            Tea.find({'producer': req.params.id}).exec((err, producer_teas)=>{
                if (err) return next(err);
                res.render('producerDelete', {title: 'Delete producer', producer: producer, producer_teas: producer_teas, error: 'You have entered wrong password' });
                return
            })
        } else {
            Producer.findByIdAndRemove(req.params.id, (err) => {
                if (err) return next(err);
                res.redirect('/producers')
            })
        }
    })
}

exports.producer_update_get = function(req, res, next) {
    Producer.findById(req.params.id, (err, result) => {
      if (err) return next(err);
      if (result == null) {
        var err = new Error('Producer not found');
        err.status = 404;
        return next(err);
      }
      res.render('producerForm', {title: 'Update producer', producer: result});
    })
};

exports.producer_update_post = [

    body('country_name', 'Country of origin must not be empty.').trim().isLength({ min: 3 }),
    body('country_name').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        var producer = new Producer({
            country: req.body.country_name,
            name: req.body.farm_name,
            established: req.body.established,
            _id: req.params.id
        });

        if (!errors.isEmpty() || req.body.password !== process.env.PASSWORD){
            Producer.findById(req.params.id, (err, result) => {
                if (err) return next(err);

                var errorsArray = errors.array();

                if(req.body.password !== process.env.PASSWORD){
                    errorsArray.push({
                        value: '',
                        msg: 'You have entered wrong password!',
                        param: 'password',
                        location: 'body'
                    });
                }

                res.render('producerForm', { title: 'Producer form', producer: result, errors: errorsArray});
            })
            return
        } else {
            Producer.findByIdAndUpdate(req.params.id, producer, {}, (err, theproducer) => {
                if (err) return next(err);
                res.redirect(theproducer.url)
            })
        }
    }
]

