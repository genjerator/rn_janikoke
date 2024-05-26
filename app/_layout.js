import {Stack} from "expo-router";
import {ChallengesProvider} from "../context/ChallengesContext";
import {ResultsProvider} from "../context/ResultsContext";
import {UserProvider} from "../context/UserContext";


const Layout = () => {

    return (
        <ResultsProvider>
            <ChallengesProvider>
                <UserProvider>
                    <Stack/>
                </UserProvider>
            </ChallengesProvider>
        </ResultsProvider>
    );
}

export default Layout;
