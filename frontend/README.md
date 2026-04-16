# Feature Request Tracker

A feature request management application built with modern technologies.

## Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL with Drizzle ORM

## Setup Instructions

### Frontend Setup

```bash
# Clone the frontend
git clone https://github.com/malew/feature-request-traker.git
cd feature-request-traker/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Clone the backend  
git clone https://github.com/malew/feature-request-traker.git
cd feature-request-traker/backend

# Install dependencies
npm install

# Run database migrations
npx drizzle-kit push

# Start development server
npm run dev
```

## Features

- CRUD operations for feature requests
- Filter by status and date range
- Priority badges (Low/Medium/High)
- Status dropdown for quick updates
- Loading and error states
- Confirmation dialog for deletions
- Responsive design
- Landing page with parallax effects

## API Endpoints

- `GET /api/features` - List all features
- `POST /api/features` - Create a new feature
- `PUT /api/features/:id` - Update a feature
- `PATCH /api/features/:id/status` - Update feature status
- `DELETE /api/features/:id` - Delete a feature
