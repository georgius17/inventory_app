var Tea = require('../models/tea');
var Producer = require('../models/producer');
var Type = require('../models/type');
var Package = require('../models/package');
var async = require('async');
const { body,validationResult } = require('express-validator');

exports.type_list = function(req, res, next) {
    Type.find({}, (err, types_list)=>{
        if (err) return next(err)
        res.render('typeList', {title: 'Types list', types_list: types_list})
    })
}

exports.type_detail = function(req, res, next) {
    async.parallel({
        type: function(callback){
            Type.findById(req.params.id)
                .exec(callback);
        },
        type_teas: function(callback){
            Tea.find({'type': req.params.id})
                .exec(callback);
        }
    }, (err, results) => {
        if (err) return next(err);
        if (results.type == null) {
            var err = new Error('Type not found');
            err.status = 404;
            return next(err);
        }
        res.render('typeDetail', { title: 'Type Detail', type: results.type, type_teas: results.type_teas })
    })
}

exports.type_create_get = function(req, res, next) { 
    res.render('typeForm', { title: 'Express' });
};

exports.type_create_post = [

    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }),
    body('name').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        let path = req.file ? req.file.path : '';

        var type = new Type({
            name: req.body.name,
            description: req.body.description,
            picture: path
        });

        if (!errors.isEmpty()){
            res.render('typeForm', { title: 'Express', type: type, errors: errors.array()});
            return
        } else {
            //Find out if type with same name already exists
            Type.findOne({'name': req.body.name})
                    .exec((err, found_type) => {
                        if (err) return next(err); 
                        if (found_type){
                            res.redirect(found_type.url);
                        } else {
                          type.save(err => {
                            if(err) return next(err)
                            res.redirect(type.url);
                        })  
                        } 
                        
                    })
        }
    }
]

exports.type_delete_get = function (req, res, next) {
    async.parallel({
        type: function(callback) {
          Type.findById(req.params.id).exec(callback)
        },
        type_teas: function(callback) {
          Tea.find({'type': req.params.id}).exec(callback)
        },
      }, (err, results) => {
        if (err) return next(err); 
        if (results.type == null) {
          res.redirect('/types');
        }
        res.render('typeDelete', {title: 'Delete type', type: results.type, type_teas: results.type_teas });
      })
}

exports.type_delete_post = function (req, res, next) {
    async.parallel({
        type: function(callback) {
          Type.findById(req.params.id).exec(callback)
        },
        type_teas: function(callback) {
          Tea.find({'type': req.params.id}).exec(callback)
        },
      }, (err, results) => {
        if (err) return next(err); 
        if (results.type_teas.length > 0) {
            res.render('typeDelete', {title: 'Delete Type', type: results.type, type_teas: results.type_teas });
            return
        } else if(req.body.password !== process.env.PASSWORD){
            res.render('typeDelete', {title: 'Delete Type', type: results.type, type_teas: results.type_teas, error: 'You have entered wrong password' });
            return
        } else {
            Type.findByIdAndRemove(req.params.id, (err) => {
                if (err) return next(err);
                res.redirect('/types')
            })
        }
      })
}

exports.type_update_get = function(req, res, next) {
    Type.findById(req.params.id, (err, result) => {
      if (err) return next(err);
      if (result == null) {
        var err = new Error('Type not found');
        err.status = 404;
        return next(err);
      }
      res.render('typeForm', {title: 'Update Type', type: result});
    })
};

exports.type_update_post = [

    body('name', 'Name must not be empty.').trim().isLength({ min: 1 }),
    body('name').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        let path = req.file ? req.file.path : '';

        var type = new Type({
            name: req.body.name,
            description: req.body.description,
            picture: path,
            _id: req.params.id
        });

        if (!errors.isEmpty() || req.body.password !== process.env.PASSWORD){
            Type.findById(req.params.id, (err, result) => {
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
            res.render('typeForm', { title: 'Express', type: result, errors: errorsArray});    
            })
            return
        } else {
            Type.findByIdAndUpdate(req.params.id, type, {}, (err, thetype) => {
                if (err) return next(err);
                res.redirect(thetype.url)
            })
        }
    }
]



  

