import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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
            setState(prev => ({ //Note standard pattern for setting new state instead of mutating old state
                ...prev,
                days: days,
                appointments: appointments,
                interviewers: interviewers
            }));
        })
    }, [])

    function spotsRemaining(state) { 
        //Access current day and its corresponding object
        const curDay = state.day; 
        const currentDayObj = state.days.find(dayObj => dayObj.name === curDay);
        const currentDayObjIndex = state.days.findIndex(dayObj => dayObj.name === curDay);

        //Access appointments for current day and assess if appointments are free or booked
        const appointmentList = currentDayObj.appointments;
        const freeAppointments = appointmentList.filter(apptId => !state.appointments[apptId].interview);

        //New spot count
        const newSpots = freeAppointments.length;

        //Construct a new slice of state
        const newState = { ...state }; 
        newState.days = [...state.days]; 
        const updatedDay = { ...currentDayObj }; 

        //Inject changes into newState
        updatedDay.spots = newSpots;
        newState.days[currentDayObjIndex] = updatedDay;

        return newState;
    }

    function bookInterview(id, interview) {

        return axios.put(`/api/appointments/${id}`, { interview: { ...interview } })
            .then(res => {
                const appointment = {
                    ...state.appointments[id],
                    interview: { ...interview }
                };

                const appointments = {
                    ...state.appointments,
                    [id]: appointment
                };

                const newState = {
                    ...state,
                    appointments,
                };

                setState({...spotsRemaining(newState)});

            })
    }

    function cancelInterview(id) {
        return axios.delete(`/api/appointments/${id}`, { interview: null })
            .then(res => {
                const appointment = {
                    ...state.appointments[id], // Duplicate state data for the appointment to be deleted
                    interview: null
                };

                const appointments = {
                    ...state.appointments,  // Duplicate state data for all appointments and insert the appointment to be deleted
                    [id]: appointment
                };

                const newState = {
                    ...state,
                    appointments,
                };

                setState({...spotsRemaining(newState)});
            })
    }
    return { state, setDay, bookInterview, cancelInterview }
}