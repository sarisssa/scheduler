
export function getAppointmentsForDay(state, day) { //Return an array of appointments for given day
  let res = [];

  if (state.days.length === 0) return res; //Edge case

  const filteredState = state.days.filter(data => data.name === day)
  if (!filteredState.length) return res;

  const targetAppointments = filteredState[0].appointments;

  const mappedAppointments = targetAppointments.map(ele => state.appointments[ele])
  res = mappedAppointments;

  return res;
};

export function getInterview(state, interview) {

  if (!interview) return null;

  return {...interview, interviewer: state.interviewers[interview.interviewer]};
};

export function getInterviewersForDay(state,day) {
  let res = [];

  if (state.days.length === 0) return res;

  const targetDay = state.days.filter(data => data.name === day); //Find day within state which matches day parameter

  if(Object.keys(targetDay).length) { //To account for edge case where day is not found
    const interviewers = targetDay[0].interviewers;
    res = interviewers.map(el => state.interviewers[el]); 
  }
  return res;
} 