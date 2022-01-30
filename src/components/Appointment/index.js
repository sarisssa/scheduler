import React from 'react';
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from './Confirm';
import Status from './Status';
import Error from './Error';

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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true))
  }

  function deleteAppointment(id) {
    transition(DELETING, true)
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true))
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === CONFIRM && <Confirm id={id} onCancel={back} onConfirm={deleteAppointment} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && interview && <Show
        student={interview ? interview.student : ''}
        interviewer={interview && interview.interviewer ? interview.interviewer : ''}
        id={id}
        confirm={CONFIRM}
        onEdit={() => transition(EDIT)}
        onDelete={transition} />}
      {mode === CREATE && interviewers && <Form interviewers={interviewers} onSave={save} onCancel={back} />}
      {mode === EDIT && interviewers && <Form name={interview.student} interviewers={interviewers} interviewer={interview.interviewer.id} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && <Error message={"Unable to save appointment."} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"Unable to delete appointment."} onClose={back} />}
    </article>
  )
}