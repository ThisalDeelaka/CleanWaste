import * as chai from 'chai';  // Import everything from chai as a named import
import chaiHttp from 'chai-http';
import { describe, it, before, after } from 'mocha';
import mongoose from 'mongoose';
import server from '../server.js';  // Ensure this points to your server file
import User from '../models/User.js';  // Import the User model

const { expect } = chai;

process.env.NODE_ENV = 'test';
import dotenv from 'dotenv';
dotenv.config();  // Load the .env.test file

chai.use(chaiHttp);

describe('User Registration API', () => {
  
  // Before all tests, ensure the database is clean
  before(async () => {
    await User.deleteMany({}); // Clear the User collection
  });

  // After all tests, drop the database (optional)
  after(async () => {
    await User.deleteMany({});
  });

  // Test: Should register a new user successfully
  it('should register a new user', (done) => {
    chai.request(server)
      .post('/users/register')  // The registration endpoint
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        address: {
          street: 'Vihara Road',
          city: 'Colombo',
          postalCode: '12345'
        },
        role: 'user'  // Register as a normal user
      })
      .end((err, res) => {
        expect(res).to.have.status(201);  // Expect a 201 status (created)
        expect(res.body).to.be.an('object');  // Expect response to be an object
        expect(res.body.user).to.have.property('name', 'John Doe');  // Check the user name
        expect(res.body.user).to.have.property('email', 'john@example.com');  // Check the user email
        done();  // Done callback to signal the end of the test
      });
  });

  // Test: Should not register a user with missing fields
  it('should not register a user with missing email', (done) => {
    chai.request(server)
      .post('/users/register')
      .send({
        name: 'Jane Doe',
        email: '',  // Missing email
        password: 'password123',
        address: {
          street: 'Waliwita Road',
          city: 'Colombo',
          postalCode: '12345'
        },
        role: 'user'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);  // Expect a 400 status for bad request
        expect(res.body).to.have.property('message');  // Expect an error message
        done();
      });
  });

  // Test: Should not register a user with duplicate email
  it('should not register a user with duplicate email', (done) => {
    chai.request(server)
      .post('/users/register')
      .send({
        name: 'Duplicate User',
        email: 'john@example.com',  // Duplicate email from the previous test
        password: 'password123',
        address: {
          street: 'E.A. Jayasinghe Road',
          city: 'Colombo',
          postalCode: '12345'
        },
        role: 'user'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);  // Expect a 400 status for duplicate error
        expect(res.body).to.have.property('message').that.includes('duplicate key error');  // Error for duplicate
        done();
      });
  });
});
