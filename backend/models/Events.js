const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    Eventname: { type: String, required: true },
    EventDescription: { type: String, required: true },
    EventDate: { type: Date, required: true },
    EventTime: { type: String, required: true },
    eventLocation:{ 
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
     },
    setby: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    }, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);