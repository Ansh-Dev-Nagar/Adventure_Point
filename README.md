# AdventurePoint

AdventurePoint is a full-stack web application that allows users to discover, share, and review adventure destinations.
It's built with Node.js, Express, MongoDB, and EJS, showcasing a robust backend architecture and a dynamic frontend.

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

## Key Functionalities

1. **User Management**:
   - User registration and authentication
   - Profile management

2. **Adventure Places**:
   - Create, read, update, and delete adventure places
   - Image upload for adventure places
   - Geocoding of locations (planned feature)

3. **Reviews and Ratings**:
   - Users can leave reviews and ratings for adventure places
   - Average ratings displayed for each place

4. **Search and Filter** (planned feature):
   - Search for adventure places by name, location, or activity type
   - Filter results based on various criteria

5. **Responsive Design**:
   - Mobile-friendly interface using Bootstrap


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

