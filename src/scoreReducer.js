const initialState = {
    score: 0
  }

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'ADD_SCORE':
          return {
              ...state,
              score: action.score
          };
        case 'RESET':
            return {
                ...state, 
                score: 0
            }

      default:
          return state;
  }
};

export default scoreReducer;