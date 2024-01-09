import {formatAPIGatewayProxyResult, getDefaultResponse} from "../common/response";
import {APIGatewayEvent} from "aws-lambda";
import {CreatePDFWithUploadParams} from "../type/api";
import {createPDFFromHTMLText} from "../service/pdf/createPDFFromHTMLText";
import {uploadFile} from "../service/file/uploadFile";

export async function createPDFWithUpload(event: APIGatewayEvent) {
    try {
        const {body} = event;
        const parsedParams: CreatePDFWithUploadParams = (body ? JSON.parse(body) : {});

        const {
            htmlContent,
            pdfOptions,
            uploadUrl,
            uploadParams = {}
        } = parsedParams;

        if (!htmlContent) {
            throw new Error('Content parameter doesn\'t exist.');
        }

        if (!uploadUrl) {
            throw new Error('Upload parameter doesn\'t exist.');
        }

        const buffer = await createPDFFromHTMLText(htmlContent, pdfOptions);
        const result = await uploadFile({
            fileBuffer: buffer,
            uploadUrl,
            uploadParams,
        });

        return formatAPIGatewayProxyResult({
            status: "success",
            statusCode: 201,
            message: "Create PDF file successfully.",
            data: result
        });
    } catch (e) {
        console.error('Failed to createPDFWithUpload : ', e.message);

        return getDefaultResponse({
            statusCode: 400,
            message: "Failed to create PDF file and upload file."
        });
    }
}