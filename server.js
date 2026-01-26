require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/service/ai.service');
// const path = require('path');



const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});

const ChatHistory = [
 
];



io.on("connection", (socket) => {
  console.log('a user connected')

  socket.on("disconnect", () => {
    console.log("user disconnected")
  });
  // custom events
  socket.on("ai-message", async (data) => {
    console.log("Received ai message", data.prompt);

    ChatHistory.push({
      role: "user",
      parts: [{ text: data.prompt }]
    });

    const response = await generateResponse(ChatHistory);
    
    ChatHistory.push({
      role: "model",
      parts: [{ text: response }]
    });

    socket.emit("ai-message-response", { response });
  })



});



httpServer.listen(3000, () => {
  console.log('server is running on port 3000');
});