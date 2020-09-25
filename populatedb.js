#! /usr/bin/env node


// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Tea = require('./models/tea')
var Type = require('./models/type')
var Producer = require('./models/producer')
var Package = require('./models/package')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var teas = []
var types = []
var producers = []
var packages = []

function teaCreate(name, type, producent, description, picture, cb) {
  teadetail = {
      name: name, 
      type: type, 
      producent: producent
    }

  if (description != false) teadetail.description = description
  if (picture != false) gamedetail.picture = picture;
  
  var tea = new Tea(teadetail);
       
  tea.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Tea: ' + tea);
    teas.push(tea)
    cb(null, tea)
  }  );
}

function typeCreate(name, picture, cb) {
  typedetail = {
    name: name
  }
  if (picture != false) typedetail.picture = picture;
  var type = new Type(typedetail);
       
  type.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Type: ' + type);
    types.push(type)
    cb(null, type);
  }   );
}

function producerCreate(country, name, established, cb) {
  producerdetail = { 
    country: country
  }
  if (established != false) producerdetail.established = established
  if (name != false) producerdetail.name = name
    
  var producer = new Producer(producerdetail);    
  producer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Producer: ' + producer);
    producers.push(producer)
    cb(null, producer)
  }  );
}


function packageCreate(tea, type, amount, unit, price, stock, cb) {
  packagedetail = { 
    tea: tea,
    type: type,
    amount: amount,
    unit: unit,
    price: price,
    stock: stock
  }    

  var package = new Package(packagedetail)
   
  package.save(function (err) {
    if (err) {
      console.log('ERROR CREATING Package: ' + package);
      cb(err, null)
      return
    }
    console.log('New Package: ' + package);
    packages.push(package)
    cb(null, tea)
  }  );
}


function createTypeProducers(cb) {
    async.series([
        function(callback) {
          producerCreate('Japan', 'Kyoto Obubu', '1950', callback);
        },
        function(callback) {
          producerCreate('Taiwan', 'Shan Lin Xi', '1930', callback);
        },
        function(callback) {
          producerCreate('Sri Lanka', false, false, callback);
        },
        function(callback) {
          typeCreate("Oolong", false, callback);
        },
        function(callback) {
          typeCreate("Green", false, callback);
        },
        function(callback) {
          typeCreate("Herbal", false, callback);
        },
        ],
        // optional callback
        cb);
}


function createTeas(cb) {
    async.parallel([
        function(callback) {
          teaCreate('Don Ding', types[0], producers[1], 'Dong Ding means "Frozen Summit." Dong Ding Oolong is 30-50% oxidized and then heavily baked for an extended period of time. As a result, it has a darker color.', false, callback)
        },
        function(callback) {
          teaCreate('Ali Shan', types[0], producers[1], 'Ali Shan is a well known tourist destination. It is famous for its thousand year old giant cypress forest.', false, callback)
        },
        function(callback) {
          teaCreate('Organic Sencha', types[1], producers[0], 'The liquor is bright rye yellow and has a sweet honey aroma. The tea has a fresh and brisk green taste with a present astringency carrying notes of chives.', false, callback)
        },
        function(callback) {
          teaCreate('Sakura Tea', types[2], producers[0], 'A transparent pink expands in the cup revealing a flowery aroma with hints of the sea. This tea is made by preserving cherry blossoms in salt and plum vinegar.', false, callback)
        },
        function(callback) {
          teaCreate('Ceylon Green', types[1], producers[2], ' Its taste is dominated by meadow flowers and honey, and at the end by ripe fruit.', false, callback)
        },
        function(callback) {
          teaCreate('Test tea1', types[1], producers[2], '', false, callback)
        },
        ],
        // optional callback
        cb);
}


function createPackages(cb) {
    async.parallel([
        function(callback) {
          packageCreate(teas[0], 'Loose tea', '1000', 'g', '40', '5', callback)
        },
        function(callback) {
          packageCreate(teas[0], 'Loose tea', '70', 'g', '4', '10', callback)
        },
        function(callback) {
          packageCreate(teas[1], 'Tea bags', '20', 'pcs', '5', '10', callback)
        },
        function(callback) {
          packageCreate(teas[2], 'Loose tea', '2000', 'g', '70', '5', callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createTypeProducers,
    createTeas,
    createPackages
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Packages: '+packages);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



