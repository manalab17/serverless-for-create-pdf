import {APIGatewayEvent, Context} from "aws-lambda";
import {getDefaultResponse} from "./src/common/response";
import {createPDF} from "./src/api/createPDF";

async function createPDFHandler(event: APIGatewayEvent & { isWarmer?: boolean }, ctx: Context) {
    ctx.callbackWaitsForEmptyEventLoop = false;
    const { isWarmer = false } = event;

    if (isWarmer) {
        return getDefaultResponse();
    }

    const result = await createPDF(event);

    return result;
}

export {
    createPDFHandler
};