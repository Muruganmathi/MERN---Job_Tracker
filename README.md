🧑‍💻 Job Application Tracker – MERN Stack

A simple full-stack web application built using MongoDB, Express, React, and Node.js (MERN) that allows users to add, view, update, and delete job applications.

🚀 How to Run Locally
1️⃣ Clone the repository
2️⃣ Install dependencies

Backend:

cd backend
npm install


Frontend:

cd ../frontend
npm install

3️⃣ Create the .env file

Create a file named .env inside your backend/routes/ folder (as per your setup):

MONGO_URI="mongodb://localhost:27017/job-tracker-db"
PORT=4000

4️⃣ Start the Backend Server
cd backend
npm start

5️⃣ Start the Frontend (React App)
cd ../frontend
npm start

🔗 API Endpoints (Backend Overview)
Method	Endpoint	Description
POST	/api/jobs	Add a new job application
GET	/api/jobs	Get all job applications
GET	/api/jobs/:id	Get a single job application by ID
PUT	/api/jobs/:id	Update a job application
DELETE	/api/jobs/:id	Delete a job application

🧩 Project Features

Add Job – Create a new job record (Company, Job Title, Date, Status).

View Jobs – Display all jobs in a table or list format.

View Details – Open details for a single job.

Edit Job – Update existing job information.

Delete Job – Remove a job with confirmation prompt.

Form Validation – Validates required fields and date input on frontend and backend.

Responsive UI – Clean and simple layout, works on all devices.
