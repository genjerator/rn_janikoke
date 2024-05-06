import {Stack} from "expo-router";
import {ChallengesProvider} from "../context/ChallengesContext";


const Layout = () => {

    return (
            <ChallengesProvider>
                <Stack/>
            </ChallengesProvider>
    );
}

export default Layout;
