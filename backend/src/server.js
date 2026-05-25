const express = require("express");
const {createServer} = require("node:http");
const {Server} = require("socket.io");
const initSocket = require("./socket/socket");
const connectDB = require("./database/config/connection");
const cors = require("cors");
const app = express();
app.use(cors({
    origin:"*"
}));
const server = createServer(app);
const io = initSocket(server);

app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.json({msg:"Hellow from StackX"});
});



app.use("/api/admin", require("../src/routes/admin"));
app.use("/api/user", require("../src/routes/user"));
app.use("/api/requests", require("../src/routes/request"));
app.use("/api/auth", require("../src/routes/auth"));
app.use("/api/resources", require("../src/routes/resource"));
app.use("/api/messages", require("../src/routes/messages"));
app.use("/api/courses", require("../src/routes/courses"));
app.use("/api/subjects", require("../src/routes/subject"));










server.listen(3000, ()=> {
    try {
        connectDB();
        console.log("Server is up and live at 3000")
    } catch (error) {
        console.log("Something went wrong  : "+ error.msg);
    }
});


