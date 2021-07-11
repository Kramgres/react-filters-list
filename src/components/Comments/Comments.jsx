import React from 'react';
import Search from "../common/Search";
import Filter from "../common/Filter";
import Comment from "./Comment";
import Preloader from "../common/Preloader";


function Comments(props) {
    let comments;
    if(props.filteredComments){
        comments = props.filteredComments.map(c =>
            (<div key={c.id} className="comments-list__comment"><Comment id={c.id}
                                                                         name={c.name}
                                                                         email={c.email}
                                                                         body={c.body}/></div>))
    }
    else{
        comments = "Ошибка получения комментариев"
    }

    return (
        <div className="comments">
            <div className="top-filters">
                <div className="container">
                    <div className="top-filters__wrapper">
                        <div className="top-filters__search">
                            <Search search={props.filterByName} searchText={props.searchText}/>
                        </div>
                        <div className="top-filters__filter">
                            <Filter filter={props.filterByDomains} values={props.domains} activeValues={props.filteredByDomains}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="comments-list-wrapper">
                <div className="container">
                    {props.isFetching ?
                        <Preloader/> :
                        <ul className="comments-list">
                            {comments}
                        </ul>
                    }
                </div>
            </div>
        </div>

    );
}

export default Comments;