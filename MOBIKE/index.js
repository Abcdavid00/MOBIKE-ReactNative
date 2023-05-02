/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/redux/store';

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
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
