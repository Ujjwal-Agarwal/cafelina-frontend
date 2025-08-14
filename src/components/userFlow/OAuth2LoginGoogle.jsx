import {Button} from "@mui/joy";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import OAuth2Service from "../../services/OAuth2Service.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const OAuth2LoginGoogle = ()=> {
    // const [loading,setLoading] = useState(false);
    // const[error,setError] = useState("");
    const provider = 'GOOGLE';
    function handleOAuth2Login(){
        // setLoading(true);
        // setError('');
        OAuth2Service.loginWithOAuth2(provider,window.location.origin);
    }
    return(
        <Button
            color="danger"
            onClick={handleOAuth2Login}
            size="lg"
            variant="solid"
            // loading={loading}
            startDecorator={<FontAwesomeIcon icon={faGoogle} />}
        >Login with Google</Button>
    );
}

export default OAuth2LoginGoogle;