const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

const mockToken = "Bearer yourMockedUserToken"; // Mock token for user

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Controller Tests", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
        address: {
          street: "Test Street",
          city: "Test City",
          postalCode: "12345",
        },
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user.email).toBe("test@example.com");
  });

  it("should log in an existing user", async () => {
    await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
        address: {
          street: "Test Street",
          city: "Test City",
          postalCode: "12345",
        },
      });

    const loginResponse = await request(app).post("/api/users/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
  });

  it("should get user profile", async () => {
    await request(app)
      .post("/api/users/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "user",
        address: {
          street: "Test Street",
          city: "Test City",
          postalCode: "12345",
        },
      });

    const profileResponse = await request(app)
      .get("/api/users/profile")
      .set("Authorization", mockToken);

    expect(profileResponse.statusCode).toBe(200);
    expect(profileResponse.body).toHaveProperty("_id");
    expect(profileResponse.body.email).toBe("test@example.com");
  });
});
