import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { apiGet } from '../misc/config';


function Show() {

    const { id } = useParams();

    const [show, setShow] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        let isMount = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {

            if (isMount) {
                setShow(results);
                setIsLoading(false);
            }

        }).catch(err => {
            if (isMount) {
                setError(err.message);
                setIsLoading(false);
            }
        });
        return (() => {
            isMount = false
        })
    }, [id]);



    console.log('show', show);

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
    return <div>Show</div>;

}

export default Show