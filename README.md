# Waitline Server

## ABOUT

CRUD API server for waitline app that was developed by Aldiyar Batyrbekov.
<br/>
This API supports:
<ul>
  <li>authentication through JWT</li>
  <li>GET requests</li>
  <li>POST requests</li>
  <li>PATCH requests</li>
  <li>DELETE requests</li>
</ul>
<br/>
The API is connected to relational database built using PostgreSQL.
## Available Endpoints
<ul>
  <li>
    <h3>/auth</h3>
    Handles all the authentication related tasks.
  </li>
  <li>
    <h3>/users</h3>
      <ul>
        <li>
          "POST" adds user to users table
        </li>
        <li>
          :/id "GET" retrieves a user with specific /:id
        </li>
        <li>
          :/id "PATCH" updates specified user with new fields
        </li>
        <li>
          :/id "DELETE" deletes user from database
        </li>
      </ul>
  </li>
  <li>
  <h3>/line</h3>
    <ul>
      <li>
        "GET" retrieves all guests associated with specific user
      </li>
      <li>
        "POST" adds new guest to the line table
      </li>
      <li>
        "PATCH" updates a given guest with new fields
      </li>
      <li>
        "DELETE" deletes a guest from database
      </li>
    </ul>
  </li>
<ul>
## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.