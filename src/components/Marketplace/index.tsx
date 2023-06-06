import {View, Text, Keyboard, Pressable} from 'react-native';
import React from 'react';
import Container from '../common/container';
import colors from '../../assets/theme/colors';
import Carousel from '../Banner/carousel';
import imageBanner from '../../data/imageBanner';
import CategoryList from '../CategoryList/flatList';
import PostPreviewList from '../PostPreview/flatList';
import store, {RootState} from '../../redux/store';
import {
  POST_DETAIL_NAVIGATOR,
  PRODUCT_LIST,
  SEARCH,
} from '../../constants/routeNames';
import {useDispatch, useSelector} from 'react-redux';
import {setInitial} from '../../redux/slice/filterSlice';
import {GetAllPosts} from '../../backendAPI';
import {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MarketplaceStackParamList} from '../../navigations/MarketplaceNavigator';
import {ThemeState} from '../../redux/slice/themeSlice';
import TextField from '../common/textField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {POPPINS_BOLD, POPPINS_LIGHT_ITALIC} from '../../assets/fonts';
import {vehicleType} from '../../redux/clientDatabase/vehicleType';
import {imageVehicleType} from '../../data/imageVehicleTypes';
import ShadowWrapper from '../common/shadowWrapper';

type MarketplaceComponentProps = {
  navigation: StackNavigationProp<MarketplaceStackParamList, 'Marketplace'>;
};

const MarketplaceComponent: React.FC<MarketplaceComponentProps> = ({
  navigation,
}) => {
  const dataType = useSelector<RootState, vehicleType[]>(
    state => state.vehicleTypes,
  );
  console.log('dataType', dataType);
  const dispatch = useDispatch();

  useEffect(() => {
    getFilterPostList();
  }, []);

  const getFilterPostList = async () => {
    const postListTmp = await GetAllPosts();
    console.log('postList: ' + JSON.stringify(postListTmp));
    let tmp: Array<number> = [];
    for (let i = 0; i < postListTmp.length; i++) {
      tmp.push(postListTmp[i].ID);
    }
    setPostList(tmp);
  };

  const [postList, setPostList] = React.useState<Array<number>>([]);

  const onNavigateProductList = () => {
    navigation.navigate(PRODUCT_LIST);
  };

  const onNavigateSearch = () => {
    navigation.navigate(SEARCH);
  };

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  return (
    <Container
      keyboardShouldPersistTaps="always"
      styleScrollView={{backgroundColor: color.background}}>
      {/* Header */}
      <View style={styles.wrapperHeader}>
        <TextField
          label={'What are you looking for ?'}
          iconClass={Ionicons}
          iconName={'search-outline'}
          iconColor={color.primary}
          style={{width: '85%'}}
          onTouchEnd={onNavigateSearch}
        />
        <Pressable>
          <Ionicons
            name="notifications-outline"
            color={color.onBackground_light}
            size={28}
          />
        </Pressable>
      </View>

      {/* Banner */}
      <Carousel data={imageBanner} />

      {/*Vehicle Type*/}
      <View>
        <Text style={[styles.vehicleTypeHeading, {color: color.onBackground}]}>
          Vehicle Types
        </Text>
        <CategoryList
          data={dataType}
          type={'navigate'}
          onNavigate={onNavigateProductList}
          renderItem={undefined}
          imageVehicleTypes={imageVehicleType}
        />
      </View>

      {/* Most Recently Title */}
      <View style={styles.mostRecentlyHeadingWrapper}>
        <Text style={[styles.mostRecentlyHeading, {color: color.onBackground}]}>
          Most Recently
        </Text>
        <Pressable
          onPress={() => {
            onNavigateProductList();
            dispatch(setInitial);
          }}>
          <Text style={[styles.seeMoreHeading, {color: color.primary}]}>
            {'See more >'}
          </Text>
        </Pressable>
      </View>

      {/*Preview Post List */}
      <PostPreviewList
        data={postList}
        onPress={() => {
          navigation.navigate(POST_DETAIL_NAVIGATOR);
        }}
        renderItem={undefined}
      />

      <View style={{height: 100}} />
    </Container>
  );
};

export default MarketplaceComponent;

const styles = StyleSheet.create({
  wrapperHeader: {
    flexDirection: 'row',
    paddingLeft: '6%',
    paddingEnd: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleTypeHeading: {
    fontSize: 16,
    fontFamily: POPPINS_BOLD,
    paddingLeft: '6%',
    marginTop: 5,
    marginBottom: 7,
  },
  mostRecentlyHeadingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: 20,
  },
  mostRecentlyHeading: {
    fontSize: 16,
    fontFamily: POPPINS_BOLD,
  },
  seeMoreHeading: {
    fontSize: 12,
    fontFamily: POPPINS_LIGHT_ITALIC,
  },
});
