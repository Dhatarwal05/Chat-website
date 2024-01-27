// Node server which will handle socket io connections
const io = require("socket.io")(8000);
const users = {};

io.on('connection',socket =>{        // ye socket.io insinte hai jo ki bahut saar  socket ko listen kerga like hari ,diya,ram ne coonect kiya
    socket.on('new-user-joined',name =>{      // ye particular  connectiom user ke liye hai
        console.log("New user",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);  //ye baaki log ko show kerga ki new user ne chat join ki hai usska chor ke
    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message,name: users[socket.id]})
    });

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});