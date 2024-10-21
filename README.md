# AdventurePoint

AdventurePoint is a full-stack web application that allows users to discover, share, and review adventure destinations.
It's built with Node.js, Express, MongoDB, and EJS, showcasing a robust backend architecture and a dynamic frontend.

  ## AdventurePoint WebApp

1. **Home page**:
   <img width="1440" alt="Screenshot 2024-10-21 at 7 40 10 AM" src="https://github.com/user-attachments/assets/0e06f9bd-61a8-4eef-bae3-055fa4f1389d">

2. **Adventure Places page**:
   <img width="1434" alt="Screenshot 2024-10-21 at 7 40 28 AM" src="https://github.com/user-attachments/assets/9a41eeda-be7c-4af9-964a-614af6dc1c9a">

3. **Opening Adventure Place**:
   <img width="1440" alt="Screenshot 2024-10-21 at 7 40 47 AM" src="https://github.com/user-attachments/assets/ddc39079-666a-45d8-9109-02f9d44d07d9">

4. **Editing adventure place**:
   <img width="1440" alt="Screenshot 2024-10-21 at 7 41 28 AM" src="https://github.com/user-attachments/assets/fa744101-c4c2-4b20-995e-04a5ea8d62be">
   <img width="1440" alt="Screenshot 2024-10-21 at 7 41 38 AM" src="https://github.com/user-attachments/assets/1790f1cb-50e2-4996-a3d9-754298c76464">

5. **Adding new AdventurePlace**:
   <img width="1440" alt="Screenshot 2024-10-21 at 7 39 03 AM" src="https://github.com/user-attachments/assets/b26a4a23-8ed2-4b2c-9c3d-c3d1a351dadc">

6. **Login and Register Page**:
   -Login
   <img width="1437" alt="Screenshot 2024-10-21 at 7 36 40 AM" src="https://github.com/user-attachments/assets/61ba59cd-d3ec-4eba-808b-f3c352c8cb53">
   -Register
   <img width="1436" alt="Screenshot 2024-10-21 at 7 37 19 AM" src="https://github.com/user-attachments/assets/d0af5bf9-8609-45be-9237-56a306d252bc">

## Project Purpose

The main goal of AdventurePoint is to create a platform where adventure enthusiasts can:
1. Share their favorite adventure spots
2. Discover new places to explore
3. Leave reviews and ratings for locations they've visited
4. Interact with a community of like-minded adventurers

This project demonstrates proficiency in full-stack web development, database management, user authentication, and cloud storage integration.

## Key Features

- User authentication & authorization (signup, login, logout)
- CRUD operations for adventure places
- Image upload and management using Cloudinary
- User reviews and ratings for adventure places
- Responsive design for various screen sizes
- Flash messages for user feedback
- Client side and Server-side data validation
- MongoDB database integration
- RESTful API design

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS (Embedded JavaScript templates), Bootstrap
- **Authentication**: Passport.js
- **Image Upload**: Cloudinary, Multer
- **Data Validation**: Joi
- **Other Libraries**: 
  - connect-flash for flash messages
  - method-override for HTTP verb support
  - express-session for session management

## Project Structure

The project follows a Model-View-Controller (MVC) architecture:

- `models/`: Database schemas (adventureplace.js, review.js, user.js)
- `views/`: EJS templates for rendering pages
- `controllers/`: Logic for handling requests (adventureplaces.js, reviews.js)
- `routes/`: Express routes for different resources
- `middleware/`: Custom middleware functions
- `public/`: Static assets (CSS, client-side JavaScript)
- `utils/`: Utility functions and error handlers
- `seeds/`: Seeding script for populating the database with initial data

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (MongoDB URI, Cloudinary credentials)
4. Run the seeding script: `node seeds/index.js`
5. Start the server: `node app.js`

## Future Enhancements

- Implement user profiles with adventure histories
- Add a map view for adventure places using a mapping API
- Introduce social features like following users and sharing adventures
- Implement a recommendation system based on user preferences and history

## Contributing

Contributions to AdventurePoint are welcome! Please feel free to submit a Pull Request.

