const initialState = {
  trend: [],
  coins: [],
  coin: [],
};

const coinReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case "GET_TREND":
      return {
        ...state,
        trend: payload,
      };
    case "GET_ALL":
      return {
        ...state,
        coins: payload,
      };
    case "GET_COIN":
      return {
        ...state,
        coin: payload,
      };

    default:
      return state;
  }
};

export default coinReducer;
