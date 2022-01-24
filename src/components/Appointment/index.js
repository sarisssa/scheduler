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
  const CONFIRM = "CONFIRM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    bookInterview(id, interview)
    .then(() => {
      transition(SHOW)
    });
  }

  function deleteAppointment(id) {
    transition(DELETING)
    cancelInterview(id)
    .then(() => {
      transition(EMPTY)
    })
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === CONFIRM && <Confirm id={id} onConfirm={deleteAppointment} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show 
        student={interview ? interview.student : ''} 
        interviewer={interview ? interview.interviewer : ''} 
        id={id}
        confirm={CONFIRM}
        onEdit={() => transition(EDIT)} 
        onDelete={transition}/>}
      {mode === CREATE && <Form interviewers={interviewers} onSave={save} onCancel={() => back()} />}
      {mode === EDIT && <Form name={interview.student} interviewers={interviewers} interviewer={interview.interviewer.id}  onSave={save} onCancel={() => back()}/>}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Processing"}/>}
    </article>
  )
}