export const clock = (state = new Date(), { type }) => {
  state = new Date(state.getTime());
  switch(type) {
    case 'second':
      state.setSeconds(state.getSeconds() + 1);
      break;
    case 'hour':
      state.setHours(state.getHours() + 1);  
      break;
  }

  return state;
}