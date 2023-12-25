export type CreatePDFParams = {
    htmlContent: string;
}

export type CreatePDFWithUploadParams = CreatePDFParams & {
    fileName: string;
    uploadUrl: string;
}
