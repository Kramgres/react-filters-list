import React, {Component} from 'react';
import {filterByDomains, filterByName, getComments} from "../../redux/comment-reducer";
import {connect} from "react-redux";
import Comments from "./Comments";
import {withRouter} from "react-router";
import {compose} from "redux";

class CommentsContainer extends Component {
    componentDidMount() {
        this.props.getComments().then(() => {
            const searchParams = this.props.location.search;
            const search = new URLSearchParams(searchParams).get("search");
            const domains = new URLSearchParams(searchParams).getAll("domain");
            if(search){
                this.props.filterByName(search);
            }
            if(domains){
                this.props.filterByDomains(domains);
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.searchText !== this.props.searchText || this.props.filteredByDomainsLength !== prevProps.filteredByDomainsLength) {
            const params = new URLSearchParams();
            if(this.props.searchText){
                params.append("search", this.props.searchText);
            }
            if(this.props.filteredByDomains.length > 0){
                this.props.filteredByDomains.forEach(d => {
                    params.append("domain", d)
                })
            }
            this.props.history.push({search: params.toString()})
        }
    }

    render() {
        return (
            <Comments filteredComments={this.props.filteredComments}
                      domains={this.props.domains}
                      filteredByDomains={this.props.filteredByDomains}
                      searchText={this.props.searchText}
                      domainFilter={this.props.domainFilter}
                      isFetching={this.props.isFetching}
                      filterByName={this.props.filterByName}
                      filterByDomains={this.props.filterByDomains}/>
        );
    }
}

let mapStateToProps = (state) => ({
    filteredComments: state.commentsPage.filteredComments,
    domains: state.commentsPage.domains,
    filteredByDomains: state.commentsPage.filteredByDomains,
    filteredByDomainsLength: state.commentsPage.filteredByDomainsLength,
    searchText: state.commentsPage.searchText,
    domainFilter: state.commentsPage.domainFilter,
    isFetching: state.commentsPage.isFetching
})

export default compose(
    connect(mapStateToProps, {getComments, filterByName, filterByDomains}),
    withRouter
)(CommentsContainer);