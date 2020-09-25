var Tea = require('../models/tea');
var Producer = require('../models/producer');
var Type = require('../models/type');
var Package = require('../models/package');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require('express-validator');
var multer  = require('multer');


exports.index = function(req, res) {   
    async.parallel({
        tea_count: function(callback) {
            Tea.countDocuments({}, callback); 
        },
        tea_package_count: function(callback) {
            Package.countDocuments({}, callback);
        },
        producer_count: function(callback) {
            Producer.countDocuments({}, callback);
        },
        type_count: function(callback) {
            Type.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Tea Inventory', error: err, data: results });
    });
};

exports.tea_list = function(req, res, next) {
    async.parallel({
        teas: function(callback) {
            Tea.find({}, 'name type producer')
                .populate('type')
                .populate('producer')
                .exec(callback)
        },
        packages: function(callback){
            Package.find({}, 'tea type amount unit stock')
                .exec(callback)
        }
    }, (err, results) => {
        if (err) return next(err);
        res.render('teaList', { title: 'Tea List', teas: results.teas, packages: results.packages })
    })

}


exports.tea_detail = function(req, res, next) {
    var id = mongoose.Types.ObjectId(req.params.id); 
    async.parallel({
        tea: function(callback){
            Tea.findById(req.params.id)
                .populate('type')
                .populate('producer')
                .exec(callback)
        },
        packages: function(callback){
            Package.find({'tea': id})
                .exec(callback)
        }
    }, (err, results) => {
        if (err) return next(err);
        if (results.tea == null) { // No results.
            var err = new Error('Tea not found');
            err.status = 404;
            return next(err);
        }
        res.render('teaDetail', { title:'Tea Detail', tea: results.tea, packages: results.packages })
    })
}

exports.tea_create_get = function(req, res, next) { 
    async.parallel({
        types: function(callback) {
            Type.find(callback);
        },
        producers: function(callback) {
            Producer.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('teaForm', { title: 'Create Tea', types: results.types, producers: results.producers });
    });
};

exports.tea_create_post = [

    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }),
    body('type', 'Type must not be empty.').trim().isLength({ min: 1 }),
    body('producer', 'Producer must not be empty.').trim().isLength({ min: 1 }),
    body('description', 'Description must not be empty.').trim().isLength({ min: 1 }),

    body('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        var path = req.file ? req.file.path : '';

        var tea = new Tea({
            name: req.body.name,
            type: req.body.type,
            producer: req.body.producer,
            description: req.body.description,
            picture: path
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
                types: function(callback) {
                    Type.find(callback);
                },
                producers: function(callback) {
                    Producer.find(callback);
                }
            }, (err, results) => {
                if (err) return next(err);
                res.render('teaForm', { title: 'Create Tea', types: results.types, producers: results.producers, errors: errors.array() });
            });
            return
        } else {
            tea.save(function(err){
                if (err) return next(err);
                res.redirect(tea.url);
            })
        }
    }
]

exports.tea_delete_get = function (req, res, next) {
    async.parallel({
        tea: function(callback) {
          Tea.findById(req.params.id)
                .populate('type')
                .populate('producer')
                .exec(callback)
        },
        packages: function(callback) {
            Package.find({'tea': req.params.id}).exec(callback)
        },
      }, (err, results) => {
        if (err) return next(err); 
        if (results.tea == null) {
          res.redirect('/teas');
        }
        res.render('teaDelete', {title: 'Delete Tea', tea: results.tea, packages: results.packages });
      })
}

exports.tea_delete_post = function (req, res, next) {
    async.parallel({
        tea: function(callback) {
            Tea.findById(req.params.id)
                  .populate('type')
                  .populate('producer')
                  .exec(callback)
          },
        packages: function(callback) {
            Package.find({'tea': req.params.id}).exec(callback)
        },
      }, (err, results) => {
        if (err) return next(err); 
        if (results.packages.length > 0) {
            res.render('teaDelete', {title: 'Delete Tea', tea: results.tea, packages: results.packages });
            return
        } else if(req.body.password !== process.env.PASSWORD){
            res.render('teaDelete', {title: 'Delete Tea', tea: results.tea, packages: results.packages, error: 'You have entered wrong password' });
            return
        } else {
            Tea.findByIdAndRemove(req.params.id, (err) => {
                if (err) return next(err);
                res.redirect('/teas')
            })
        }
      })
}

exports.tea_update_get = function(req, res, next) { 
    async.parallel({
        tea : function(callback){
            Tea.findById(req.params.id).populate('type').populate('producer').exec(callback);
        },
        types: function(callback) {
            Type.find(callback);
        },
        producers: function(callback) {
            Producer.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('teaForm', { title: 'Update Tea', types: results.types, producers: results.producers, tea: results.tea });
    });
};

exports.tea_update_post = [

    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }),
    body('type', 'Type must not be empty.').trim().isLength({ min: 1 }),
    body('producer', 'Producer must not be empty.').trim().isLength({ min: 1 }),
    body('description', 'Description must not be empty.').trim().isLength({ min: 1 }),

    body('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        let path = req.file ? req.file.path : '';

        var tea = new Tea({
            name: req.body.name,
            type: req.body.type,
            producer: req.body.producer,
            description: req.body.description,
            picture: path,
            _id: req.params.id
        });

        if (!errors.isEmpty() || req.body.password !== process.env.PASSWORD) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
                types: function(callback) {
                    Type.find(callback);
                },
                producers: function(callback) {
                    Producer.find(callback);
                },
                tea: function(callback) {
                    Tea.findById(req.params.id).populate('type').populate('producer').exec(callback);
                }
            }, (err, results) => {
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
                res.render('teaForm', { title: 'Update Tea', tea: results.tea, types: results.types, producers: results.producers, errors: errorsArray });
            });
            return
        } else {
            Tea.findByIdAndUpdate(req.params.id, tea, {}, (err, thetea) => {
                if (err) return next(err);
                res.redirect(thetea.url)
            })
        }
    }
]

