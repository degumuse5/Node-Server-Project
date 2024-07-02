# Node-Server-Project-
Project Description: Academic Application Management System

Overview:

The Academic Application Management System is a web-based platform designed to streamline the application process for academic programs. This system allows applicants to submit their information, review their submissions, and enables administrators to filter applications based on GPA and manage the application data effectively. The application leverages Node.js, Express.js, MongoDB, and EJS templating to provide a robust and user-friendly experience.

Key Features:

    Application Submission:
        Users can submit their applications through a user-friendly form.
        Application data includes name, email, GPA, and a personal statement.
        Data is securely stored in a MongoDB database.

    Application Review:
        Users can review their submitted applications by entering their email address.
        The system retrieves and displays the application details if found.

    GPA-Based Filtering:
        Administrators can filter applications based on GPA.
        The system displays a table of applicants with GPA greater than or equal to the specified value.

    Bulk Deletion:
        Administrators can delete all applications from the database to reset the system.

Technical Stack:

    Node.js: Server-side JavaScript runtime.
    Express.js: Web framework for Node.js.
    MongoDB: NoSQL database for storing application data.
    EJS (Embedded JavaScript): Templating engine for rendering HTML pages.
    Body-parser: Middleware for parsing request bodies.
    dotenv: Module to load environment variables from a .env file.

Project Structure:

    server.js: Main server file initializing the Express app, setting up routes, and handling server startup.
    database.js: Database operations including insertion, retrieval, filtering, and deletion of application data.
    templates: Directory containing EJS template files for rendering different views.
    .env: Environment file containing sensitive configuration details like database connection strings.

Routes and Endpoints:

    GET /: Renders the welcome page.

    GET /apply: Renders the application submission form.

    GET /review: Renders the application review form.

    GET /gpaList: Renders the GPA filtering form.

    GET /removeApp: Renders the bulk deletion confirmation page.

    POST /apply: Handles application submission and inserts data into the database.

    POST /review: Handles application review by email and displays the application details.

    POST /gpaList: Handles GPA-based filtering and displays a table of matching applications.

    POST /removeApp: Handles bulk deletion of all applications in the database.

Usage:

    Starting the Server:
        Run the server with the command: node server.js <PORT_NUMBER>
        Example: node server.js 3000

    Environment Configuration:
        Ensure a .env file is present in the databaseCon directory with the following variables:

        makefile

        MONGO_CONNECTION_STRING=<your-mongo-connection-string>
        MONGO_DB_NAME=<your-database-name>
        MONGO_COLLECTION=<your-collection-name>

Conclusion:

The Academic Application Management System is an efficient and scalable solution for managing academic program applications. Its modular design and use of modern web technologies ensure easy maintenance and extensibility. This system simplifies the application process for both applicants and administrators, making it a valuable tool for academic institutions.
