var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { client } from "@/client/src/index";
import { RECORD_MACHINE_RESPONSE } from "@/mutations/recordMachineInput";
export const sendMachineResponse = (machineResponseInput) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenInput = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODlkYWQyYzliYTQyZGQyNjVhMjhiYiIsInRlbmFudCI6IjY1NWQ4N2ZlYTIwMGI3M2QwNDJlN2UzMiIsIm9yZ25pemF0aW9uSWQiOiI2NTVkODdmZWEyMDBiNzNkMDQyZTdlMzIiLCJpYXQiOjE3MDg3MDQ0MzQsImV4cCI6MzQxODU1NjU5Mn0.h-HsnzXiav4m8jGVqWlB2xvtMJJwAFbi6udN9S1bwvQ";
    const result = yield client.mutate({
        mutation: RECORD_MACHINE_RESPONSE,
        variables: {
            tokenInput,
            machineResponseInput,
        },
    });
    if (result.errors) {
        console.error(result.errors);
    }
    return result.data;
});
