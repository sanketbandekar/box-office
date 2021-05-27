import React,{ useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config'

const reducer = (prevState, action) => {

    switch (action.type) {
        case 'FETCH_SUCCESS':{
            return {...prevState, isLoading: false, error: null, show: action.show}
        }

        case 'FETCH_FAILED' :{
            return{...prevState , isLoading:false, error : action.error}
        }
            
            
    
        default: return prevState;
    }
}

const intitialState = {
    show: null,
    isLoading: true,
    error: null
}

const Show = () => {

    const {id} = useParams();

    const[{show, isLoading, error}, dispatch] =useReducer(reducer,intitialState)
    
    // const [show, setShow] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect( () => {

        let isMounted = true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then( (results) =>{

            if(isMounted){
                dispatch({ type: 'FETCH_SUCCESS', show: results })
            }
        } ).catch( err => {
            if(isMounted){
                dispatch({ type: 'FETCH_Failed', error: err.message })
            }
        });

        return ( () => {
            isMounted = false;
        } )
    }, [id] )

     console.log('show', show);

    if(isLoading){
        return <div>Div is loading</div>
    }

    if(error){
        return <div>
            {error}
        </div>
    }


        return (
            <div>
                {id}
            </div>
        )
    }

export default Show
