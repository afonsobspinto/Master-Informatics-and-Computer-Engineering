import store from '../store';

export function tryLogin(email: String, password: String): boolean {
    // TODO
    store.commit('logIn', 1);
    return true;
}

export function logout() {
    store.commit('logOut');
}
