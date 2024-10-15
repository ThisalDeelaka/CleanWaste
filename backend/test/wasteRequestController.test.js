const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const mockToken = "Bearer yourMockedAdminToken"; // Mock token for admin

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Waste Request Controller Tests", () => {
  it("should create a waste request", async () => {
    const response = await request(app)
      .post("/api/waste-requests/create")
      .set("Authorization", mockToken)
      .send({
        wasteType: "Plastic",
        location: { latitude: "7.8731", longitude: "80.7718" },
        userId: "userId123", // Ensure this user ID exists in your DB
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("wasteCode");
  });

  it("should assign a driver to a waste request", async () => {
    const response = await request(app)
      .post("/api/waste-requests/assign-driver")
      .set("Authorization", mockToken)
      .send({
        requestId: "requestId123", // Ensure this request ID exists in your DB
        driverId: "driverId123", // Ensure this driver ID exists in your DB
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should get all waste requests", async () => {
    const response = await request(app)
      .get("/api/waste-requests/all-waste-requests")
      .set("Authorization", mockToken);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should mark waste as picked up", async () => {
    const response = await request(app)
      .post("/api/waste-requests/mark-picked-up")
      .set("Authorization", mockToken)
      .send({
        requestId: "requestId123", // Ensure this request ID exists in your DB
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should get user waste requests", async () => {
    const response = await request(app).get(
      "/api/waste-requests/user/userId123"
    ); // Ensure this user ID exists in your DB

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
