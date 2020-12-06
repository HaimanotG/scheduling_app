export default ({ getState, dispatch }) => next => action => {
  console.log(`Action: ${action.type}`);
  next(action);
};
