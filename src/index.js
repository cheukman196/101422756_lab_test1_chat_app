require('dotenv').config();

// Git Repo:
// Chat: socket.io (group and 1-to-1 chat), signup & login
const server = require('./server.js')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRoutes.js')
const privateMessageRouter = require('./routes/privateMessageRoutes.js')
const groupMessageRouter = require('./routes/groupMessageRoutes.js')
const errorHandler = require('./errorHandler.js')

const PORT = process.env.PORT || 5200;

const app = express();
app.use(express.json()); // json parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cors());

async function run() {
  try {
  
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo db successfully.")
    await mongoose.connection.db.admin().command({ ping: 1 });
    
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/views/login.html');
    })

    app.get('/signup', (req, res) => {
      res.sendFile(__dirname + '/views/signup.html')
  })

    app.get('/chat', (req, res) => {
      res.sendFile(__dirname + '/views/chat.html')
    })
  
    app.get('/group-chat', (req, res) => {
        res.sendFile(__dirname + '/views/group_chat.html')
    })

    app.use('/api/users', userRouter);
    app.use('/api/private-messages', privateMessageRouter);
    app.use('/api/group-messages', groupMessageRouter);

    app.use(errorHandler);

    app.listen(PORT, () => { console.log(`Backend server is running on port ${PORT} ...`) });


  } finally {
    // await mongoose.disconnect();
  }
}

run().catch(console.dir); 

