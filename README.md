# NodeJS Website Build 2

**This project is for testing only**

## Techonology

**Backend**

- nodejs
- postgres
- express

**Frontend**

- HTML5
- Bootstrap3
- Javascript

<br />

## Deployment

### 1. Deploy in Local Host

**Step 1: Install Node.js and npm**

If you haven't installed Node.js and npm, download and install them from the official website: [Node.js](https://nodejs.org/en)

**Step 2: Install PostgreSQL**

If you haven't installed PostgreSQL, download and install it from the official website: [PostgreSQL](https://www.postgresql.org)

Please remember your password for administration PostgreSQL account

**Step 3: Clone the Repository**

Open your terminal or command prompt and run the following command:

`git clone https://github.com/ttbhanh/kcpm-nodejs2.git`

**Step 4: Install Dependencies**

Navigate to the project directory:

`cd kcpm-nodejs2`

Install the project dependencies using npm:

`npm i`

**Step 5: Set Up PostgreSQL Database**

Create a PostgreSQL database for your application. You may use a tool like pgAdmin/DBeaver or the PostgreSQL command line to create the database.

Update the database configuration in the **`config/config.js`** with your PostgreSQL connection details.

**Step 6: Start the Server**

Start the Node.js Express server:

`npm start`

Your website should be accessible at [http://localhost:3000](http://localhost:3000).

**Step 7: Explore and Test**

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000). Explore the website and test its requirements.

**Step 8: Stop the Server**

To stop the server, go back to your terminal and press **`Ctrl + C`**

### 2. Deploy in Docker

**Step 1: Install Docker**

If you haven't installed Docker, download and install it from the official website: [Docker.com](https://www.docker.com/)

**Step 2: Clone the Repository**

Open your terminal or command prompt and run the following command:

`git clone https://github.com/ttbhanh/kcpm-nodejs2.git`

**Step 3: Navigate to the project directory**

`cd kcpm-nodejs2`

**Step 4: Start the Docker containers**

`docker-compose up`

**Step 5: Explore and Test**

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000). Explore the website and test its requirements.

**Step 6: Stop the Docker Containers**

`docker stop <container_id>`

Replace **`<container_id>`** with the actual container ID obtained from **`docker ps`**

## NodeJS Website Description

The NodeJS website has the following main functions:

1. Display information about all articles (Home page): Information for each article includes a cover image, title, and a brief description. A maximum of 3 articles is displayed in one row.

2. Display detailed information about an article (Details page): Clicking on an article from the home page will show detailed information about the article, including the cover image, detailed description, and a list of comments.

3. Paginate the list of comments on the article details page: Each page displays a maximum of 3 comments. Information for each comment includes the comment content and the posting time.

4. Add Comment: Only logged-in accounts are allowed to add comments.

5. Delete Comment: Only logged-in accounts as administration are allowed to delete comments.

6. Log In (Login page): Allows saving passwords for subsequent logins.

7. Log Out: Allows logged-in users to return to the logged-out state.

8. Register Account (Register page): Usernames must not be empty, passwords must contain at least one lowercase letter, one uppercase letter, and one digit, with a minimum length of 8 characters.

By default, an administration user account is created in the database:

- Username: admin
- Password: Admin@123
