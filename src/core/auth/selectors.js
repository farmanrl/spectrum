export function getAuth(state) {
  return state.auth;
}

export function getUid(state) {
  return getAuth(state).id;
}

export function isAuthenticated(state) {
  return getAuth(state).authenticated;
}
