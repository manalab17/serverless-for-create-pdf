import {APIGatewayProxyResult} from "aws-lambda";

export function getDefaultResponse(responseBodyParams: any = {}): APIGatewayProxyResult  {
    const responseBody = {
        statusCode: 500,
        status: "fail",
        ...responseBodyParams,
    };

    return formatAPIGatewayProxyResult(responseBody);
}

export function formatAPIGatewayProxyResult(responseBody: any): APIGatewayProxyResult {
    const { statusCode } = responseBody;

    return {
        statusCode,
        body: JSON.stringify(responseBody),
    };
}