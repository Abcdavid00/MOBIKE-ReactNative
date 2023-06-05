const schema = "https";
const host = "mobike.ddns.net";
const port = null;

const retryInterval = 100;
const retryLimit = 10;

enum HTTPResultStatus {
    Completed = 1,
    Failed = 2,
}

type HTTPResult = {
    status: HTTPResultStatus,
    
}

function GenerateURL(path: string): string {
    if (!port)
        return `${schema}://${host}/${path}`;
    return `${schema}://${host}:${port}/${path}`;
}

async function ProcessResponse(response: Response): Promise<string|Object> {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
    } else {
        return await response.text();
    }
}

// export async function Get(path: string)): Promise<any> {

// }

async function GetHelper(URL: string, retry: number): Promise<any> {
    if (retry > retryLimit) {
        throw new Error("Retry limit exceeded");
    }
    console.log(`Get request (retry ${retry}): ${URL}`)
    try {
        const response = await fetch(URL, {
            method: "GET",
        });
        return await response.json();
    } catch (error) {

    }
}