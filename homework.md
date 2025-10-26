-initilize git
-.gitignore
-create a remove repo on github
-push all code to remote origin

- play with routes and routes extensions ex . /hello, /. hello/2
  order of the sequence matters

-what ius middleware? why do we need it?
-how express JS basically handles requests behind the scenes
-app.use("/route",rH,[eH2,rH3,rH4]);
-Difference app.use and app.all

-Create a free cluster on MongoDb official website(Mongo Atlas)
-Install mongoose library
-Connect your application to the database "connection-url"/devTinder
-Call the connectDb function and connect to database before starting application on 7777

- Create a userSchema & user Model
- Create POST /signup API to add data to database api calls from postman
- Error handling suing try , catch
- Difference between JSON and JavaScript object
- Add the express.json middleware to your app
- Make your signup API dynamic to recive data from the end user
- Get user by email
- Feed API - GET/feed - get all the user from the db
- Create user delete api
- Difference betwwen PATCH and PUT
- API - update a user
- Explore the Mongoose Documentation for Model methods
- What are options in a Model.findOneAndUpdate method ,explore more about it
- API - update the user with email ID

- Explore Schema type options from the documentation
- Add required, unique, lowercase, min,minLength, trim
- Add default
- Create a custom validate function from gender
- Improve the DB schema - PUT all appropriate validations on each field in Schema
- Add timestamp to the Userschema
- Add API level validations on Patch request & Signup post api
- Data Sanitizating - Add API validation for each field
- Install Validator
- Explore Validator library function and use validtor function for password , emaiId, age , etc.

- Validate data in signup API
- Install bscrypt package
- Create PasswordHash using bcrypt.hash & save the user is encrupted password
- Create login API
- Campare passowrds and throe errors if email or password is invalid

- Install cookie-parcer
- just send a dummy cookie to user
- create GET/profile API and check if you get the cookie back
- Install Jsonwebtoken
- In login API - after email and password validation,create a JWT token and send it to user in cookie
- Read the cookie inside your profile API and find the logges in user.

- Write userAuth middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequestion API
- Set the expiry of JWT token and cookies to 7 days

- Create User Schema method to get JWT
- Create user schema method to comaprePassword(passwordInputByUser)

- Explore tinder APIs
- Create a lists of API you can think of in dev Tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managinf auth,profile, request routers
- Create authRouter , profileRouter,requestRouter
- Import these routers in app.js

- Create POST / Logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forget password API
- Make you validate all data in every POST,PATCH apis

- Create Connection Request Schema
- Send connection Request API
- Proper validation of data
- Think about all corner cases
- $or mongodb/mongoose query
- Schema.pre("save") function
- Read this article about compound indexes from mongodb
- Why do we need an index
- What is the advantages and disadvantages of of creating ?
- Always think of corner cases

- Write code with proper validation for POST /request/review/:status/:requestId
- Thought process POST vs GET
- Read about ref and populate from mongoose site
- Create GET /user/requests/reveived will all the checks
- Create GET / user/connections

- Logic for GET /feed API
- Explore the $nin , $and , $ne and other comparion queries operator

- Pagination
  Notes
  /feed?page=1&limit=10 => first 10 users 1-10 = > .skip(0) & .limit(10)
  /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

  .skip() & .limit() in mongodb for pagination

  skip = (page-1)\*(limit)
