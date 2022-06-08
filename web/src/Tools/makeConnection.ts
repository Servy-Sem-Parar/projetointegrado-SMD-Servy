import axios, { AxiosInstance } from "axios"

interface IMakeConnectionProps {
    method: "get" | "post" | "put" | "delete",
    suffix: string,
    entityId?: string,
    body?: Record<string, unknown>,
    otherQueryStrings?: Record<string, unknown>,
}

export async function makeConnection(props: IMakeConnectionProps) {
    const api = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_URL,//"http://localhost:4000",
        headers: generateHeader(),
    });
    const url = buildUrl(props.suffix, props.entityId, props.otherQueryStrings);
    const body = props.body ? props.body : {};
    const response = await connectToServer(api, url, props.method, body);

    return response;
}

function generateHeader() {
    const headers: Record<string, string> = {}
    const token = localStorage.getItem("token")

    if(token) {
        headers.authorization = token
    }

    return headers;
}

function buildUrl(
    suffix: string,
    entityId?: string,
    otherQueryStrings?: Record<string, unknown>,
) {
    let url = suffix;
    if(entityId) {
        url = `${url}/${entityId}`
    }
    if(otherQueryStrings){
        url = url+"?"
        Object.keys(otherQueryStrings).forEach((key, index)=>{
            url = `${url}${key}=${otherQueryStrings[key]}`
            if(index+1 <= Object.keys(otherQueryStrings).length-1) {
                url = url+"&"
            }
        })
    }

    return url;
}

async function connectToServer(api: AxiosInstance, url: string, method: string, body?: Record<string, unknown>) {
    let response;
    switch(method) {
        case "get":
            response = await _get(api, url, body)
            break;
        case "post":
            response = await _post(api, url, body)
            break;
        case "put":
            response = await _put(api, url, body)
            break;
        case "delete":
            response = await _delete(api, url, body)
            break;
    }

    return response;
}

async function _get(api: AxiosInstance, url: string,  body?: Record<string, unknown>) {
    const response = await api.get(url, body);
    return response;
}

async function _post(api: AxiosInstance, url: string,  body?: Record<string, unknown>) {
    const response = await api.post(url, body);
    return response;
}

async function _put(api: AxiosInstance, url: string,  body?: Record<string, unknown>) {
    const response = await api.put(url, body);
    return response;
}

async function _delete(api: AxiosInstance, url: string,  body?: Record<string, unknown>) {
    const response = await api.delete(url, body);
    return response;
}
