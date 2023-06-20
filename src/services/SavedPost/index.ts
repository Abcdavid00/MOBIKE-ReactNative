import AsyncStorage from '@react-native-async-storage/async-storage';

export const savePost = async (savedPostList: number[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('savedPostList', JSON.stringify(savedPostList));
    console.log('Save Post Successfully');
  } catch (error) {
    console.log('Error saving post: ', error);
  }
};

export const getSavedPostList = async (): Promise<number[] | null> => {
  try {
    const value = await AsyncStorage.getItem('savedPostList');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error getting saved post: ', error);
    return null;
  }
};
