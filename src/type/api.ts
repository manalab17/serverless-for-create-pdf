import {PaperFormat} from "puppeteer-core";

export type CreatePDFParams = {
    htmlContent: string;
    pdfOptions?: {
        margin?: {
            top: string;
            left: string;
            right: string;
            bottom: string;
        };
        scale?: number;
        format?: PaperFormat;
    };
}

export type CreatePDFWithUploadParams = CreatePDFParams & {
    uploadUrl: string;
    uploadParams?: { [key: string]: string };
}
