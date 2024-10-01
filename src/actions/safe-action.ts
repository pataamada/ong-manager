import {
    DEFAULT_SERVER_ERROR_MESSAGE,
    createSafeActionClient,
} from "next-safe-action";
export const actionClient = createSafeActionClient({
    handleServerError(e) {
        console.log(e)
        return DEFAULT_SERVER_ERROR_MESSAGE;
    },
});
