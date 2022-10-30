import React, { useState } from 'react';
import ActorGrid from '../Components/Actors/ActorGrid';
import CustomRadio from '../Components/CustomRadio';
import MainPageLayout from '../Components/MainPageLayout';
import ShowGrid from '../Components/shows/ShowGrid';
import { apiGet } from "../misc/config";
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchInput, SearchButtonWrapper } from './Home.styled';


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
            <SearchInput type="text"
                onChange={OnInputChange}
                value={input} onKeyDown={OnKeyDown} />

            <RadioInputsWrapper>
                <div>
                    <CustomRadio
                        label="Shows"
                        id="show-search"
                        value="shows"
                        onChange={onRadioChange}
                        checked={isSearchshow}
                    />
                </div>
                <div>
                    <CustomRadio
                        label="Actors"
                        id="actor-search"
                        value="people"
                        onChange={onRadioChange}
                        checked={!isSearchshow}
                    />
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type='button'
                    onClick={OnSearch}
                >Search</button>
            </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home