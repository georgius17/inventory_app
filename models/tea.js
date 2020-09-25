var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeaSchema = new Schema (
    {
        name: { type: String, required: true, minlength: 3 },
        type: { type: Schema.Types.ObjectId, ref: 'Type', required: true },
        producer: { type: Schema.Types.ObjectId, ref: 'Producer' },
        description: { type: String },
        picture: {type: String, required: false}
    }
)

TeaSchema
.virtual('url')
.get(function () {
    return '/tea/'+this._id;
});

module.exports = mongoose.model('Tea', TeaSchema);

