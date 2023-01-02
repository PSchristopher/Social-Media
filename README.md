<img src="https://user-images.githubusercontent.com/95907424/209274108-dbcd6ed2-4acd-44bd-b140-31a147480d3d.png" width="400px" />
Live : <a href="#" target="blank"></a>

## Main Functionality
  - User Login and Register with mail verification
  - Forgot password with resend otp
  - JWT authentication and route verification
  - Home page with online friends and post’s
  - Upload post, edit and delete post 
  - Like, comment and report post 
  - Search and follow user’s
  - Profile management 
  - Chat with users (socket Io)
  - Live notification
  - Admin login with jwt verification
  - Block user’s and post  


#### User register with email otp
![image](https://user-images.githubusercontent.com/95907424/209275091-d66eb25d-0f02-4632-8cef-96bb0ce94b56.png)
![image](https://user-images.githubusercontent.com/95907424/209275388-b61b19d1-a850-43cb-9d27-8ac6ba708b5b.png)

#### Login 
![image](https://user-images.githubusercontent.com/95907424/209275062-6c30fdb5-814c-4b2d-9afa-5f93398ecc78.png)


## Used 

#### *Node js  |  React js  |  Mongo DB  |  Express js*


## Prerequisites

* Node.js >= v16.15.0
* React js >= 
* npm >= 
* MongoDB >= ^4.7.0


## Run Locally



Clone the project

```bash
  git clone https://github.com/Faisal-kkn/Social-Media.git
```

Go to the project directory

```bash
  cd Social-Media
```
### Run backend


```bash
  cd server
```
Install dependencies

```bash
  npm install
```


Create a .env file and add 👇


```bash
  DATABASE = MongoDB database link
  ADMIN_MAIL_ID = Admin email for node mailer
  ADMIN_PASSWORD = Admin password for node mailer
  USER_JWT_SECRET = User jwt secret
  ADMIN_JWT_SECRET = Admin jwt secret
  PORT  = 5000
```

Start the backend server

```bash
  npm start
```


### Run Frontend

```bash
  cd ../client
```
Install dependencies
```bash
  npm install
```

Start the server

```bash
  npm start
```

