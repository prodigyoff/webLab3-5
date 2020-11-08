export const DEFAULT_URL = 'http://127.0.0.1:8000'
export const RESOURCE_URL = `${DEFAULT_URL}/dishes`

export function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
  };

const id = getUrlVars()["id"]

const baseRequest = async ({ urlPath = '', method = 'GET', body = null }) => {

    try {
        const requestParams = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        if (body) {
            requestParams.body = JSON.stringify(body)
        }

        return await fetch(`${RESOURCE_URL}${urlPath}`, requestParams);
    } catch (error) {

    }
}

export const getAllDishes = async () => {
    const rawResp = await baseRequest({method: "GET"});
    return rawResp.json();
}

export const getSingleDish = async () => {
    const rawResp = await baseRequest({urlPath: `/${id}`, method: "GET"})
    return rawResp.json();
}

export const postDish = (body) => baseRequest({ method: "POST", body});

export const editDish = (id, body) => baseRequest({urlPath: `/${id}`, method: "PUT", body})

export const deleteDish = (id) => baseRequest({urlPath: `/${id}`, method: "DELETE"})