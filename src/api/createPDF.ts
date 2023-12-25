import {APIGatewayEvent} from "aws-lambda";
import {formatAPIGatewayProxyResult, getDefaultResponse} from "../common/response";
import {createPDFFromHTMLText} from "../service/pdf/createPDFFromHTMLText";
import {CreatePDFParams} from "../type/api";

export async function createPDF(event: APIGatewayEvent) {
    try {
        const { body } = event;
        const parsedParams: CreatePDFParams = (body ? JSON.parse(body) : {});

        const { htmlContent } = parsedParams;

        if (!htmlContent) {
            throw new Error('Parameter doesn\'t exist.');
        }

        const buffer = await createPDFFromHTMLText(htmlContent);
        const formattedBuffer = buffer.toString('base64');

        return formatAPIGatewayProxyResult({
            status: "success",
            statusCode: 201,
            message: "Create PDF file successfully.",
            data: { fileBuffer: formattedBuffer }
        });
    } catch (e: any) {
        console.error('Failed to createPDF : ', e.message);

        return getDefaultResponse({
            statusCode: 400,
            message: "Failed to create PDF file."
        });
    }
}