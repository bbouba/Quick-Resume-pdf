
//  Methode for differents endpoits and methods
export default class UserProvider {
    static async postUser(data, link, img, accessToken) {
        return await fetchRequest("POST", link, data, img, accessToken);
    }
    static async getUser(link, img, accessToken) {
        return await fetchRequest("GET", link, {}, img, accessToken);
    }
    static async updateUser(link, data, img, accessToken) {
        return await fetchRequest("PUT", link, data, img, accessToken);
    }
}

// this is our server and port address
const API_URL = "http://localhost:5000/";

async function fetchRequest(method, endpoint, body = {}, img, accessToken = "") {
    const params = { method, headers: {} };
    if (accessToken) {
        params.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (Object.keys(body).length > 0) {
        params.headers["Content-Type"] = "application/json; charset=utf-8";
        params.body = JSON.stringify(body);
    }
    if(img){
        params.body = body;
    }
    const res = await fetch(API_URL + endpoint, params);
    const json = await res.json()
    if (!json.success) {
      console.log(json.error);
    }
    return json;
}
