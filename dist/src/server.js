import net from "net";
const port = 7070;
const host = "127.0.0.1";
let sockets = [];
const server = net.createServer((socket) => {
    console.log("Client connected");
    socket.on("data", (data) => {
        console.log("Received data: " + data);
    });
    socket.on("end", () => {
        console.log("Client disconnected");
    });
});
server.on("connection", function (sock) {
    console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
    sockets.push(sock);
    sock.on("data", function (data) {
        console.log("DATA " + sock.remoteAddress + ": " + data);
        // Write the data back to all the connected, the client will receive it as data from the server
        sockets.forEach(function (sock, index, array) {
            sock.write(sock.remoteAddress +
                ":" +
                sock.remotePort +
                " said " +
                data +
                "\n");
        });
        sock.on("close", function (data) {
            let index = sockets.findIndex(function (o) {
                return (o.remoteAddress === sock.remoteAddress &&
                    o.remotePort === sock.remotePort);
            });
            if (index !== -1)
                sockets.splice(index, 1);
            console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
        });
    });
});
server.listen(port, host, () => {
    console.log("TCP Server is running on port " + port + ".");
});
