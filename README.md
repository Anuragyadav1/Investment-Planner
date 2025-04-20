# Personal Investment Planner

A full-stack application for creating personalized investment plans using AI-powered suggestions.

## Features

- User Authentication (JWT)
- Investment Planning with AI Integration
- Visual Investment Distribution Charts
- Downloadable PDF Plans
- Dark Mode Support
- Multiple Plan Management
- Shareable Plan Links

## Tech Stack

### Frontend

- React.js
- Context API
- Chart.js
- jsPDF + html2canvas
- Material-UI

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Google Gemini AI API

## Project Structure

```
personal-investment/
├── frontend/           # React frontend application
├── backend/           # Node.js backend server
└── README.md         # Project documentation
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create .env file with required environment variables
4. Start server: `npm run dev`

### Frontend Setup

1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create .env file with required environment variables
4. Start development server: `npm start`

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
```
