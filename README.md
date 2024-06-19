

# Scrape
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
     npm run dev
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

4. **Start Development Servers**

   - Start the backend server (from the backend directory):

     ```terminal
     npm run start
     ```

     This will concurrently start both the backend server (using nodemon) and the frontend server (using React scripts).

5. **Access the Application**

   - Once both servers are running, you can access the application in your web browser at:

     ```
     http://localhost:5173
     ```

   - The backend server will be running at:

     ```
     http://localhost:4000
     ```

6. **Stopping the Servers**

   - To stop the servers, you can press `Ctrl + C` in the terminal where they are running.

### Additional Notes

- Ensure MongoDB is running and accessible with the provided connection URL in `config.js`.
- If you encounter any issues, please check the console logs for error messages and ensure all dependencies are correctly installed.

---

