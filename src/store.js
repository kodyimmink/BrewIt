import {getLocation, getLocalBreweriesList, getUserFavoritesFromDb, getUserDocumentId} from './API';

const SET_INITIAL_POSITION = 'SET_INITIAL_POSITION';
const SET_BREWERIES_LIST = 'SET_BREWERIES_LIST';
const SET_MAP_CENTER = 'SET_MAP_POSITION';
const SET_FOCUSED_BREWERY = 'SET_FOCUSED_BREWERY';
const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';
const CLEAR_USER_ACCOUNT = 'CLEAR_USER_ACCOUNT';
const GET_USER_FAVORITES = 'GET_USER_FAVORITES';
const GET_USER_DOC_ID = 'GET_USER_DOC_ID';

const initialState = {
    location: {
        lat: 42.9918511,
        lng: -83.6194481,
    },
    mapCenter: {
        lat: 0,
        lng: 0,
    },
    haveUsersLocation: false,
    zoom: 2,
    localBreweriesList: [],
    brewery: {},
    user: null,
    favoriteBreweries: [],
    userDocId: null
};

export const actions = {
    setInitialPosition(){
        return{
            type: SET_INITIAL_POSITION,
            payload: getLocation(),
        }
    },
    setMapCenter(newMapCenter){
        return{
            type: SET_MAP_CENTER,
            payload: newMapCenter,
        }
    },
    setBreweriesList(coords){
        return {
            type: SET_BREWERIES_LIST,
            payload: getLocalBreweriesList(coords),
        }
    },
    setFocusedBrewery(brewery){
        return {
            type: SET_FOCUSED_BREWERY,
            payload: brewery,
        }
    },
    setUserAccount(account){
        return {
            type: SET_USER_ACCOUNT,
            payload: account,
        }
    },
    clearUserAccount(){
        return {
            type: CLEAR_USER_ACCOUNT,
            payload: null,
        }
    },
    getUserFavorites(uid){
        return {
            type: GET_USER_FAVORITES,
            payload: getUserFavoritesFromDb(uid),
        }
    },
    getUserDocId(uid){
        //getUserDocumentId(uid).then(data => console.log(data));
        return {
            type: GET_USER_DOC_ID,
            payload: getUserDocumentId(uid),
        }
    }
};


export function reducer(state = initialState, action){
    switch(action.type){
        case SET_INITIAL_POSITION: {
            return {
                ...state,
                location: action.payload,
                zoom: 8,
                haveUsersLocation: true
            }
        }
        case SET_MAP_CENTER: {
            return {
                ...state,
                mapCenter: action.payload
            }
        }
        case SET_BREWERIES_LIST: {
            return {
                ...state,
                localBreweriesList: action.payload
            }
        }
        case SET_FOCUSED_BREWERY: {
            return {
                ...state,
                brewery: action.payload
            }
        }
        case SET_USER_ACCOUNT: {
            return {
                ...state,
                user: action.payload
            }
        }
        case CLEAR_USER_ACCOUNT: {
            return {
                ...state,
                user: action.payload
            }
        }
        case GET_USER_FAVORITES: {
            console.log("REDUCER VALUE: " + action.payload);
            return {
                ...state,
                favoriteBreweries: action.payload
            }
        }
        case GET_USER_DOC_ID: {

            return {
                ...state,
                userDocId: action.payload
            }
        }
        default:
            return state;
    }
    
}
