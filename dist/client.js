import net from "net";
const client = new net.Socket();
const port = 7070;
const host = "127.0.0.1";
const CARRIAGE_RETURN = String.fromCharCode(13);
const START_OF_BLOCK = "\u000b";
const END_OF_BLOCK = "\u001c";
const STX = "\u0002";
client.connect(port, host, function () {
    console.log("Connected");
    client.write(START_OF_BLOCK + "[ACK]" + END_OF_BLOCK);
});
client.on("data", function (data) {
    console.log("Server Says : " + data);
    const messages = [""];
    let messageIndex = 0;
});
client.on("close", function () {
    console.log("Connection closed");
});
console.log("Hello" + CARRIAGE_RETURN + "!");
