import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after } from 'mocha';
import mongoose from 'mongoose';
import server from '../server.js';  // Ensure this points to your server file
import User from '../models/User.js';  // Import the User model
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  // Load the .env.test file

chai.use(chaiHttp);
const { expect } = chai;

describe('Admin Driver Registration API', () => {

  let adminToken;

  // Before running the tests, register an admin and get a token
  before(async () => {
    await User.deleteMany({});
    // Register an admin
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    await admin.save();

    // Generate a token for the admin
    adminToken = jwt.sign({ userId: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  // After all tests, clean up the database
  after(async () => {
    await User.deleteMany({});
  });

  // Test: Admin should register a new driver successfully
  it('should register a new driver', (done) => {
    chai.request(server)
      .post('/api/admin/register-driver')
      .set('Authorization', `Bearer ${adminToken}`)  // Set the admin token in the request header
      .send({
        name: 'John Driver',
        email: 'driver@example.com',
        password: 'driver123',
        address: {
          street: 'Vihara Road',
          city: 'Colombo',
          postalCode: '12345'
        },
        role: 'driver'  // Register as a driver
      })
      .end((err, res) => {
        expect(res).to.have.status(201);  // Expect a 201 status (created)
        expect(res.body).to.be.an('object');  // Expect response to be an object
        expect(res.body.driver).to.have.property('name', 'John Driver');  // Check the driver name
        expect(res.body.driver).to.have.property('email', 'driver@example.com');  // Check the driver email
        done();
      });
  });

  // Test: Should not register a driver with missing fields
  it('should not register a driver with missing email', (done) => {
    chai.request(server)
      .post('/api/admin/register-driver')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Driver Missing Email',
        email: '',  // Missing email
        password: 'driver123',
        address: {
          street: 'Waliwita Road',
          city: 'Colombo',
          postalCode: '12345'
        },
        role: 'driver'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);  // Expect a 400 status for bad request
        expect(res.body).to.have.property('message');  // Expect an error message
        done();
      });
  });
});
