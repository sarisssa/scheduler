import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem"

import "components/InterviewerList.scss"

const InterviewerList = (props) => {
    const { interviewers, onChange } = props;

    const interviewerItem = interviewers.map(interviewer => {
        return <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.value}
            interviewer={interviewer.id}
            setInterviewer={onChange}
        />
    })

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{interviewerItem}</ul>
        </section>
    );
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
