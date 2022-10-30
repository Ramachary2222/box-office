/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from "react-router-dom";
import { apiGet } from '../misc/config';
import Cast from './shows/Cast';
import Details from './shows/Details';
import Seasons from './shows/Seasons';
import ShowMainData from './shows/ShowMainData';
import { InfoBlock, ShowPageWrapper } from '../pages/Show.styled';
import { useShow } from '../misc/custom-hooks';

function Show() {

    const { id } = useParams();

    const { show, isLoading, error } = useShow(id);

    if (isLoading) {
        return <div>
            Data is being loaded
        </div>
    }
    if (error) {
        return <div>
            Error Occured: Oops!!!
        </div>
    }
    return <ShowPageWrapper>

        <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres} />

        <InfoBlock>
            <h2>Details</h2>
            <Details status={show.status} network={show.network} premeired={show.premeired} />
        </InfoBlock>

        <InfoBlock>
            <h2>Seasons</h2>
            <Seasons seasons={show._embedded.seasons} />
        </InfoBlock>

        <InfoBlock>
            <h2>Cast</h2>
            <Cast cast={show._embedded.cast} />
        </InfoBlock>

    </ShowPageWrapper>;

}

export default Show