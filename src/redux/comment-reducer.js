import {commentsAPI} from "../api/api";

const SET_COMMENTS = 'SET_COMMENTS',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
    SET_NAME = 'SET_NAME',
    SET_DOMAINS = 'SET_DOMAINS',
    FILTER_COMMENTS = 'FILTER_COMMENTS'

let initialState = {
    comments: [
        {
            postId: null,
            id: null,
            name: "",
            email: "",
            body: ""
        }
    ],
    filteredComments: [],
    domains: [".org", ".com", ".biz"],
    filteredByDomains: [],
    filteredByDomainsLength: 0,
    searchText: "",
    domainFilter: null,
    isFetching: null
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.comments,
                filteredComments: action.comments
            }
        case SET_NAME:
        {
            return {
                ...state,
                searchText: action.name,
            }
        }
        case SET_DOMAINS:
        {
            let values = action.domains;
            let domains = state.filteredByDomains;
            values.forEach(v => {
                if(domains.includes(v)){
                    domains.splice(domains.indexOf(v), 1);
                }
                else{
                    domains.push(v);
                }
            })
            return {
                ...state,
                filteredByDomains: domains,
                filteredByDomainsLength: domains.length,
            }
        }
        case FILTER_COMMENTS:
            //filter by name
            let filteredValues = state.comments.filter(comment => {
                return comment.name.toLowerCase().startsWith(state.searchText)
            });
            //filter by domains
            if(state.filteredByDomains.length >= 1){
                filteredValues = filteredValues.filter(comment => {
                    return state.filteredByDomains.some(d => comment.email.toLowerCase().endsWith(d))
                });
            }
            return {
                ...state,
                filteredComments: filteredValues
            }
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export const setComments = (comments) => ({type: SET_COMMENTS, comments});
export const setName = (name) => ({type: SET_NAME, name});
export const setDomains = (domains) => ({type: SET_DOMAINS, domains});
export const filterComments = () => ({type: FILTER_COMMENTS});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const getComments = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        return commentsAPI.getComments().then(data => {
            dispatch(setComments(data));
            dispatch(toggleIsFetching(false));
        })
    }
}

export const filterByName = (value) => {
    return (dispatch) => {
        dispatch(setName(value));
        dispatch(filterComments());
    }
}

export const filterByDomains = (domains) => {
    return (dispatch) => {
        dispatch(setDomains([].concat(domains)));
        dispatch(filterComments());
    }
}

export default commentsReducer;