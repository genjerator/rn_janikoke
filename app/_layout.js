import {Stack} from "expo-router";
import {ChallengesProvider} from "../context/ChallengesContext";
import {ResultsProvider} from "../context/ResultsContext";


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
