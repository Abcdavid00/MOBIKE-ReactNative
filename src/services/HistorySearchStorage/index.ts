import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveHistorySearch = async (
  historySearch: string[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem('historySearch', JSON.stringify(historySearch));
    console.log('Save History Search Successfully');
  } catch (error) {
    console.log('Error saving history search: ', error);
  }
};

export const getHistorySearch = async (): Promise<string[] | null> => {
  try {
    const value = await AsyncStorage.getItem('historySearch');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error getting history search: ', error);
    return null;
  }
};
