var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { client } from "../../client/src/index.js";
import { RECORD_MACHINE_RESPONSE } from "../../graphql/mutations/recordMachineResponse.js";
export const sendMachineResponse = (machineResponseInput) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenInput = process.env.TOKEN_INPUT;
    const result = yield client.mutate({
        mutation: RECORD_MACHINE_RESPONSE,
        variables: {
            tokenInput,
            machineResponseInput,
        },
    });
    if (result.errors) {
        console.error(result.errors);
        return undefined;
    }
    console.log("✅✅✅✅✅✅ RESULT SENT SUCCESSFULLY ✅✅✅✅✅✅");
    return result.data;
});
