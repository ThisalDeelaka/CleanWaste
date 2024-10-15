const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const mockToken = "Bearer yourMockedDriverToken"; // Mock token for driver

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Driver Controller Tests", () => {
  it("should get assigned pickups for a driver", async () => {
    const response = await request(app)
      .get("/api/drivers/assigned-pickups")
      .set("Authorization", mockToken);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return waste requests by assigned street", async () => {
    const response = await request(app)
      .get("/api/drivers/pickup-requests")
      .set("Authorization", mockToken)
      .query({ street: "Valid Street" }); // Ensure "Valid Street" is in your DB

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should assign a pickup task to a driver", async () => {
    const response = await request(app)
      .post("/api/drivers/assign-pickup")
      .set("Authorization", mockToken)
      .send({
        driverId: "driverId123", // Ensure this ID exists in your DB
        street: "Valid Street",
        pickupDate: "2024-10-20",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe(
      "Pickup task assigned successfully, notifications sent."
    );
  });

  it("should complete a task for a driver", async () => {
    const response = await request(app)
      .post("/api/drivers/complete-task")
      .set("Authorization", mockToken)
      .send({
        street: "Valid Street",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Task marked as completed.");
  });
});
