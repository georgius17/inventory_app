var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProducerSchema = new Schema (
    {
        country: { type: String, required: true },
        name: { type: String },
        established: { type: Number, min: 1000, max: 2100 }
    }
)

ProducerSchema
.virtual('url')
.get(function () {
    return '/producer/'+this._id;
});

module.exports = mongoose.model('Producer', ProducerSchema);
