import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";


const InterviewerListItem = (props) => {

    const interviewerClass = classNames({
        "interviewers__item--selected": props.selected
    });

    return (
        <l1 className={interviewerClass}
            onClick={props.setInterviewer}>
            <img
                className="interviewers__item-image"
                src={props.avatar}
                alt={props.name}
            />
            {props.selected && props.name}
        </l1>
    );
}

export default InterviewerListItem;