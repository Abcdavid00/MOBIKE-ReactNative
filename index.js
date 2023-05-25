/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/redux/store';
import { ModalPortal } from 'react-native-modals';

// const theme = {
//     ...DefaultTheme,
//     colors: {
//         ...DefaultTheme.colors,
//         primary: colors.primary,
//         secondary: colors.secondary,
//     },
// };



export default function Main() {

    return (
        <Provider store={store}>
            <App />
            <ModalPortal />
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
