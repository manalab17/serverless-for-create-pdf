export type CreatePDFParams = {
    htmlContent: string;
}

export type CreatePDFWithUploadParams = CreatePDFParams & {
    uploadUrl: string;
    uploadParams?: { [key: string]: string };
}
