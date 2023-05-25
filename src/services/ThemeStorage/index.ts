import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveThemeState = async (themeState: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('themeState', JSON.stringify(themeState));
  } catch (error) {
    console.log('Error saving theme state: ', error);
  }
};

export const getThemeState = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem('themeState');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error getting theme state: ', error);
    return null;
  }
};
