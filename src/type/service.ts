
export type UploadFileParams = {
    uploadUrl: string;
    fileBuffer: Buffer;
    uploadParams: { [key: string]: string };
}