import {getLocation, getLocalBreweriesList, getUserFavoritesFromDb, updateUserFavoritesInDb, removeFavoriteBreweryInDb, getUserDocumentId} from './API';

const SET_INITIAL_POSITION = 'SET_INITIAL_POSITION';
const SET_BREWERIES_LIST = 'SET_BREWERIES_LIST';
const SET_MAP_CENTER = 'SET_MAP_POSITION';
const SET_FOCUSED_BREWERY = 'SET_FOCUSED_BREWERY';
const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';
const CLEAR_USER_ACCOUNT = 'CLEAR_USER_ACCOUNT';
const GET_USER_FAVORITES = 'GET_USER_FAVORITES';
const UPDATE_USER_FAVORITES = 'UPDATE_USER_FAVORITES';
const GET_USER_DOC_ID = 'GET_USER_DOC_ID';
const REMOVE_FAVORITE_BREWERY = 'REMOVE_FAVORITE_BREWERY';

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
    haveUserFavorites: false,
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
    getUserFavorites(docId){
        return {
            type: GET_USER_FAVORITES,
            payload: getUserFavoritesFromDb(docId),
        }
    },
    getUserDocId(uid){
        return {
            type: GET_USER_DOC_ID,
            payload:getUserDocumentId(uid)
        }
    },
    updateUserFavorites(docId, brewery){
        return {
            type: UPDATE_USER_FAVORITES,
            payload: updateUserFavoritesInDb(docId, brewery),
        }
    },
    removeFavoriteBrewery(docId, brewery){
        return {
            type: REMOVE_FAVORITE_BREWERY,
            payload: removeFavoriteBreweryInDb(docId, brewery),
        }
    }
};

export function reducer(state = initialState, action){
    switch(action.type){
        case SET_INITIAL_POSITION+'_FULFILLED': {
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
        case SET_BREWERIES_LIST+'_FULFILLED': {
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
                localBreweriesList: [],
                brewery: {},
                user: null,
                favoriteBreweries: [],
                userDocId: null,
                haveUserFavorites: false,
            }
        }
        case GET_USER_DOC_ID+'_FULFILLED': {
            return {
                ...state,
                userDocId: action.payload
            }
        }
        case GET_USER_FAVORITES+'_FULFILLED': {
            return {
                ...state,
                favoriteBreweries: action.payload,
                haveUserFavorites: true,
            }
        }
        case REMOVE_FAVORITE_BREWERY+'_FULFILLED': {
            return {
                ...state,
                favoriteBreweries: action.payload
            }
        }
        case UPDATE_USER_FAVORITES+'_FULFILLED': {
            return {
                ...state,
                favoriteBreweries: action.payload
            }
        }
        default:
            return state;
    }
    
}
