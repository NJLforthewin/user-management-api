# user-management-api

TO REGISTER

POST http://localhost:7000/register

TO LOGIN 

POST http://localhost:7000/register

TO GET ALL USERS

GET http://localhost:7000/users

TO GET A USER

POST http://localhost:7000/user/:id  Replace :id with the uuid

TO DELETE A USER 

DELETE http://localhost:7000/user/:id  Replace :id with the uuid


REQUIRED DEPENDENCIES

npm install express bcryptjs uuid cors helmet dotenv
npm install --save-dev typescript @types/node @types/express @types/cors @types/bcryptjs @types/uuid nodemon ts-node
