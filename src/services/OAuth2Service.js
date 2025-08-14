import authClientAxiosConfig from "../api/authClientAxiosConfig.js";

class OAuth2Service{
    static API_BASE_URL = "http://localhost:8080/api";

    static loginWithOAuth2(provider, redirectUri){
        let oauth2Url = `${this.API_BASE_URL}/oauth2/authorize/${provider}`;

        if(redirectUri){
            oauth2Url += `?redirectUri=${encodeURIComponent(redirectUri)}`;
        }

        window.location.href = oauth2Url;
    }

    static handleOAuth2Callback(){
        const urlParams = new URLSearchParams(window.location.search);
        const oauth2Url = urlParams.get("oauth2Url");
        const error = urlParams.get("message");

        if(oauth2Url === 'success'){
            return Promise.resolve({success: true});
        }else if(oauth2Url === 'error'){
            return Promise.resolve({success: false, error: error || 'OAuth Login Failed'});
        }
        return Promise.resolve({success: false});
    }
}
export default OAuth2Service;