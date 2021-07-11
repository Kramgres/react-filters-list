import {commentsAPI} from "../api/api";

const SET_COMMENTS = 'SET_COMMENTS',
    TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
    FILTER_BY_NAME = 'FILTER_BY_NAME',
    FILTER_BY_DOMAINS = 'FILTER_BY_DOMAINS'

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
        case FILTER_BY_NAME:
        {
            let value = action.name;
            let filteredValues = state.filteredComments.filter(comment => {
                return comment.name.toLowerCase().startsWith(value)
            });
            return {
                ...state,
                searchText: action.name,
                filteredComments: filteredValues
            }
        }
        case FILTER_BY_DOMAINS:
        {
            let values = action.domains;
            let domains = state.filteredByDomains;
            let filteredValues = [];
            values.forEach(v => {
                if(domains.includes(v)){
                    domains.splice(domains.indexOf(v), 1);
                }
                else{
                    domains.push(v);
                }
            })

            if(domains.length >= 1){
                filteredValues = state.filteredComments.filter(comment => {
                    return domains.some(d => comment.email.toLowerCase().endsWith(d))
                });
            }
            else{
                filteredValues = state.comments;
            }
            return {
                ...state,
                filteredByDomains: domains,
                filteredByDomainsLength: domains.length,
                filteredComments: filteredValues
            }
        }
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export const setComments = (comments) => ({type: SET_COMMENTS, comments});
export const filterByNameSuccess = (name) => ({type: FILTER_BY_NAME, name});
export const filterByDomainsSuccess = (domains) => ({type: FILTER_BY_DOMAINS, domains});
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
        dispatch(filterByNameSuccess(value));
    }
}

export const filterByDomains = (domains) => {
    return (dispatch) => {
        dispatch(filterByDomainsSuccess([].concat(domains)));
    }
}

export default commentsReducer;