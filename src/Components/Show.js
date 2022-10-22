import React, { useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";
import { apiGet } from '../misc/config';



const initialState = {
    show: null,
    isLoading: true,
    error: null
}

const reducer = (prevState, action) => {

    switch (action.type) {

        case 'FETCH_SUCCESS': {

            return { isLoading: false, show: action.show, error: null }
        }

        case 'FETCH_FAILED': {

            return { ...prevState, error: action.error, isLoading: false, show: null }
        }


        default: return prevState
    }



}

function Show() {

    const { id } = useParams();

    const [{ show, isLoading, error }, dispatch] = useReducer(reducer, initialState)

    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);


    useEffect(() => {

        let isMount = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {

            if (isMount) {

                dispatch({ type: 'FETCH_SUCCESS', show: results });
            }

        }).catch(err => {
            if (isMount) {
                dispatch({ type: 'FETCH_FAILED', error: err.message });
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