import { expect } from 'chai';
const {
  createEvent,
  getEventsbyUser,
  getAllUsers,
  getUsersbyId,
  getEventbyId,
} = require('./eventController');
const Event = require('../models/Events');
const User = require('../models/User');

describe('Event Controller', () => {
  let eventData;
  let userData;

  beforeEach(async () => {
    eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      date: '2024-10-15T12:00:00Z',
      location: 'Test Location',
      userId: '12345',
    };

    userData = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    };

    await User.create(userData);
    await Event.create(eventData);
  });

  afterEach(async () => {
    await Event.deleteMany({});
    await User.deleteMany({});
  });

  describe('createEvent', () => {
    it('should create a new event', async () => {
      const createdEvent = await createEvent(eventData);
      expect(createdEvent).to.be.an('object');
      expect(createdEvent.title).to.equal(eventData.title);
      expect(createdEvent.description).to.equal(eventData.description);
      expect(createdEvent.date).to.equal(eventData.date);
      expect(createdEvent.location).to.equal(eventData.location);
      expect(createdEvent.userId).to.equal(eventData.userId);
    });
  });

  describe('getEventsbyUser', () => {
    it('should get events by user ID', async () => {
      const events = await getEventsbyUser(userData._id);
      expect(events).to.be.an('array');
      expect(events.length).to.be.greaterThan(0);
      events.forEach((event) => {
        expect(event.userId).to.equal(userData._id);
      });
    });
  });

  describe('getAllUsers', () => {
    it('should get all users', async () => {
      const users = await getAllUsers();
      expect(users).to.be.an('array');
      expect(users.length).to.be.greaterThan(0);
      users.forEach((user) => {
        expect(user.role).to.equal('user');
      });
    });
  });

  describe('getUsersbyId', () => {
    it('should get a user by ID', async () => {
      const user = await getUsersbyId(userData._id);
      expect(user).to.be.an('object');
      expect(user.name).to.equal(userData.name);
      expect(user.email).to.equal(userData.email);
      expect(user.role).to.equal(userData.role);
    });
  });

  describe('getEventbyId', () => {
    it('should get an event by ID', async () => {
      const event = await getEventbyId(eventData._id);
      expect(event).to.be.an('object');
      expect(event.title).to.equal(eventData.title);
      expect(event.description).to.equal(eventData.description);
      expect(event.date).to.equal(eventData.date);
      expect(event.location).to.equal(eventData.location);
      expect(event.userId).to.equal(eventData.userId);
    });
  });
});