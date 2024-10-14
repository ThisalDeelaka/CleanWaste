const createEvent = async (req, res) => {
    try {
        const { Eventname, EventDescription, EventDate, EventTime, eventLocation, setby } = req.body;
        const event = await eventService.createEvent({
        Eventname,
        EventDescription,
        EventDate,
        EventTime,
        eventLocation,
        setby,
        });
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    };

const getEvents = async (req, res) => {
    try {
        const events = await eventService.getEvents();
        res.json(events);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
};