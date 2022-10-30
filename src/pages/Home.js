import React, { useState } from 'react';
import ActorGrid from '../Components/Actors/ActorGrid';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/shows/ShowGrid';
import { apiGet } from "../misc/config";
import { useLastQuery } from '../misc/custom-hooks';


function Home() {

    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searchOption, setsearchOptions] = useState('shows');

    const isSearchshow = searchOption === 'shows';


    const OnInputChange = (ev) => {
        setInput(ev.target.value);
    }
    const OnSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
        })

    }
    const onRadioChange = (ev) => {
        setsearchOptions(ev.target.value);

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
            return results[0].show ?
                <ShowGrid data={results} /> :
                <ActorGrid data={results} />;
        }
        return null;
    }
    return (
        <MainPageLayout>
            <input type="text"
                onChange={OnInputChange}
                value={input} onKeyDown={OnKeyDown} />

            <div>
                <label htmlFor='show-search'>
                    Shows
                    <input id="show-search"
                        type="radio"
                        value="shows"
                        onChange={onRadioChange}
                        checked={isSearchshow} />
                </label>
                <label htmlFor='actor-search'>
                    People
                    <input id="actor-search"
                        type="radio"
                        value="people"
                        onChange={onRadioChange}
                        checked={!isSearchshow} />
                </label>
            </div>

            <button type='button'
                onClick={OnSearch}
            >Search</button>

            {renderResults()}
        </MainPageLayout>
    )
}

export default Home