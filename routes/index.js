var express = require('express');
var router = express.Router();

//var multer  = require('multer')
//var upload = multer({ dest: './public/data/uploads/' })

var tea_controller = require('../controllers/tea_controller');
var type_controller = require('../controllers/type_controller');
var producer_controller = require('../controllers/producer_controller');
var package_controller = require('../controllers/package_controller');

const parser = require('../cloudinary-config');

// router.get('/', (req, res, next) => {
//     res.render('index', { title: 'Express' });
// });

router.get('/', tea_controller.index);

/// TEA ROUTES ///
router.get('/tea/create', tea_controller.tea_create_get);
router.post('/tea/create', parser.single('pictureInput'), tea_controller.tea_create_post)
router.get('/tea/:id', tea_controller.tea_detail)
router.get('/teas', tea_controller.tea_list);
router.get('/tea/:id/delete', tea_controller.tea_delete_get);
router.post('/tea/:id/delete', tea_controller.tea_delete_post);
router.get('/tea/:id/update', tea_controller.tea_update_get);
router.post('/tea/:id/update', parser.single('pictureInput'), tea_controller.tea_update_post);


/// TYPE ROUTES ///
router.get('/type/create', type_controller.type_create_get);
router.post('/type/create', parser.single('pictureInput'), type_controller.type_create_post);
router.get('/type/:id', type_controller.type_detail)
router.get('/types', type_controller.type_list);
router.get('/type/:id/delete', type_controller.type_delete_get);
router.post('/type/:id/delete', type_controller.type_delete_post);
router.get('/type/:id/update', type_controller.type_update_get);
router.post('/type/:id/update', parser.single('pictureInput'), type_controller.type_update_post);

/// PRODUCER ROUTES ///
router.get('/producer/create', producer_controller.producer_create_get);
router.post('/producer/create', producer_controller.producer_create_post)
router.get('/producer/:id', producer_controller.producer_detail)
router.get('/producers', producer_controller.producer_list);
router.get('/producer/:id/delete', producer_controller.producer_delete_get);
router.post('/producer/:id/delete', producer_controller.producer_delete_post);
router.get('/producer/:id/update', producer_controller.producer_update_get);
router.post('/producer/:id/update', producer_controller.producer_update_post);

/// PACKAGE ROUTES ///
router.get('/package/create', package_controller.package_create_get);
router.post('/package/create', package_controller.package_create_post)
router.get('/package/:id', package_controller.package_detail)
router.get('/packages', package_controller.package_list);
router.get('/package/:id/delete', package_controller.package_delete_get);
router.post('/package/:id/delete', package_controller.package_delete_post);
router.get('/package/:id/update', package_controller.package_update_get);
router.post('/package/:id/update', package_controller.package_update_post);


module.exports = router;
