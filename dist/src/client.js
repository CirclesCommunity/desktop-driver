import net from "net";
import { parseAndSendLabTestResultHL7 } from "./utils";
const client = new net.Socket();
const port = 7070;
const host = "127.0.0.1";
const CARRIAGE_RETURN = String.fromCharCode(13);
const START_OF_BLOCK = "\u000b";
const END_OF_BLOCK = "\u001c";
const STX = "\u0002";
const dummyMessage = `MSH|^~\&|||||20220808114856||ORU^R01|2|P|2
                    .3.1||||||UNICODE[CR]PID|1||^^^^MR||^KHADIDJIA
                    ·MHT·ALI|||FÃ©minin[CR]PV1|1[CR]OBR|1||565721|
                    00001^Automated·Count^99MRC|||20220804120854||
                    |||||||||||||||HM||||||||Administrator[CR]OBX|
                    1|IS|08001^Take·Mode^99MRC||O||||||F[CR]OBX|2|
                    IS|08002^Blood·Mode^99MRC||W||||||F[CR]OBX|3|I
                    S|01002^Ref·Group^99MRC||GÃ©nÃ©ral||||||F[CR]O
                    BX|4|NM|6690-2^WBC^LN||11.0|10*3/uL|4.0-10.0|H
                    ~N|||F[CR]OBX|5|NM|731-0^LYM#^LN||2.5|10*3/uL|
                    0.8-4.0|N|||F[CR]OBX|6|NM|736-9^LYM%^LN||23.0|
                    %|20.0-40.0|N|||F[CR]OBX|7|NM|789-8^RBC^LN||3.
                    86|10*6/uL|3.50-5.50|N|||F[CR]OBX|8|NM|718-7^H
                    GB^LN||12.0|g/dL|11.0-16.0|N|||F[CR]OBX|9|NM|7
                    87-2^MCV^LN||94.9|fL|80.0-100.0|N|||F[CR]OBX|1
                    0|NM|785-6^MCH^LN||31.1|pg|27.0-34.0|N|||F[CR]
                    OBX|11|NM|786-4^MCHC^LN||32.8|g/dL|32.0-36.0|N
                    |||F[CR]OBX|12|NM|788-0^RDW-CV^LN||13.4|%|11.0
                    -16.0|N|||F[CR]OBX|13|NM|21000-5^RDW-SD^LN||43
                    .9|fL|35.0-56.0|N|||F[CR]OBX|14|NM|4544-3^HCT^
                    LN||36.6|%|37.0-54.0|L~N|||F[CR]OBX|15|NM|777-
                    3^PLT^LN||478|10*9/L|100-300|H~N|||F[CR]OBX|16
                    |NM|32623-1^MPV^LN||6.8|fL|6.5-12.0|N|||F[CR]O
                    BX|17|NM|32207-3^PDW^LN||17.1||15.0-17.0|H~N||
                    |F[CR]OBX|18|NM|10002^PCT^99MRC||0.323|%|0.108
                    -0.282|H~N|||F[CR]OBX|19|NM|10027^MID#^99MRC||
                    1.0|10*3/uL|0.1-1.5|A|||F[CR]OBX|20|NM|10029^M
                    ID%^99MRC||8.8|%|3.0-15.0|A|||F[CR]OBX|21|NM|1
                    0028^GRAN#^99MRC||7.5|10*3/uL|2.0-7.0|H~A|||F[
                    CR]OBX|22|NM|10030^GRAN%^99MRC||68.2|%|50.0-70
                    .0|A|||F[CR]OBX|23|NM|10013^PLCC^99MRC||54|10*
                    9/L|30-90|N|||F[CR]OBX|24|NM|10014^PLCR^99MRC|
                    |11.2|%|11.0-45.0|N|||F[CR][FS][CR]`;
// client.connect(port, host, function () {
// 	console.log("Connected");
// 	client.write(START_OF_BLOCK + "[ACK]" + END_OF_BLOCK);
// });
// client.on("data", function (data: Buffer) {
// 	console.log("Server Says : " + data);
// 	// add the data to the clipboard
// 	// clipboard.writeText(data.toString());
// 	// client.write(START_OF_BLOCK + "[ACK]" + END_OF_BLOCK);
// 	// client.write(START_OF_BLOCK + "[ACK]" + END_OF_BLOCK);
// 	const messages = [""];
// 	let messageIndex = 0;
// });
// client.on("close", function () {
// 	console.log("Connection closed");
// });
console.log("Hello" + CARRIAGE_RETURN + "!");
parseAndSendLabTestResultHL7(dummyMessage);
