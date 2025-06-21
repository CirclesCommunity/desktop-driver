import net from "net";
import {parseAndSendLabTestResultHL7} from "./utils";

// "start": "tsc && node dist/src/server.js",
const port = 7070;
const host = "127.0.0.1";

let sockets: net.Socket[] = [];

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
		console.log(`DATA ${socket.remoteAddress}: ${data}\n`);

		let HL7_message:string = data.toString("utf-8");
		parseAndSendLabTestResultHL7(HL7_message);
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
		};
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

	socket.on("end", cleanUp);
	socket.on("close", cleanUp);
	socket.on("error", (err) => {
		console.error(`Error : ${err.message}\nconnection will be closed.`);
		cleanUp();
	});
});

server.listen(port, host, () => {
	console.log(`TCP Server is running on ${host} port ${port}`);
});