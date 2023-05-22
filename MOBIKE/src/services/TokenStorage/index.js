import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpRequest from '../../backendAPI/HttpRequest';
import { setAll } from '../../redux/clientDatabase/personalInfo';
import Store from '../../redux/store';
import { login, logout } from '../../redux/slice/authSlice';
import BackendAPI, { GetPersonalInfo } from '../../backendAPI';


export const init = async () => {
    try {
        let isTokenStorageInitialized = await AsyncStorage.getItem('TokenStorageInitted');
        if (!isTokenStorageInitialized) {
            console.log('Initializing token storage');
            AsyncStorage.setItem('TokenStorageInitted', '1');
            AsyncStorage.setItem('CurrentToken', '');
            let tokenStorage = {}
            AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
        } else {
            const currentToken = await getCurrentToken();
            if (currentToken) {
                const myinfo = await BackendAPI.me(currentToken);
                console.log("Current acccount: " + JSON.stringify(myinfo.user));
                if (myinfo.msg === 'Completed') {
                    Store.dispatch(login({
                        ID: myinfo.user.ID,
                        token: myinfo.token,
                        permission: myinfo.user.ID_Permission
                    }))
                    await setCurrentToken(myinfo.token);
                    await UpdatePersonalInfo();
                }
            }
        }
    } catch (e) {
        console.log("Init token storage error: " + e);
    }
};

export const UpdatePersonalInfo = async () => {
    let personalInfo = await GetPersonalInfo();
    Store.dispatch(setAll(personalInfo));
}

export const signUp = async (username: string, email: string, phone: string, password: string) => {
    const response = await HttpRequest.PostRequest("auth/signup", { username: username, email: email, phone: phone, password: password, permission: 4 });
    console.log("Sign up request sent: " + JSON.stringify(response));
    if (response.msg === 'Completed') {
        console.log('Sign up successful, start signing in');
        await signIn(email, password);
    } else {
        console.log(response);
        return response.Error;
    }
}

export const signIn = async (usernameOrEmail: String, password: String, savePassword: Boolean = true): String => {
    const response = await HttpRequest.PostRequest("auth/signin", { username_or_email: usernameOrEmail, password: password });
    console.log("Sign in request response: " + JSON.stringify(response));
    if (response.msg == "Completed") {
        setCurrentToken(response.token);
        if (savePassword) {
            addToken(response.uid, response.token);
        } else {
            addUID(response.uid);
        }
        const myinfo = await BackendAPI.me(response.token);
        if (myinfo.msg == "Completed") {
            Store.dispatch(login({
                ID: myinfo.user.ID,
                token: myinfo.token,
                permission: myinfo.user.ID_Permission
            }))
            await UpdatePersonalInfo();
        }

        return myinfo.token;
    } else if (response.msg == "Incompleted") {
        return response;
    }
}

export const signOut = async () => {
    try {
        removeCurrentToken();
        Store.dispatch(logout());
    } catch (e) {
        console.log("Log out error: " + e);
    }
}

export const print = async () => {
    try {
        let isTokenStorageInitialized = await AsyncStorage.getItem('TokenStorageInitted');
        if (isTokenStorageInitialized) {
            let CurrentToken = await AsyncStorage.getItem('CurrentToken');
            console.log("CurrentToken: " + CurrentToken);
            let tokenStorage = await AsyncStorage.getItem('TokenStorage');
            tokenStorage = tokenStorage;
            console.log("TokenStorage: " +tokenStorage);
        } else {
            console.log('TokenStorage has not initialized');
        }
    } catch (e) {
        console.log("Print token storage error: " + e);
    }
};

export const getToken = async (UID: string | number) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        return tokenStorage[UID];
    } catch (e) {
        console.log("Get token error: " + e);
    }
};

export const addToken = async (UID, token) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        tokenStorage[UID] = token;
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Add token error: " + e);
    }
};

export const removeToken = async (UID) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        delete tokenStorage[UID];
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Remove token error: " + e);
    }
};

export const addUID = async (UID) => {
    try {
        let tokenStorage = await AsyncStorage.getItem('TokenStorage');
        tokenStorage = JSON.parse(tokenStorage);
        tokenStorage[UID] = "";
        AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
    } catch (e) {
        console.log("Add UID error: " + e);
    }
};

export const setCurrentToken = async (token) => {
    try {
        AsyncStorage.setItem('CurrentToken', token);
    } catch (e) {
        console.log("Set current token error: " + e);
    }
};

export const getCurrentToken = async () => {
    try {
        let token = await AsyncStorage.getItem('CurrentToken');
        return token;
    } catch (e) {
        console.log("Get current token error: " + e);
    }
};

export const removeCurrentToken = () => {
    try {
        AsyncStorage.setItem('CurrentToken', "");
    } catch (e) {
        console.log("Remove current token error: " + e);
    }
}


export default {init, signUp, signIn, print, getToken, addToken, removeToken, addUID, setCurrentToken, getCurrentToken, removeCurrentToken};