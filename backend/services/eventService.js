const Event = require('../models/Events');
const User = require('../models/User');

// Create a event
const createEvent = async (event) => {
    try {
        return await Event.create(event);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get all events
const getEventsbyUser = async (id) => {
    try {
        return await Event.find({id});
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        return (await User.find()).filter((user) => user.role === 'user');
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUsersbyId = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

const getEventbyId = async (id) => {
    try {
        return await Event.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createEvent,
    getEventsbyUser,
    getEventbyId,
    getAllUsers,
    getUsersbyId,
};