const leaderboard = (state = 0, action) => {
  switch (action.type) {
    case "FETCH_LEADERBOARD":
      return action.payload;
    default:
      return state;
  }
};

export default game;
