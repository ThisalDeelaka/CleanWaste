import * as chai from 'chai';
import chaiHttp from 'chai-http';  // Ensure chai-http is properly imported
import { describe, it, before, after } from 'mocha';
import mongoose from 'mongoose';
import server from '../server.js';  // Ensure this points to your server file
import User from '../models/User.js';  // Import the User model
import DriverAssignment from '../models/Driver.js';  // Import the DriverAssignment model
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  // Load the .env.test file

chai.use(chaiHttp);  // Make sure chai-http is used
const { expect } = chai;

describe('Driver Task API', () => {

  let driverToken;

  // Before running the tests, create a driver and get a token
  before(async () => {
    await User.deleteMany({});
    await DriverAssignment.deleteMany({});

    // Register a driver
    const driver = new User({
      name: 'Driver One',
      email: 'driver@example.com',
      password: 'driver123',
      role: 'driver',
      address: {
        street: 'Vihara Road',
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
    await DriverAssignment.deleteMany({});
  });

  // Test: Should get assigned pickups for the driver
  it('should get assigned pickups', (done) => {
    chai.request(server)  // Make sure chai.request is being used after chai.use(chaiHttp)
      .get('/api/drivers/assigned-pickups')
      .set('Authorization', `Bearer ${driverToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);  // Expect success
        done();
      });
  });

  // Test: Should complete a task
  it('should mark a task as completed', (done) => {
    chai.request(server)
      .post('/api/drivers/complete-task')
      .set('Authorization', `Bearer ${driverToken}`)
      .send({
        street: 'Vihara Road'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);  // Expect success
        done();
      });
  });
});
