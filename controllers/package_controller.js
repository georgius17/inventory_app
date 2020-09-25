var Tea = require('../models/tea');
var Producer = require('../models/producer');
var Type = require('../models/type');
var Package = require('../models/package');
var async = require('async');
const { body,validationResult } = require('express-validator');

exports.package_list = function(req, res, next) {
    Package.find({}, 'tea type amount unit')
            .populate('tea')
            .exec((err, packages_list) => {
                if (err) return next(err);
                res.render('packageList', { title: 'Package List', packages_list: packages_list })
            })
}

exports.package_detail = function(req, res, next) {
    Package.findById(req.params.id)
        .populate('tea')
        .exec((err, package_item)=>{
        if (err) return next(err);
        if (package_item == null) { // No results.
            var err = new Error('package not found');
            err.status = 404;
            return next(err);
        }
        res.render('packageDetail', { title:'Package Detail', package_item: package_item })
    })
        
}

exports.package_create_get = function(req, res, next) { 
    Tea.find({}, 'name')
        .exec((err, teas) => {
            if (err) return next(err);
            res.render('packageForm', { title: 'Express', teas: teas });
        })
};


exports.package_create_post = [
    body('tea', 'You have to choose the tea!').trim().isLength({ min: 1 }),
    body('type', 'Type of the package must not be empty.').trim().isLength({ min: 1 }),
    body('amount', 'You have to enter the amount of the package.').trim().isLength({ min: 1 }),
    body('unit', 'You have to choose the unit!').trim().isLength({ min: 1 }),
    body('price', 'You have to enter the price').trim().isLength({ min: 1 }),
    body('amount', 'You have to enter the stock').trim().isLength({ min: 1 }),

    body('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var packageItem = new Package(
          { tea: req.body.tea,
            type: req.body.type,
            amount: req.body.amount,
            unit: req.body.unit,
            price: req.body.price,
            stock: req.body.stock
           });

           if (!errors.isEmpty()) {
            Tea.find({}, 'name')
                .exec((err, teas) => {
                    if (err) return next(err);
                    res.render('packageForm', { title: 'Express', teas: teas, selected_tea: packageItem.tea._id , errors: errors.array(), package_item: packageItem });
            })
            return;
        } else {
            packageItem.save(err => {
                if (err) return next(err);
                res.redirect(packageItem.url)
            });
        }
    }
]

exports.package_delete_get = function (req, res, next) {
    Package.findById(req.params.id)
        .populate('tea')
        .exec((err, package_item)=>{
        if (err) return next(err);
        if (package_item == null) {
            res.redirect('/packages');
          }
        res.render('packageDelete', { title:'Package Delete', package_item: package_item })
    })
}

exports.package_delete_post = function (req, res, next) {
    Package.findById(req.params.id).exec((err, package_item) => {
        if (err) return next(err);
        if (package_item == null){
            res.redirect('/packages')
            return
        } else if(req.body.password !== process.env.PASSWORD){
            res.render('packageDelete', { title:'Package Delete', package_item: package_item, error: 'You have entered wrong password' })
        } else {
            Package.findByIdAndRemove(req.params.id, (err) => {
                if (err) return next(err);
                res.redirect('/packages')
            })
        }
        
    })
}

exports.package_update_get = function(req, res, next) { 
    async.parallel({
        packageItem : function(callback){
            Package.findById(req.params.id).populate('tea').exec(callback);
        },
        teas: function(callback) {
            Tea.find({}, 'name').exec(callback);
        }
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('packageForm', { title: 'Update Package', teas: results.teas, packageItem: results.packageItem });
    });
};

exports.package_update_post = [
    body('tea', 'You have to choose the tea!').trim().isLength({ min: 1 }),
    body('type', 'Type of the package must not be empty.').trim().isLength({ min: 1 }),
    body('amount', 'You have to enter the amount of the package.').trim().isLength({ min: 1 }),
    body('unit', 'You have to choose the unit!').trim().isLength({ min: 1 }),
    body('price', 'You have to enter the price').trim().isLength({ min: 1 }),
    body('amount', 'You have to enter the stock').trim().isLength({ min: 1 }),

    body('*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var packageItem = new Package(
          { tea: req.body.tea,
            type: req.body.type,
            amount: req.body.amount,
            unit: req.body.unit,
            price: req.body.price,
            stock: req.body.stock,
            _id: req.params.id
           });

           if (!errors.isEmpty() || req.body.password !== process.env.PASSWORD) {

            async.parallel({
                teas: function(callback) {
                    Tea.find({}, 'name').exec(callback);
                },
                packageItem : function(callback){
                    Package.findById(req.params.id).populate('tea').exec(callback);
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
                res.render('packageForm', { title: 'Update Package', teas: results.teas, packageItem: results.packageItem, errors: errorsArray });
            });
            return

        } else {
            Package.findByIdAndUpdate(req.params.id, packageItem, {}, (err, thepackage) => {
                if (err) return next(err);
                res.redirect(thepackage.url)
            })
        }
    }
]


