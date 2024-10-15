const e = require('express');
const eventService = require('../services/eventService');

const createEvent = async (req, res) => {
    try {
        const { Eventname, EventDescription, EventDate, EventTime, eventLocation, setby,eventUsers } = req.body;
        const event = await eventService.createEvent({
        Eventname,
        EventDescription,
        EventDate,
        EventTime,
        eventLocation,
        setby,
        eventUsers,
        });
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

const getEventsbyUser = async (req, res) => {
    try {
        const events = await eventService.getEventsbyUser(req.params.id);
        res.json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getEventbyId = async (req, res) => {
    try {
        eventId = req.params.eventId;
        console.log(eventId);
        const events = await eventService.getEventbyId(eventId);
        console.log(events);
        res.json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await eventService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUsersbyId = async (req, res) => {
    try {
        const users = await eventService.getUsersbyId(req.params.id);
        res.json({id:users._id,name:users.name});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEventsbyUser,
    getEventbyId,
    getAllUsers,
    getUsersbyId,
};