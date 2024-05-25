import {Stack} from "expo-router";
import {ChallengesProvider} from "../context/ChallengesContext";
import {ResultsProvider} from "../context/ResultsContext";
import 'expo-dev-client';


const Layout = () => {

    return (
        <ResultsProvider>
            <ChallengesProvider>
                <Stack/>
            </ChallengesProvider>
        </ResultsProvider>
    );
}

export default Layout;
