export const useApi = () => {

    const request = async(url, method, body) => {
        
        let req = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        let res = await req.json();
        return res;
    }

    return {request};
}

