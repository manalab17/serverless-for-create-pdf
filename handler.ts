import {APIGatewayEvent, Context} from "aws-lambda";
import {getDefaultResponse} from "./src/common/response";
import {createPDF} from "./src/api/createPDF";
import {createPDFWithUpload} from "./src/api/createPDFWithUpload";

async function createPDFHandler(event: APIGatewayEvent & { isWarmer?: boolean }, ctx: Context) {
    ctx.callbackWaitsForEmptyEventLoop = false;
    const { isWarmer = false } = event;

    if (isWarmer) {
        return getDefaultResponse();
    }

    const result = await createPDF(event);

    return result;
}

async function createPDFWithUploadHandler(event: APIGatewayEvent & { isWarmer?: boolean }, ctx: Context) {
    ctx.callbackWaitsForEmptyEventLoop = false;
    const { isWarmer = false } = event;

    if (isWarmer) {
        return getDefaultResponse();
    }

    const result = await createPDFWithUpload(event);

    return result;
}

export {
    createPDFHandler,
    createPDFWithUploadHandler
};