import React from "react";

import InterviewerListItem from "components/InterviewerListItem"

import "components/InterviewerList.scss"

const InterviewerList = (props) => {
    const { interviewers } = props;

    const interviewerItem = interviewers.map(interviewer => {

        return <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.value}
            interviewer={interviewer.id}
            setInterviewer={props.onChange}
        />
    })

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{interviewerItem}</ul>
        </section>
    );
}

export default InterviewerList;
