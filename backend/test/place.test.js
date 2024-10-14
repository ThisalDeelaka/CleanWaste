import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after } from 'mocha';
import mongoose from 'mongoose';
import server from '../server.js';  // Ensure this points to your server file
import Place from '../models/Place.js';  // Import the Place model
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  // Load the .env.test file

chai.use(chaiHttp);
const { expect } = chai;

describe('Place Management API', () => {

  let adminToken;

  // Before running the tests, create an admin and get a token
  before(async () => {
    await Place.deleteMany({});

    const admin = {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    };

    adminToken = jwt.sign({ userId: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  // Test: Admin should add a new place
  it('should add a new place', (done) => {
    chai.request(server)
      .post('/api/places/addPlace')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        streetName: 'Vihara Road',
        binCount: 3
      })
      .end((err, res) => {
        expect(res).to.have.status(201);  // Expect a 201 status (created)
        done();
      });
  });

  // Test: Admin should report bin overflow
  it('should report bin overflow', (done) => {
    chai.request(server)
      .post('/api/places/overflow/123')  // Use a valid placeId
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);  // Expect success
        done();
      });
  });

  // Test: Admin should mark place as collected
  it('should mark place as collected', (done) => {
    chai.request(server)
      .post('/api/places/collect/123')  // Use a valid placeId
      .set('Authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);  // Expect success
        done();
      });
  });
});
