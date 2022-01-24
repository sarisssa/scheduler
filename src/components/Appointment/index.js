import React from 'react';
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from './Confirm';
import Status from './Status';

import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const { time, interview, interviewers, id, bookInterview, cancelInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const STATUS = "STATUS"

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
    .then(() => {
      transition(STATUS)
      transition(SHOW)
    });
  }

  function deleteAppointment(id) {
    cancelInterview(id)
    .then(() => {
      transition(STATUS)
      transition(EMPTY)
    })
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === STATUS && <Status message={"Processing"}/>}
      {mode === CONFIRM && <Confirm id={id} onConfirm={deleteAppointment} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show 
        student={interview ? interview.student : ''} 
        interviewer={interview ? interview.interviewer : ''} 
        id={id}
        confirm={CONFIRM} 
        onDelete={transition}/>}
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()} />}
    </article>
  )
}