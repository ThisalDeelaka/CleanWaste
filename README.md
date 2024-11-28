# ClearWaste - Smart Waste Management System for Urban Areas

**ClearWaste** is a smart waste management system designed to optimize waste pickup schedules, improve waste sorting, and integrate recycling processes in urban areas. By leveraging automated scheduling, optimized routes for drivers, and real-time monitoring, ClearWaste aims to reduce environmental impact, enhance operational efficiency, and improve user experience. The system is built using the **MERN Stack** (MongoDB, Express, React, Node.js), incorporating advanced patterns such as **MVC**, **Service Layer**, and **Singleton** for efficient architecture.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
  - [Smart Waste Pickup Scheduling & Routing](#smart-waste-pickup-scheduling--routing)
  - [Driver Management System](#driver-management-system)
  - [Admin Waste Management Dashboard & Recycling Integration](#admin-waste-management-dashboard--recycling-integration)
- [Technologies Used](#technologies-used)
- [Development Architecture](#development-architecture)
- [Testing](#testing)
- [Deployment](#deployment)
- [Installation](#installation)


## Project Overview

**ClearWaste** revolutionizes waste management in urban areas with an intelligent platform that automates waste pickup scheduling, optimizes waste collection routes, and integrates recycling solutions. By providing an intuitive user experience, clear waste sorting guidelines, and an efficient system for tracking pickups, ClearWaste enhances waste management at every level—from users to drivers to administrators.

## Features

### Smart Waste Pickup Scheduling & Routing
- **What it Does**: The system automatically schedules waste pickups based on users' addresses. If users miss their regular pickup, they can view the nearest available truck route for the same day, allowing them to drop off waste along that route. Each pickup is tracked using a unique **Collection ID**, and users receive sorting guides to properly separate their waste.
- **Key Features**:
  - **Personalized Dashboard**: Users have access to a personal dashboard where they can view their pickup history, track reward points, and manage subscriptions.
  - **Business Support**: Businesses can also schedule their own waste pickups through the system, streamlining the process for commercial waste management.
  - **Waste Sorting Guide**: The system provides a sorting guide to help users separate their waste into categories (e.g., recyclables, organic, non-recyclables).

### Driver Management System
- **What it Does**: Drivers have a dedicated portal where they can view assigned routes, confirm pickups by entering the **Collection ID**, and report any issues such as missed pickups or incorrectly sorted waste.
- **Key Features**:
  - **Collection Confirmation**: Drivers can input Collection IDs to confirm the successful pickup of waste.
  - **Real-Time Reporting**: Drivers can report any issues directly through the portal, allowing the system to take corrective action (e.g., missed pickups, improper waste sorting).
  - **Route Tracking**: Drivers can monitor their progress and confirm completed pickups.

### Admin Waste Management Dashboard & Recycling Integration
- **What it Does**: The admin dashboard allows the management team to monitor and optimize the entire system. This includes managing driver routes, preventing bins from overflowing, and generating reports on system performance. It also integrates with local recycling centers to ensure that waste is properly sorted and recycled.
- **Key Features**:
  - **Recycling Integration**: Integration with local recycling centers ensures that waste is properly sorted and processed, improving recycling rates and minimizing landfill waste.
  - **Overflow Prevention**: The system alerts admins when bins are close to overflowing, enabling proactive waste collection management.
  - **Performance Reports**: Generate detailed reports on waste collection efficiency, recycling rates, and operational costs.

## Technologies Used

- **Frontend**: React.js with **Context API** for state management and **Router** for route handling.
- **Backend**: Node.js with **Express.js** for API development.
- **Database**: MongoDB for storing user data, waste collection details, driver routes, and admin analytics.
- **Architecture**: 
  - **MVC (Model-View-Controller)** pattern for separating concerns and improving scalability.
  - **Service Layer** pattern for business logic, ensuring modularity and testability.
  - **Singleton** pattern for managing instances of critical system components (e.g., database connections).


## Development Architecture

The system is developed using the **MERN Stack** with an architecture designed for efficiency and scalability:

- **Model-View-Controller (MVC)**: Separates the data (Model), business logic (Controller), and user interface (View) to keep the codebase clean and modular.
- **Service Layer**: Encapsulates the core business logic and acts as an intermediary between the controller and data layer (e.g., for scheduling waste pickups).
- **Singleton**: Ensures that only one instance of the waste management service (e.g., waste collection scheduler) runs at any time.

## Testing

**Mocha** and **Chai** were used for testing the backend logic, ensuring that routes, collection schedules, and driver functionality work as expected.

- **Unit Testing**: Functions such as scheduling, data retrieval, and real-time reporting are tested for expected behavior.
- **Integration Testing**: The system’s components, including the database, WebSockets, and API endpoints, are tested to ensure seamless interaction.

## Deployment

The ClearWaste platform is deployed using cloud services and can be accessed via the following links:

- **User Portal**: [ClearWaste User Portal](https://clearwaste-frontend.onrender.com)
- **Admin Dashboard**: [ClearWaste Admin Dashboard](https://clearwaste-admin.onrender.com)

## Installation

To run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/clearwaste.git
cd clearwaste
```

### 2. Install Dependencies

#### Frontend (React)

```bash
cd frontend
npm install
```

#### Backend (Node.js with Express)

```bash
cd backend
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in both the frontend and backend directories, and configure the necessary environment variables. Example:
- `MONGO_URI` for the database connection.
- `SECRET_KEY` for JWT authentication.
- `API_URL` for backend API endpoints.

### 4. Run the Project

#### Frontend:

```bash
cd frontend
npm start
```

The frontend should now be accessible at [http://localhost:3000](http://localhost:3000).

#### Backend:

```bash
cd backend
npm start
```

The backend API will run at [http://localhost:5000](http://localhost:5000) (or another port specified in your `.env`).

## Usage

### For Users:

- **Register an Account**: Set up your profile to begin scheduling waste pickups and track rewards.
- **Schedule a Pickup**: Set your regular pickup schedule based on your location and preferences.
- **View Pickup History**: Monitor past pickups and reward points through your personal dashboard.
- **Access Sorting Guide**: Use the waste sorting guide to ensure your waste is properly categorized for recycling.

### For Drivers:

- **Manage Routes**: View your assigned pickup routes for the day.
- **Confirm Pickups**: Use Collection IDs to confirm each pickup.
- **Report Issues**: Report any issues, such as missed pickups or improper waste sorting, in real time.

### For Admins:

- **Manage Routes**: Adjust and optimize driver routes based on system performance.
- **Integrate Recycling**: Ensure that local recycling centers are fully integrated and that waste is being processed properly.

