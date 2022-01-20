
export function getAppointmentsForDay(state, day) { //Return an array of appointments for given day
    let res = [];

    if (state.days.length === 0) return res;
    
    const filteredState = state.days.filter(data => data.name === day)
    if (!filteredState.length) return res;

    const targetAppointments = filteredState[0].appointments;

    const mappedAppointments = targetAppointments.map(ele => state.appointments[ele])
    res = mappedAppointments;
    
    return res;
  } 