const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Driver = require("../models/Driver");

const mockToken = "Bearer yourMockedAdminToken"; // Mock token for admin

beforeEach(async () => {
  await Driver.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Admin Controller Tests", () => {
  it("should register a new driver", async () => {
    const response = await request(app)
      .post("/api/admin/register-driver")
      .set("Authorization", mockToken)
      .send({
        name: "Driver Test",
        email: "driver@example.com",
        password: "password123",
        address: {
          street: "Driver Street",
          city: "Driver City",
          postalCode: "98765",
        },
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.driver).toHaveProperty("_id");
    expect(response.body.driver.email).toBe("driver@example.com");
  });

  it("should fail if required fields are missing", async () => {
    const response = await request(app)
      .post("/api/admin/register-driver")
      .set("Authorization", mockToken)
      .send({
        name: "Incomplete Driver",
        email: "driver@example.com",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});
