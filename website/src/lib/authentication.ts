import store from '../store';

export function tryLogin(email: String, password: String): boolean {
    store.commit('logIn');
    return true;
}

export function logout() {
    store.commit('logOut');
}

export default {}