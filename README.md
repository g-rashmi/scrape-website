# Scrape Website
## Local Setup Instructions

### Prerequisites
- Node.js (version >= 10.0.0)
- MongoDB installed and running

### Step-by-Step Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/g-rashmi/scrape-website.git
   cd scrape-website
   ```

2. **Install Dependencies**

   - Install backend dependencies:

     ```bash
     cd backend
     npm install
     ```

   - Install frontend dependencies:

     ```bash
     cd ../frontend
     npm install
     ```

3. **Configure MongoDB URL**

   - Navigate to the backend directory and locate `config.js` file.

     ```bash
     cd ../backend
     ```

   - Open `config.js` file in a text editor and replace `<your_mongo_url>` with your MongoDB connection URL.

     ```javascript
     module.exports = {
       mongoURI: '<your_mongo_url>'
     };
     ```

4. **Configure Backend URL in Frontend**

   - Navigate to the `config.js` file inside the frontend/src/components directory.

     ```bash
     cd ../frontend/src/components
     ```

   - Open `config.js` file in a text editor and ensure the `backend_url` is set to `http://localhost:4000`.

     ```javascript
     export const backend_url = 'http://localhost:4000';
     ```

5. **Start Development Servers**

   - Start the backend server (from the backend directory):

     ```bash
     npm run start
     ```

     This will start the backend server at `http://localhost:4000`.

   - Start the frontend server (from the frontend directory):

     ```bash
     npm run start
     ```

     This will start the frontend server and automatically open the application in your default web browser at `http://localhost:5173`.

6. **Stopping the Servers**

   - To stop the servers, you can press `Ctrl + C` in the terminal where they are running.

### Additional Notes

- Ensure MongoDB is running and accessible with the provided connection URL in `config.js`.
- If you encounter any issues, please check the console logs for error messages and ensure all dependencies are correctly installed.

