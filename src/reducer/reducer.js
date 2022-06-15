const initialState = {
  trend: [],
  coins: [],
  coin: [],
  chart: [],
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
      case 'GET_CHART': 
      return{
        ...state,
        chart: payload,
      }

    default:
      return state;
  }
};

export default coinReducer;
