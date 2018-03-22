const initialState = {
  user: JSON.parse(global.localStorage.getItem('user')) || null,
  postingKey: JSON.parse(global.localStorage.getItem('postingKey')) || null,
  settings: JSON.parse(global.localStorage.getItem('settings')) || null,
  avatar: JSON.parse(global.localStorage.getItem('avatar')) || null,
  voting_power: null
};

export default function auth(state = initialState, action) {
  if (!state.hydrated) {
    state = {...initialState, state, hydrated: true};
  }
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'OAUTH_SUCCESS':
      return {
        ...state,
        user: action.user,
        postingKey: action.postingKey,
        settings: action.settings,
        avatar: action.avatar,
        voting_power: action.voting_power
      };

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: JSON.parse(global.localStorage.getItem('user')) || null,
        postingKey: JSON.parse(global.localStorage.getItem('postingKey')) || null,
        settings: JSON.parse(global.localStorage.getItem('settings')) || null,
        avatar: JSON.parse(global.localStorage.getItem('avatar')) || null,
        voting_power: null
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: action.settings
      };
    case 'UPDATE_VOTING_POWER':
      return {
        ...state,
        voting_power: action.voting_power,
				vpTimeout: action.vpTimeout
      };

    default:
      return state;
  }
}
