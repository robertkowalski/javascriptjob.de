// http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/

var mongoose = require('mongoose');

var CounterSchema;

CounterSchema = new mongoose.Schema({
    _id: String,
    next: {type: Number, default: 0}
});

// creates a new one if id was not found
CounterSchema.statics.increment = function (id, callback) {
    return this.findByIdAndUpdate(id, { $inc: { next: 1 } }, {new: true, upsert: true, select: {next: 1}}, callback);
};

CounterSchema.statics.ID = 'jobcount';



module.exports = CounterSchema;