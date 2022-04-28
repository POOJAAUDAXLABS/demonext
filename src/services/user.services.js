import Router from 'next/router';
import { BehaviorSubject } from 'rxjs';

// const userSubject = JSON.parse(sessionStorage.getItem('user'));

const userSubject = new BehaviorSubject(process.browser && JSON.parse(sessionStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
};

function login(username, password) {
    const user = {
        username: "adminhd@gmail.com",
        password: 'pass@123'
    }

    return new Promise((resolve, reject) => {
        if (username == user?.username && password === user?.password) {
            userSubject.next(user);
            sessionStorage.setItem('user', JSON.stringify(user));
            resolve(user);
            return user;
        } else {
            reject('Invalid Credential');
            return;
        }
    })

}

export function logout() {
    sessionStorage.clear()
    userSubject.next(null);
    Router.push('/login');
}