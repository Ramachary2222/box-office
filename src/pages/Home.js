import React, { useState } from 'react'
import MainPageLayout from '../Components/MainPageLayout'

function Home() {

    const [input, setInput] = useState("");

    const OnInputChange = (ev) => {
        setInput(ev.target.value);
    }
    const OnSearch = (ev) => {
        fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then(r => r.json()).then(result => {
            console.log(result);
        })

    }
    const OnKeyDown = (ev) => {
        if (ev.keyCode === 13) {
            OnSearch();
        }

    }

    return (
        <MainPageLayout>
            <input type="text" onChange={OnInputChange} value={input} />
            <button type='button' onClick={OnSearch} onKeyDown={OnKeyDown}>Search</button>
        </MainPageLayout>
    )
}

export default Home