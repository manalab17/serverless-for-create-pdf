import axios from "axios";
import {UploadFileParams} from "../../type/service";

const FormData = require('form-data');

export async function uploadFile(params: UploadFileParams) {
    const {
        fileBuffer,
        uploadUrl,
        uploadParams,
    } = params;
    const formData = new FormData();

    Object.keys(uploadParams).forEach((key) => {
        formData.append(key, uploadParams[key]);
    });

    formData.append("file", fileBuffer);

    //  Upload to S3
    await axios.post(uploadUrl, formData, {
        headers: {
            "Content-Type": "application/pdf",
            "Authorization": ""
        },
        withCredentials: false
    }).catch((e: any) => {
        console.error('Failed to uploadFile : ', e.message);
        throw new Error();
    });

    return {
        uploadUrl,
        filePath: uploadParams["key"],
    };
}