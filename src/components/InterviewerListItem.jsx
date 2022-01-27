import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = (props) => {

    const interviewerClass = classNames({
        "interviewers__item--selected": props.selected
    });

    return (
        <li className={interviewerClass} onClick={() => {console.log(props.interviewer); props.setInterviewer(props.interviewer)}}>
                
            <img
                className="interviewers__item-image"
                src={props.avatar}
                alt={props.name}
            />
            {props.selected && props.name}
        </li>
    );
}

export default InterviewerListItem;