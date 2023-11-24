import "./App.css";
import Header from "./Header";
import SearchBarWord from "./SearchBarWord";
import WordCard from "./WordCard";

function App() {
    return (
        <div className="App">
            <Header />
            <SearchBarWord />

            <WordCard />
        </div>
    );
}

export default App;
