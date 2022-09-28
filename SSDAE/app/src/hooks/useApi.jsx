export const useApi = () => {

    const request = async(body) => {

        const url = "http:///localhost:3000/user/validation";
        
        let req = await fetch(url, {
            method: "POST",
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

