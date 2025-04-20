# Personal Investment Planner

A full-stack web application that helps users create and manage personalized investment plans. The application uses AI-powered recommendations to suggest optimal investment allocations across SIPs, cryptocurrency, and gold based on the user's risk profile and monthly income.

## Features

- **User Authentication**: Secure registration and login system
- **Personalized Investment Plans**: Create plans tailored to your income and risk tolerance
- **Portfolio Diversification**: Balance investments across SIPs, cryptocurrency, and gold
- **Plan Management**: View, update, and delete investment plans
- **Plan Sharing**: Share your investment plans with others
- **PDF Export**: Download your investment plans as PDF documents

## Tech Stack

### Frontend

- React.js with Vite
- Material-UI for components
- React Router for navigation
- Axios for API requests
- Chart.js for data visualization

### Backend

- Node.js with Express
- MongoDB for database
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
personal-investment/
├── frontend-vite/           # Frontend React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts (Auth, etc.)
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Entry point
│   ├── .env                 # Environment variables
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Backend Node.js application
│   ├── config/              # Configuration files
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Express middleware
│   ├── .env                 # Environment variables
│   └── server.js            # Entry point
│
└── README.md                # Project documentation
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend-vite
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## API Documentation

### Authentication

#### Register User

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: User object with JWT token

#### Login User

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: User object with JWT token

### Investment Plans

#### Create Investment Plan

- **URL**: `/api/investment/create`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "planName": "My Investment Plan",
    "monthlyIncome": 50000,
    "riskLevel": "Medium"
  }
  ```
- **Response**: Created investment plan object

#### Get User's Investment Plans

- **URL**: `/api/investment/plans`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of investment plan objects

#### Get Investment Plan by ID

- **URL**: `/api/investment/plans/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Investment plan object

#### Delete Investment Plan

- **URL**: `/api/investment/plans/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message

## Usage

1. Register a new account or log in with existing credentials
2. Create a new investment plan by providing your monthly income and risk level
3. View your investment plans on the dashboard
4. Click on a plan to view detailed allocation and recommendations
5. Share your plan with others or download it as a PDF

## Deployment

### Backend Deployment

1. Set up a MongoDB database (local or Atlas)
2. Deploy the backend to a hosting service (Heroku, AWS, etc.)
3. Set the environment variables on the hosting platform

### Frontend Deployment

1. Build the frontend application:
   ```
   npm run build
   ```
2. Deploy the built files to a static hosting service (Netlify, Vercel, etc.)
3. Set the environment variables on the hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- Chart.js for the data visualization
- MongoDB for the database
- Express.js for the backend framework
