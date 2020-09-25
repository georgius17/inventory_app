var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TypeSchema = new Schema (
    {
        name: {type: String, required: true, minlength:3, maxlength: 100},
        picture: {type: String, required: false},
        description: {type: String, required: false}
    }
)

TypeSchema
.virtual('url')
.get(function () {
    return '/type/'+this._id;
});

module.exports = mongoose.model('Type', TypeSchema);
