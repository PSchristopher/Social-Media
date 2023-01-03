Live : <a href="https://happynest.tk" target="blank">HappyNest</a>

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
![image](https://user-images.githubusercontent.com/107933434/210220032-c6567312-c1d3-4126-ba20-922acdaf899e.png)
![image](https://user-images.githubusercontent.com/107933434/210220363-2ecdd9e2-8738-4779-a483-ea5a87e16727.png)
#### Login 
![image](https://user-images.githubusercontent.com/107933434/210219975-a27ca6a2-cb32-4d8e-aec5-fb15260d3c03.png)

### Home
![image](https://user-images.githubusercontent.com/107933434/210375500-a9cb178d-2585-471a-bf29-0de7bc7e2740.png)
### Profile
![image](https://user-images.githubusercontent.com/107933434/210375765-dee4cce0-de74-40fe-9d49-8ed5ca63cfec.png)
### Chat
![image](https://user-images.githubusercontent.com/107933434/210375867-0ffe5b4c-ed0e-44d1-b6f0-6b4e3875beec.png)

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

