const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Place = require("../models/Place");

const mockToken = "Bearer yourMockedAdminToken"; // Mock token for admin

beforeEach(async () => {
  await Place.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Place Controller Tests", () => {
  it("should add a new place", async () => {
    const response = await request(app)
      .post("/api/addPlace")
      .set("Authorization", mockToken)
      .send({
        streetName: "Valid Street", // Ensure this is a valid value according to your model
        binCount: 10,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });

  it("should return all places", async () => {
    const response = await request(app).get("/api/places");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should mark a place as collected", async () => {
    const newPlace = await Place.create({
      streetName: "Collect Street",
      binCount: 5,
    });
    const response = await request(app)
      .post(`/api/collect/${newPlace._id}`)
      .set("Authorization", mockToken);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("binCount");
  });

  it("should report a bin overflow", async () => {
    const newPlace = await Place.create({
      streetName: "Overflow Street",
      binCount: 5,
    });
    const response = await request(app)
      .post(`/api/overflow/${newPlace._id}`)
      .set("Authorization", mockToken);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("binCount");
  });
});
