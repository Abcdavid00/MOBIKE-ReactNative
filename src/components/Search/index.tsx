import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import TextField from '../common/textField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors from '../../assets/theme/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import TextFieldWithRef, {
  TextInputHandle,
} from '../common/textField/TextFieldWithRef';
import {POPPINS_LIGHT, POPPINS_REGULAR} from '../../assets/fonts';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getHistorySearch,
  saveHistorySearch,
} from '../../services/HistorySearchStorage';
import {FilterState, setTitle} from '../../redux/slice/filterSlice';
import {PRODUCT_LIST} from '../../constants/routeNames';
import {useIsFocused} from '@react-navigation/native';

type SearchComponentProp = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'Search'>;
};

const SearchComponent: React.FC<SearchComponentProp> = ({navigation}) => {
  const onGoBack = () => {
    navigation.goBack();
  };

  const searchTextRef = useRef<TextInputHandle>(null);
  useEffect(() => {
    searchTextRef.current?.focus();
  }, []);

  const [historySearch, setHistorySearch] = useState<string[] | null>();

  useEffect(() => {
    const getDataHistorySearch = async () => {
      let arr: string[] | null = await getHistorySearch();
      setHistorySearch(arr);
    };
    getDataHistorySearch();
  }, []);
  const dispatch = useDispatch();
  const _renderHistorySearch = () => {
    const onPressText = async (text: string) => {
      dispatch(setTitle(text));
      onNavigateProductList();
      await onAddHistory(text);
      onSetChange();
    };
    if (historySearch != null)
      return (
        <View>
          {historySearch.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => onPressText(item)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: color.divider,
                  marginRight: '3%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: POPPINS_REGULAR,
                    color: color.onBackground,
                  }}>
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
  };
  const onAddHistory = async (text: string) => {
    if (historySearch != null) {
      let arr = [...historySearch];
      if (arr.includes(text)) {
        arr.splice(arr.indexOf(text), 1);
      }
      arr.unshift(text);
      setHistorySearch(arr);
      await saveHistorySearch(arr);
    } else {
      setHistorySearch([text]);
      await saveHistorySearch([text]);
    }
  };
  const onNavigateProductList = () => {
    navigation.navigate(PRODUCT_LIST);
  };
  const onPressSearch = async (text: string) => {
    dispatch(setTitle(text));
    onNavigateProductList();
    if (text != '') await onAddHistory(text);
  };
  const onDeleteHistory = () => {
    AsyncStorage.removeItem('historySearch');
    setHistorySearch(null);
  };

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  const filter = useSelector<RootState, FilterState>(state => state.filter);
  const [value, setValue] = useState(filter.title);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setValue(filter.title);
    }
  }, [isFocused]);
  const [flagLabel, setFlagLabel] = useState(true);
  const [flagIcon, setFlagIcon] = useState(false);
  const onSetChange = () => {
    setFlagLabel(false);
    setFlagIcon(true);
  };
  const onSetDefault = () => {
    setFlagLabel(true);
    setFlagIcon(false);
  };
  return (
    // <Pressable onPress={Keyboard.dismiss} accessible={false} style={{flex: 1}}>
    <View style={{backgroundColor: color.background, flex: 1}}>
      {/*Header*/}
      <View style={styles.wrapperHeader}>
        <Pressable onPress={onGoBack}>
          <SimpleLineIcons
            name="arrow-left"
            color={color.onBackground_light}
            size={20}
          />
        </Pressable>
        <TextFieldWithRef
          ref={searchTextRef}
          label={'What are you looking for ?'}
          iconClass={Ionicons}
          iconName={'search-outline'}
          iconColor={color.primary}
          style={{width: '90%'}}
          onSubmitEditing={e => {
            onPressSearch(e.nativeEvent.text);
          }}
          flagLabel={flagLabel}
          flagIcon={flagIcon}
          defaultValue={value}
        />
      </View>

      {/*History Search*/}
      {historySearch != null ? (
        <View>
          <View style={styles.historyHeadingWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Feather
                name="clock"
                size={16}
                color={color.onBackground_light}
                style={{marginBottom: 4}}
              />
              <Text
                style={[
                  styles.historyHeading,
                  {color: color.onBackground_light},
                ]}>
                History Search
              </Text>
            </View>
            <Pressable onPress={onDeleteHistory}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: POPPINS_LIGHT,
                  color: color.error,
                }}>
                Delete
              </Text>
            </Pressable>
          </View>
          <ScrollView
            style={{flexGrow: 1, marginBottom: 220}}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            onScroll={Keyboard.dismiss}>
            {_renderHistorySearch()}
          </ScrollView>
        </View>
      ) : null}
    </View>
    // </Pressable>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    height: '100%',
  },
  historyHeading: {
    fontSize: 16,
    fontFamily: POPPINS_REGULAR,
    marginStart: 8,
  },
  historyHeadingWrapper: {
    flexDirection: 'row',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
