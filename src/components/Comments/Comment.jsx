import React from 'react';

function Comment(props) {
    return (
        <li className="comment">
            <div className="comment__name">{props.name}</div>
            <div className="comment__email">{props.email}</div>
            <div className="comment__body">{props.body}</div>
        </li>
    );
}

export default Comment;