const Event = require('../models/Events');

// Create a event
const createEvent = async (event) => {
    try {
        return await Event.create(event);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all events
const getEvents = async () => {
    try {
        return await Event.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createEvent,
    getEvents,
};