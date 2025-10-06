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

## Functionnality

### Home page

- **Presentation** - a short presentation of the application
- **Sign in / Login** - a form to sign in or login
- **Api documentation** - a link to the API documentation (generated with Jsdoc)

### Catways page

**Admin** - should be able to : - _Create a catways_ - _List all catways_ - _Get a chosen catways_ - _Update catways status_ - _Delete a catways / many catways_

### Reservations page

**Admin** - should be able to : - _Create a reservation_ - _List all reservations_ - _Get a chosen reservation_ - _Update a chosen reservation_ - _Delete a reservation / many reservations_

### Users page

- **Admin** - should be able to :

  - _Create a user_
  - _List all users_
  - _Get a chosen user_
  - _Update a chosen user_
  - _Delete a user/ many users_

- **User** - should be able to :
  - _Create an account_
  - _Update his account_
  - _Delete his account_

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

```
Guibert-Denis-CreationApi--RusselMarina/
├── bin/
│   └── www                 # Application startup script
├── node_modules/           # Dependencies (auto-generated)
├── public/                 # Static assets
│   ├── images/            # Image files
│   ├── javascripts/       # Client-side JavaScript
│   └── stylesheets/       # CSS files
│       └── style.css      # Main stylesheet
├── routes/                 # API route handlers
│   ├── index.js           # Home page routes
│   └── users.js           # User management routes
├── views/                  # Server-side templates
│   ├── error.ejs          # Error page template
│   ├── index.ejs          # Home page template
│   └── layout.ejs         # Base layout template
├── app.js                  # Main application file
├── package.json           # Project configuration and dependencies
├── package-lock.json      # Dependency lock file
└── README.md              # Project documentation
```

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

### Phase 1: Project Initialization

**1. Install Express Generator globally**

```bash
npm install -g express-generator
```

**2. Navigate to your project directory**

```bash
cd "C:\Users\guibe\Desktop\Formation_DevWeb_CEF\Devoir\Guibert-Denis-CreationApi--RusselMarina"
```

**3. Generate Express structure in current directory**

```bash
express --view=ejs .
```

### Phase 2: Core Dependencies

**4. Install Express (main framework)**

```bash
npm install express
```

**5. Install Mongoose (MongoDB integration)**

```bash
npm install mongoose
```

**6. Install CORS (cross-origin requests)**

```bash
npm install cors
```

### Phase 3: Authentication & Security

**7. Install bcrypt (password encryption)**

```bash
npm install bcrypt
```

**8. Install JWT (authentication tokens)**

```bash
npm install jsonwebtoken
```

**9. Install Express Session (session management)**

```bash
npm install express-session
```

### Phase 4: Development Tools

**10. Install Nodemon (auto-restart development server)**

```bash
npm install --save-dev nodemon
```

**11. Install env-cmd (environment variable management)**

```bash
npm install --save-dev env-cmd
```

**12. Install JSDoc (API documentation)**

```bash
npm install --save-dev jsdoc
```

### Phase 5: Template Engine

**13. Install EJS (template engine)**

```bash
npm install ejs
```

### Environment Configuration

Create environment files in the root directory:

**.env.development**

```bash
# Database Configuration
MONGODB_URI=

# JWT Configuration
JWT_SECRET=
JWT_EXPIRES_IN=

# Server Configuration
PORT=
NODE_ENV=

# CORS Configuration
CORS_ORIGIN=
```

**.env.production**

```bash
# Database Configuration
MONGODB_URI=

# JWT Configuration
JWT_SECRET=
JWT_EXPIRES_IN=

# Server Configuration
PORT=
NODE_ENV=

# CORS Configuration
CORS_ORIGIN=
```

### 4. Database Setup

**For Local MongoDB:**

```bash
# Start MongoDB service (if not already running)
# On Windows:
net start MongoDB
# On macOS:
brew services start mongodb-community
# On Linux:
sudo systemctl start mongod
```

### 5. Verify Installation

```bash
# Verify that all dependencies are installed
npm list --depth=0

# Check if the application starts without errors
npm start
```

### 6. Configure Package.json Scripts

Add the following scripts to your `package.json`:

```json
"scripts": {
  "start": "node ./bin/www",
  "dev": "env-cmd -f .env.development nodemon ./bin/www",
  "prod": "env-cmd -f .env.production node ./bin/www",
  "docs": "jsdoc -c jsdoc.conf.json"
}
```

### 7. Launch the Application

```bash
# Start the server in development mode (with env-cmd and nodemon)
npm run dev

# Start the server in production mode (with env-cmd)
npm run prod

# Start the server in production mode (standard)
npm start
```

### 8. Access the Application

- **Local URL**: `http://localhost:3000` (or the port specified in your `.env` file)
- **API Documentation**: `http://localhost:3000/api-docs` (if Swagger/OpenAPI is configured)

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
- `GET /logout` - User logout

### Users (Admin Only)

- `GET /users` - Get all users
- `GET /users/:email` - Get user by Email
- `POST /users/` - Create a user
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
- `GET /catways/:id/reservations/:id` - Get reservation by ID
- `POST /catways/:id/reservations` - Create new reservation
- `PUT /catways/:id/reservations/:id` - Update reservation
- `DELETE /catways/:id/reservations/:id` - Cancel reservation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

\*\*Free License
