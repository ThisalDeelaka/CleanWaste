import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after } from 'mocha';
import mongoose from 'mongoose';
import server from '../server.js';  // Ensure this points to your server file
import User from '../models/User.js';  // Import the User model
import WasteRequest from '../models/WasteRequest.js';  // Import the WasteRequest model
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  // Load the .env.test file

chai.use(chaiHttp);
const { expect } = chai;

describe('Waste Request API', () => {

  let userToken;
  let driverToken;
  let wasteRequestId;

  // Before all tests, create a user, a driver, and get tokens for both
  before(async () => {
    await User.deleteMany({});
    await WasteRequest.deleteMany({});

    // Register a user
    const user = new User({
      name: 'User One',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
      address: {
        street: 'Vihara Road',
        city: 'Colombo',
        postalCode: '12345'
      }
    });
    await user.save();

    userToken = jwt.sign({ userId: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Register a driver
    const driver = new User({
      name: 'Driver One',
      email: 'driver@example.com',
      password: 'driver123',
      role: 'driver',
      address: {
        street: 'Waliwita Road',
        city: 'Colombo',
        postalCode: '12345'
      }
    });
    await driver.save();

    driverToken = jwt.sign({ userId: driver._id, role: 'driver' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  // After all tests, clean up the database
  after(async () => {
    await User.deleteMany({});
    await WasteRequest.deleteMany({});
  });

  // Test: Should create a new waste request
  it('should create a new waste request', (done) => {
    chai.request(server)
      .post('/api/waste-requests/create')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        wasteType: ['Organic Waste'],
        location: {
          latitude: 6.9271,
          longitude: 79.8612
        },
        userId: 'user@example.com'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);  // Expect a 201 status (created)
        expect(res.body).to.be.an('object');  // Expect response to be an object
        wasteRequestId = res.body._id;
        done();
      });
  });

  // Test: Should assign a driver to a waste request (admin action)
  it('should assign a driver to the waste request', (done) => {
    chai.request(server)
      .post('/api/waste-requests/assign-driver')
      .set('Authorization', `Bearer ${driverToken}`)  // Pretend driver is admin
      .send({
        requestId: wasteRequestId,
        driverId: 'driver@example.com'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);  // Expect success
        done();
      });
  });

  // Test: Should mark waste as picked up (driver action)
  it('should mark the waste request as picked up', (done) => {
    chai.request(server)
      .post('/api/waste-requests/mark-picked-up')
      .set('Authorization', `Bearer ${driverToken}`)
      .send({
        requestId: wasteRequestId
      })
      .end((err, res) => {
        expect(res).to.have.status(200);  // Expect success
        done();
      });
  });
});
