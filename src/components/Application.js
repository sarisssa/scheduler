import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const GET_DAYS = '/api/days';
    const GET_APPOINTMENTS = '/api/appointments';
    const GET_INTERVIEWERS = '/api/interviewers';

    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS)
    ]).then(response => {
      const days = response[0].data;
      const appointments = response[1].data;
      const interviewers = response[2].data
      setState(prev => ({ ...prev, days: days, appointments: appointments, interviewers: interviewers }));
    })
  }, [])

  function bookInterview(id, interview) {
    console.log(id, interview);

    axios.put(`/api/appointments/${id}`, {interview:{...interview}})
    .then(res =>  {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state, 
        appointments: appointments      
      })
    })
  }

  let dailyAppointments = [];
  let dailyInterviewers = [];

  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointmentItem = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log('INTERVIEW', interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentItem}
      </section>
    </main>
  );
}
