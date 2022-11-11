export const useApi = () => {

    const request = async (url, method, body, file = false) => {


        let req;

        if (file) {
            req = await fetch(url, {
                method: method,
                body
            });

        } else {
            req = await fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });

        }


        let res = await req.json();
        return res;
    }

    return { request };
}

