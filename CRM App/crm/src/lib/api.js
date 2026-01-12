const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7777/crm/api/v1';

/**
 * apiRequest is a helper function to standardize all fetch calls.
 * It automatically handles the headers and stringifying the body.
 */

async function apiRequest(endpoint, options = {}){

    // 1. Get the token from localStorage ( saved during login ).
    // If first SignUp the token = null from this equation
    const token = typeof window !== 'undefined'? localStorage.getItem('accessToken'): null;

    // 2. Setup default headers
    const headers = {
        'Content-type': 'application/json', // telling that whatever is passed in headers will be in json format 
        ...options.headers
    }

    // 3. If token exists, add it to the custom header your backend expects.
    if(token){
        headers['x-access-token'] = token
        // Why x-acces-token -- Because in backend I have written x-access-token while authorizing through middleware
        // any other name could also come here -- but should be same as backend....
    }

    // Wrap everything inside the config object--because fetch object need methods, body, headers all at once in one place so combining in config
    const config = {
        ...options,
        headers
    }

    // 4. If there is a body then stringify it -- because fetch only takes body as string and not as object.
    if(options.body && typeof options.body === 'object'){
        config.body = JSON.stringify(options.body)
    }

    try{
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        // Handle unauthenticate 401 or 403 errors globally
        if(response.status == 401 || response.status == 403){
            if(typeof window !== 'undefined'){
                localStorage.removeItem('accessToken');
                window.location.href = '/login'
            }
        }

        // Converting the data to JavaScript object -- parsing from JSON to JS Object
        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Something went wrong")
        }

        return data;

    }catch(error){
        console.log("API request failed", error.message);
        throw error;
    }
}

export default apiRequest;
