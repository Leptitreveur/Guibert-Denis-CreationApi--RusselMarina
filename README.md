# Russel's Marina Reservation API

## Description

This project is a comprehensive marina management system that allows users to manage and view catway reservations at Russel's Marina. The application provides a complete CRUD (Create, Read, Update, Delete) API with role-based access control for different user types (admin/user). The system implements secure authentication using JWT tokens and password encryption with bcrypt to ensure data security and user privacy.

## Features

### User Management

- **Authentication System**: Secure login/signup with JWT tokens
- **Role-based Access Control**: Different permissions for admin and regular users
- **User Profile Management**: Users can create, update, and delete their accounts

### Catway Management

- **CRUD Operations**: Complete management of marina catways
- **Status Tracking**: Real-time status updates for catway availability
- **Bulk Operations**: Support for managing multiple catways simultaneously

### Reservation System

- **Reservation Management**: Create, view, update, and cancel reservations
- **Availability Checking**: Real-time availability status
- **Reservation History**: Track past and current reservations

## Functionality

### Home page

- **Presentation** - a short presentation of the application
- **Sign in / Login** - a form to sign in or login
- **API documentation** - a link to the API documentation (generated with JSDoc)

### Catways page

**Admin** - should be able to : 
  - _Create a catway_ 
  - _List all catways_ 
  - _Get a chosen catway_ 
  - _Update catways status_ 
  - _Delete a catway_

### Reservations page

**Admin** - should be able to : 
  - _Create a reservation_ 
  - _List all reservations_ 
  - _Get a chosen reservation_ 
  - _Update a chosen reservation_ 
  - _Delete a reservation_

### Users page

- **Admin** - should be able to :

  - _Create a user_
  - _List all users_
  - _Get a chosen user_
  - _Update a chosen user_
  - _Delete a user/ many users_

- **User** - should be able to :
  - _Create an account_
  - _Update their account_
  - _Delete their account_

### Dashboard page

- **Navigation** - navigate to the previous page
- **Connection** - Sign in to the user account
- **Disconnect** - Disconnect from the user account
- **API documentation** - link to the API documentation
- **Users info** - fullname and email of the connected user
- **Current Date and time** - display current date and time
- **Reservation array** - array with all the current reservations

### Optional pages

## Technologies Used

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT (JSON Web Tokens)** - Authentication and authorization
- **bcrypt** - Password hashing and encryption
- **CORS** - Cross-Origin Resource Sharing
- **Express Session** - Session management

### Frontend

- **EJS** - Template engine for server-side rendering
- **CSS3** - Styling and layout
- **JavaScript (ES6+)** - Client-side functionality

### Development Tools

- **Nodemon** - Development server with auto-restart
- **Express Generator** - Application generator for Express.js
- **env-cmd** - Environment variable management for different environments

## Project Structure

Guibert-Denis-CreationApi--RusselMarina/
├── bin/
│ └── www # Application startup script
├── certificates/ # SSL/TLS certificates for HTTPS
│ └── Readme.md # Certificate setup instructions
├── data/ # Validation data and configuration
│ └── inputsValidationData.js
├── db/ # Database connection
│ └── mongo.js # MongoDB connection setup
├── env/ # Environment variables (not in git)
├── middlewares/ # Express middlewares
│ ├── dateValidation.js
│ ├── inputsValidation.js
│ ├── paramsValidation.js
│ ├── private.js
│ └── validateAccess.js
├── models/ # Mongoose schemas and models
│ ├── blackListedToken.js
│ ├── catways.js
│ ├── reservation.js
│ └── users.js
├── node_modules/ # Dependencies (auto-generated)
├── public/ # Static assets
│ └── stylesheets/ # CSS files
│ └── style.css # Main stylesheet
├── routes/ # API route handlers
│ ├── index.js # Home page routes
│ ├── users.js # User management routes
│ ├── catways.js # Catway management routes
│ ├── reservations.js # Reservation management routes
│ ├── login.js # Authentication routes
│ ├── logout.js # Logout routes
│ └── dashboard.js # Dashboard routes
├── services/ # Business logic layer
│ ├── authentification.js
│ ├── users.js
│ ├── catways.js
│ ├── reservation.js
│ ├── logout.js
│ └── dashboard.js
├── utils/ # Utility functions
│ ├── asyncHandler.js
│ ├── dateCalculator.js
│ ├── dateFormatter.js
│ ├── periodValidator.js
│ └── serverShutdown.js
├── views/ # Server-side templates
│ ├── error.ejs # Error page template
│ └── index.ejs # Home page template
├── app.js # Main application file
├── jsconfig.json # JavaScript configuration
├── package.json # Project configuration and dependencies
├── package-lock.json # Dependency lock file
└── README.md # Project documentation


## Setup and Launch

Before you start, make sure the following tools are installed and up to date:

### Prerequisites

#### Node.js

- **Required version**: Node.js 18.0.0 or above
- **Verification**: `node -v`
- **Download**: [nodejs.org](https://nodejs.org/)

#### Package Manager

- **npm** (included with Node.js): `npm -v`
- **yarn** (optional): `npm install -g yarn` then `yarn -v`
- **pnpm** (optional): `npm install -g pnpm` then `pnpm -v`

#### MongoDB

- **MongoDB Community Server**: Required for database storage

#### Git

- **Verification**: `git --version`
- **Download**: [git-scm.com](https://git-scm.com/)

## Installation Process

### Phase 1: Clone the Repository

**Option A : Clonage HTTPS (recommandé)**

git clone https://github.com/Leptitreveur/Guibert-Denis-CreationApi--RusselMarina.git
cd Guibert-Denis-CreationApi--RusselMarina

**Option B : Clonage SSH (si configuré)**

git clone git@github.com:Leptitreveur/Guibert-Denis-CreationApi--RusselMarina.git
cd Guibert-Denis-CreationApi--RusselMarina

**Option C : GitHub CLI**

gh repo clone Leptitreveur/Guibert-Denis-CreationApi--RusselMarina
cd Guibert-Denis-CreationApi--RusselMarina

### Phase 2: Install Dependencies

**Avec npm (recommandé)**

npm install

**Avec yarn**

yarn install

**Avec pnpm**

pnpm install

### Phase 3: Environment Configuration

Create environment files in the root directory. **Important**: These files contain sensitive information and should never be committed to version control.
Create two files:

- **`.env.development`** - For development environment
- **`.env.production`** - For production environment

Each file should contain the following variables (replace the placeholder values with your actual configuration):
# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=your_expiration_time

# Server Configuration
PORT=your_port_number
NODE_ENV=development # or 'production' for production file

# CORS Configuration
CORS_ORIGIN=your_cors_origin

**Security Note**: 
- Never commit `.env` files to Git
- Use strong, unique values for `JWT_SECRET` and `MONGODB_URI`
- Keep your environment files secure and private

### Phase 4: SSL/TLS Certificates Setup

For HTTPS to work, you need to generate SSL/TLS certificates. See `certificates/Readme.md` for detailed instructions.

**Quick setup (with OpenSSL):**

cd certificates
openssl req -x509 -newkey rsa:4096 -nodes -keyout private-key.pem -out certificate.pem -days 365

### Phase 5: Database Setup

**For Local MongoDB:**

# Start MongoDB service (if not already running)

# On Windows:
net start MongoDB

# On macOS:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

### Phase 6: Verify Installation

# Verify that all dependencies are installed
npm list --depth=0

# Check if the application starts without errors
npm start

### Phase 7: Launch the Application

# Start the server in development mode (with env-cmd and nodemon)
npm run dev

# Start the server in production mode (with env-cmd)
npm run prod

# Start the server in production mode (standard)
npm start

### Phase 8: Access the Application

- **Local URL**: `https://localhost:3000` (or the port specified in your `.env` file)
- **API Documentation**: `https://localhost:3000/api-docs` (if Swagger/OpenAPI is configured)

## Available Scripts

| Command            | Description                                                      | Usage                    |
| ------------------ | ---------------------------------------------------------------- | ------------------------ |
| `npm start`        | Start the server in production mode                              | Production deployment    |
| `npm run dev`      | Start the server in development mode with hot reload and env-cmd | Daily development        |
| `npm run prod`     | Start the server in production mode with env-cmd                 | Production with env vars |
| `npm run docs`     | Generate API documentation with JSDoc                            | Documentation generation |
| `npm test`         | Run test suite                                                   | Quality assurance        |
| `npm run lint`     | Check code with ESLint                                           | Code quality             |
| `npm run lint:fix` | Automatically fix ESLint errors                                  | Code cleanup             |

## API Endpoints

### Authentication

- `POST /login` - User login
- `POST /logout` - User logout

### Users (Admin Only)

- `GET /users` - Get all users
- `GET /users/:email` - Get user by Email
- `POST /users` - Create a user
- `PUT /users/:email` - Update user
- `DELETE /users/:email` - Delete user

### Catways

- `GET /catways` - Get all catways
- `GET /catways/:id` - Get catway by ID
- `POST /catways` - Create new catway (Admin)
- `PUT /catways/:id` - Update catway (Admin)
- `DELETE /catways/:id` - Delete catway (Admin)

### Reservations

- `GET /catways/:id/reservations` - Get all reservations
- `GET /catways/:id/reservations/:idReservation` - Get reservation by ID
- `POST /catways/:id/reservations` - Create new reservation
- `PUT /catways/:id/reservations/:idReservation` - Update reservation
- `DELETE /catways/:id/reservations/:idReservation` - Cancel reservation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

**Free License**