var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PackageSchema = new Schema(
  {
    tea: { type: Schema.Types.ObjectId, ref: 'Tea', required: true }, 
    type: {type: String, required: true, enum: ['Tea bags', 'Loose tea', 'Compressed tea', 'Instant tea', 'Bottled tea'], default: 'Loose tea'},
    amount: { type: Number, required: true, min: 1, max: 5000 },
    unit: { type: String, required: true, enum: ['ml', 'g', 'pcs'], default: 'g' },
    price: { type: Number, required: true, min: 1 },
    stock: { type: Number, min: 0, required: true },
  }
);

// Virtual for bookinstance's URL
PackageSchema
.virtual('url')
.get(function () {
  return '/package/' + this._id;
});


//Export model
module.exports = mongoose.model('Package', PackageSchema);