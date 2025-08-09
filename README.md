# Task Tracker

A simple task tracker app with mongodb and clerk.

We have used clerk for authentication process and with the help of that we are saving users task in our mongodb which we configured using mongoose.

## How to get Started with code

To get started first clone the project by running following command in your terminal

`git clone https://github.com/Dawood-0007/Task-Tracker.git`

then you can go to mongodb download site (here)\[[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)] but remember to install mongodb compass chosen in installer during download after that you can go to clerk official site register yourself and then create your app in case of any issues you can visit documentation as

Clerk Documentation : [https://clerk.com/docs](https://clerk.com/docs)

when you finish creating your app in clerk copy the credentials provided and paste them in your .env file which you have to create and you also have to save your mongodb connection URL in .env file like this

`MONGODB_URI=mongodb://localhost:27017/task-tracker`

if you have different port or database name then change it accordingly and save it in .env file

after all this run

`npm install`
`npm run dev`

It will start your server on default port 3000 and you will be able to see your site in [https://localhost:3000](https://localhost:3000)

## Your contribution

We welcome contributions that improve this app.

Whether it's bug fixes, feature enhancements, or code cleanup, feel free to open a pull request!