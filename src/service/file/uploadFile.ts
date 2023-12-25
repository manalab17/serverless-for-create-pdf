import axios from "axios";
import {UploadFileParams} from "../../type/service";

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

    let filePath = '';

    //  Upload to S3
    await axios.post(uploadUrl, formData, {
        headers: {
            "Content-Type": "application/pdf",
            "Authorization": ""
        },
        withCredentials: false
    }).then((res) => {
        const { data } = res;
        const {fields: {key = ''} } = data;

        filePath = key;
    }).catch((e: any) => {
        console.error('Failed to uploadFile : ', e.message);
        throw new Error();
    });

    return {
        uploadUrl,
        filePath,
    };
}