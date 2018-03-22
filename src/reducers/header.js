const initialState = {
	searchValue: ''
};

export default function header(state = initialState, action) {
  switch (action.type) {
    case 'HEADER_SET_SEARCH_VALUE':
      return {
        ...state,
				searchValue: action.searchValue
      };
    default:
      return state;
  }
}
