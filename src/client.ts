import net from "net";
import {parseAndSendLabTestResultHL7} from "./utils";




const client = new net.Socket();
const port = 5100;
const host = "10.48.3.102";
// const host = "127.0.0.1";

const CARRIAGE_RETURN = String.fromCharCode(13);
const START_OF_BLOCK = "\u000b";
const END_OF_BLOCK = "\u001c";
const STX = "\u0002";

let buffer = "";

// console.log(`about to client.connect().`);

client.connect(port, host, function () {
	console.log(`Connected Client ${host}:${port}\n`);
	// client.write(START_OF_BLOCK + "[ACK]" + END_OF_BLOCK);
});
client.on("data", function (data) {
	buffer += data.toString(); // Append incoming data to the buffer
	client.write(START_OF_BLOCK + "[ACK]" + END_OF_BLOCK);

	while (true) {
		const startIdx = buffer.indexOf(START_OF_BLOCK);
		const endIdx = buffer.indexOf(END_OF_BLOCK);

		// If start and end markers are found
		if (startIdx !== -1 && endIdx !== -1) {
			const message = buffer.slice(
				startIdx + START_OF_BLOCK.length,
				endIdx
			);
			// const processedMessage = message.replace(new RegExp(CARRIAGE_RETURN, 'g'), '\n');
			console.log("Received message: ", message);

			try {
				parseAndSendLabTestResultHL7(message);
			} catch (error: any) {
				console.log(`Error Trying to parse recieved message: client: ${host}:${port} error: ${error}\n`);
				// console.log("🚀 ~ file: useCreateMutation.tsx:83 ~ error:", error);
				// console.log(
				// 	"\n😀 error..networkError, \n ",
				// 	error.networkError,
				// 	"\n😀 error?.networkError?.result?.errors,\n",
				// 	error?.networkError?.result?.errors,
				// 	"\n😀 error?.networkError?.response,\n",
				// 	error?.networkError?.response,
				// 	"\n😀 error?.networkError?.response?.headers,\n",
				// 	error?.networkError?.response?.headers,
				// 	"\n😀 error.graphQLErrors[0], \n ",
				// 	error.graphQLErrors[0],
				// 	"\n😀 error \n",
				// 	error
				// );
			}

			// Remove processed message from the buffer
			buffer = buffer.slice(endIdx + END_OF_BLOCK.length);
		} else {
			// If either start or end marker is missing, break the loop and wait for more data
			break;
		}
	}
	// console.log(typeof data)
	// console.log( data.values())

	// if (String(data).endsWith(END_OF_BLOCK) || String(data).endsWith(CARRIAGE_RETURN))
	// client.write(START_OF_BLOCK + "[ACK]" + END_OF_BLOCK);
});

client.on("close", function () {
	console.log("Connection closed");
});

console.log("Hello" + CARRIAGE_RETURN + "!");

/*
MSH|^~\&|||||20240316094105||ORU^R01|2|P|2.3.1||||||UNICODE
PID|1||^^^^MR||SYLVAIN^DILLA|||Féminin
PV1|1
OBR|1||X3|00001^Automated Count^99MRC|||20240316091048|||||||||||||||||HM||||||||Administrator
OBX|1|IS|08001^Take Mode^99MRC||O||||||F
OBX|2|IS|08002^Blood Mode^99MRC||W||||||F
OBX|3|IS|01002^Ref Group^99MRC||Général||||||F
OBX|4|NM|6690-2^WBC^LN||5.3|10*3/uL|4.0-10.0|N|||F
OBX|5|NM|731-0^LYM#^LN||2.5|10*3/uL|0.8-4.0|N|||F
OBX|6|NM|736-9^LYM%^LN||46.3|%|20.0-40.0|H~N|||F
OBX|7|NM|789-8^RBC^LN||3.84|10*6/uL|3.50-5.50|N|||F
OBX|8|NM|718-7^HGB^LN||10.0|g/dL|11.0-16.0|L~N|||F
OBX|9|NM|787-2^MCV^LN||92.0|fL|80.0-100.0|N|||F
OBX|10|NM|785-6^MCH^LN||26.1|pg|27.0-34.0|L~N|||F
OBX|11|NM|786-4^MCHC^LN||17.6|mmol/L|19.9-22.3|L~N|||F
OBX|12|NM|788-0^RDW-CV^LN||13.6|%|11.0-16.0|N|||F
OBX|13|NM|21000-5^RDW-SD^LN||43.9|fL|35.0-56.0|N|||F
OBX|14|NM|4544-3^HCT^LN||35.4|%|35.0-54.0|N|||F
OBX|15|NM|777-3^PLT^LN||402|10*3/uL|100-400|H~N|||F
OBX|16|NM|32623-1^MPV^LN||9.4|um3|6.5-12.0|N|||F
OBX|17|NM|32207-3^PDW^LN||15.8||15.0-17.0|N|||F
OBX|18|NM|10002^PCT^99MRC||0.378|%|0.108-0.282|H~N|||F
OBX|19|NM|10027^MID#^99MRC||0.3|10*3/uL|0.1-1.5|N|||F
OBX|20|NM|10029^MID%^99MRC||6.4|%|3.0-15.0|N|||F
OBX|21|NM|10028^GRAN#^99MRC||2.5|10*3/uL|2.0-7.0|N|||F
OBX|22|NM|10030^GRAN%^99MRC||47.3|%|50.0-70.0|L~N|||F
OBX|23|NM|10013^PLCC^99MRC||88|/nL|30-90|N|||F
OBX|24|NM|10014^PLCR^99MRC||21.9|%|11.0-45.0|N|||F
*/


// import net from "net";
// import { parseAndSendLabTestResultHL7 } from "./utils.js";

// const port = 5100;
// const host = "10.48.3.102";

// const START_OF_BLOCK = "\u000b";
// const CARRIAGE_RETURN = String.fromCharCode(13);
// const END_OF_BLOCK = "\u001c";
// const CONNECTION_TIMEOUT = 10000; // 10 seconds
// const MAX_BUFFER_SIZE = 1024 * 1024; // 1MB limit
// const RECONNECT_DELAY = 5000; // 5 seconds

// let buffer = "";
// let client: net.Socket | null = null;
// let reconnectTimer: NodeJS.Timeout | null = null;

// function createConnection() {
//     if (client) {
//         client.removeAllListeners();
//         client.destroy();
//     }

//     client = new net.Socket();
    
//     // Set connection timeout
//     client.setTimeout(CONNECTION_TIMEOUT);

//     client.connect(port, host, () => {
//         console.log(`Connected to ${host}:${port}`);
//         buffer = ""; // Reset buffer on new connection
        
//         if (reconnectTimer) {
//             clearTimeout(reconnectTimer);
//             reconnectTimer = null;
//         }
//     });

//     client.on("data", (data) => {
//         buffer += data.toString();
        
//         // Prevent buffer from growing too large
//         if (buffer.length > MAX_BUFFER_SIZE) {
//             console.error("Buffer overflow, clearing buffer");
//             buffer = "";
//             return;
//         }

//         processMessages();
//     });

//     client.on("close", () => {
//         console.log("Connection closed");
//         scheduleReconnect();
//     });

//     client.on("error", (err) => {
//         console.error("Socket error:", err.message);
//         scheduleReconnect();
//     });

//     client.on("timeout", () => {
//         console.error("Connection timeout");
//         client?.destroy();
//         scheduleReconnect();
//     });
// };

// function processMessages() {
//     while (true) {
//         const startIdx = buffer.indexOf(START_OF_BLOCK);
//         const endIdx = buffer.indexOf(END_OF_BLOCK);

//         // If start and end markers are found
//         if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
//             const message = buffer.slice(
//                 startIdx + START_OF_BLOCK.length,
//                 endIdx
//             );
            
//             console.log("Received message:", message.substring(0, 100) + "..."); // Truncate for logging
            
//             let processingSuccess = false;
//             try {
//                 parseAndSendLabTestResultHL7(message);
//                 processingSuccess = true;
//                 console.log("Message processed successfully");
//             } catch (error) {
//                 console.error("Error processing HL7 message:", error);
//                 // Log error details without excessive verbosity
//                 if (error instanceof Error) {
//                     console.error("Error details:", {
//                         name: error.name,
//                         message: error.message,
//                         stack: error.stack?.split('\n').slice(0, 3).join('\n') // Limit stack trace
//                     });
//                 }
//             }

//             // Send ACK only after processing attempt
//             if (client && !client.destroyed) {
//                 try {
//                     client.write(START_OF_BLOCK + "[ACK]" + END_OF_BLOCK);
//                     console.log("ACK sent");
//                 } catch (writeError) {
//                     console.error("Failed to send ACK:", writeError);
//                 }
//             }

//             // Remove processed message from the buffer
//             buffer = buffer.slice(endIdx + END_OF_BLOCK.length);
//         } else {
//             // If either start or end marker is missing, or they're in wrong order
//             if (startIdx === -1 && endIdx !== -1) {
//                 // End marker without start marker - corrupted data
//                 buffer = buffer.slice(endIdx + END_OF_BLOCK.length);
//                 console.warn("Found end marker without start marker, skipping corrupted data");
//                 continue;
//             }
//             break;
//         }
//     }
// }

// function scheduleReconnect() {
//     if (reconnectTimer) {
//         return; // Already scheduled
//     }
    
//     console.log(`Reconnecting in ${RECONNECT_DELAY / 1000} seconds...`);
//     reconnectTimer = setTimeout(() => {
//         reconnectTimer = null;
//         createConnection();
//     }, RECONNECT_DELAY);
// }

// function shutdown() {
//     console.log("Shutting down client...");
    
//     if (reconnectTimer) {
//         clearTimeout(reconnectTimer);
//         reconnectTimer = null;
//     }
    
//     if (client) {
//         client.removeAllListeners();
//         client.destroy();
//         client = null;
//     }
// }

// // Handle graceful shutdown
// process.on('SIGINT', shutdown);
// process.on('SIGTERM', shutdown);

// // Start the connection
// console.log(`Starting HL7 client, connecting to ${host}:${port}...`);
// createConnection();
