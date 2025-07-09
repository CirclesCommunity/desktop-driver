import net from "net";
import { parseAndSendLabTestResultHL7 } from "./utils.js";
import { sendMachineResponse } from "../api/mutate/sendResultInputs.js";
import dotenv from 'dotenv';
// "start": "tsc && node dist/src/server.js",
const port = 8080;
const host = "127.0.0.1";
let sockets = [];
const start_marker = "\u000b";
const end_marker = "\u001c";
const STX = "\u0002";
let buffer = "";
const server = net.createServer(
// (socket) => {
// console.log("Client connected");
// socket.on("data", (data) => {
// 	console.log("Received data: " + data);
// });
// socket.on("end", () => {
// 	console.log("Client disconnected");
// });
// }
);
server.on("connection", function (socket) {
    console.log(`CONNECTED ${socket.remoteAddress}: ${socket.remotePort}`);
    sockets.push(socket);
    // .forEach() sends recieved message back to the sender?
    socket.on("data", function (data) {
        console.log(`\nDATA ${socket.remoteAddress}: ${data}\n`);
        console.log(`JSON:${JSON.stringify(data.toString())}\n`);
        if ((data.toString().trim() === 'start')) {
            console.log(`starting test`);
            socket.write(`\n testing apollo sending...`);
            sendMachineResponse({
                responses: [{
                        globalInputId: "Yellow_cells",
                        value: "33"
                    }],
                branchId: "1919",
                containerId: 1918,
            });
        }
        buffer += data.toString("utf-8");
        let start = buffer.indexOf("\x0b");
        let end = buffer.indexOf("\x1c\r");
        while (((start !== -1) && (end !== -1)) && (end > start)) {
            let HL7_message = buffer.substring(start + 1, end);
            console.log(`HL7 Message Recieved:\n${HL7_message}\n`);
            parseAndSendLabTestResultHL7(HL7_message);
            socket.write(start_marker +
                "[ACK]" +
                end_marker);
            // Flushing buffer
            buffer = buffer.slice(end + 2);
            start = buffer.indexOf("\x0b");
            end = buffer.indexOf("\x1c\r");
        }
        ;
        // Write the data back to all the connected, the client will receive it as data from the server
        // sockets.forEach(function (socket, index, array) {
        // 	socket.write(`${socket.remoteAddress}: ${socket.remotePort} said ${data}\n`
        // 	);
        // });
        // sockets.forEach((sock) => {
        // 	if ((sock !== socket)&&(!sock.destroyed)) {
        // 		socket.write(`${socket.remoteAddress}: ${socket.remotePort} said ${data}\n`
        // 	);
        // 	}
        // })
    });
    const cleanUp = () => {
        const index = sockets.indexOf(socket);
        if ((index !== -1)) {
            sockets.splice(index, 1);
        }
        ;
        console.log(`Client disconnected: ${socket.remoteAddress} : ${socket.remotePort}`);
    };
    // socket.on("close", function (data) {
    // 	let index = sockets.findIndex(function (o) {
    // 		return (
    // 			o.remoteAddress === socket.remoteAddress &&
    // 			o.remotePort === socket.remotePort
    // 		);
    // 	});
    // 	if (index !== -1) sockets.splice(index, 1);
    // 	console.log(
    // 		`CLOSED: ${socket.remoteAddress} : ${socket.remotePort}`
    // 	);
    // });
    // socket.on("end", cleanUp);
    socket.on("close", cleanUp);
    socket.on("error", (err) => {
        console.error(`Error : ${err.message}\nconnection will be closed.`);
        cleanUp();
    });
});
server.listen(port, host, () => {
    console.log(`TCP Server is running on ${host} port ${port}`);
});
