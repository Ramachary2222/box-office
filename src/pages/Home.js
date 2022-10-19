import React, { useState } from 'react';
import MainPageLayout from '../Components/MainPageLayout';
import { apiGet } from "../misc/config";


function Home() {

    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);

    const OnInputChange = (ev) => {
        setInput(ev.target.value);
    }
    const OnSearch = () => {
        apiGet(`/search/shows?q=${input}`).then(result => {
            setResults(result);
        })

    }
    const OnKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            OnSearch();
        }

    }
    const renderResults = () => {
        if (results && results.length === 0) {
            return (<div>
                No Results
            </div>)
        }
        if (results && results.length > 0) {
            return (<div>
                {results.map((item) => (
                    <div key={item.show.id}>{item.show.name}</div>
                ))}

            </div>);
        }
        return null;
    }
    return (
        <MainPageLayout>
            <input type="text"
                onChange={OnInputChange}
                value={input} onKeyDown={OnKeyDown} />
            <button type='button'
                onClick={OnSearch}
            >Search</button>

            {renderResults()}
        </MainPageLayout>
    )
}

export default Home