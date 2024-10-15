const request = require("supertest");
const app = require("../app"); // Make sure to export your Express app
const mongoose = require("mongoose");
const User = require("../models/User");

// Mock JWT token for protected routes (assuming the structure of your token)
const mockToken = "Bearer yourMockedTokenHere";

// Clear the database before running tests
beforeEach(async () => {
  await User.deleteMany({});
});

// Close mongoose connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Controller Tests", () => {
  // Test user registration
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

  // Test user login
  it("should log in an existing user", async () => {
    // First, register a user
    const user = await request(app)
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

  // Test user profile retrieval (authentication required)
  it("should get user profile", async () => {
    const response = await request(app)
      .get("/api/users/profile")
      .set("Authorization", mockToken);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("email");
  });

  // Test getting all drivers (admin-only access)
  it("should return all drivers if admin", async () => {
    const response = await request(app)
      .get("/api/users/drivers")
      .set("Authorization", mockToken); // Assuming token contains admin privileges

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
