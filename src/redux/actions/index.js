import * as ActionTypes from '../action_types';
import axios from 'axios';

export const receivePlaces = (places) => ({
    type: ActionTypes.RECEIVE_PLACES,
    places
});

export const setFetchPlaceStatus = (type, loading, error) => ({
    type,
    loading,
    error
});

//Async Action
export const fetchPlaces = (location) => 
    // returns a dispatcher
    (dispatch) => { 
        dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_LOADING , true, ''));
        return axios.get(`/api/places/?location=${location}`)
        .then((response) => {
            const result = response.data;
            if (result.success){
                const data = result.data;
                dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_SUCCESS, false, ''));
                dispatch(receivePlaces(data));
            }
        })
        .catch((error) => {
            console.log("Error: ", error);
            dispatch(setFetchPlaceStatus(ActionTypes.FETCH_PLACES_FAIL, false, error));
            throw (error);
        })
    }

 
export const setRandomPlaceIndex = (index) => ({
    type: ActionTypes.SET_RANDOM_PLACE_INDEX,
    index
});

export const setLocation = (location) => ({
    type: ActionTypes.SET_LOCATION,
    location
});