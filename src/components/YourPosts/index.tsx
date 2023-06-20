import {View, Dimensions} from 'react-native';
import React from 'react';
import colors, {ColorThemeProps} from '../../assets/theme/colors';
import {useNavigation} from '@react-navigation/native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ActiveRoute from './ActiveRoute';
import InactiveRoute from './InactiveRoute';
import DeactivatedRoute from './DeactivatedRoute';
import SoldRoute from './SoldRoute';
import {useWindowDimensions} from 'react-native';
import {FAB} from 'react-native-paper';
import {ADD_POST} from '../../constants/routeNames';
import {useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {YourPostsStackParamList} from '../../navigations/YourPostsNavigator';
import {RootState} from '../../redux/store';
import {getThemeColor} from '../../utils/getThemeColor';
import {getFontSize} from '../../utils/fontSizeResponsive';
import {POPPINS_REGULAR} from '../../assets/fonts';

const heightScreen = Dimensions.get('window').height;

type YourPostsComponentProps = {
  navigation: StackNavigationProp<YourPostsStackParamList, 'YourPosts'>;
};

const YourPostsComponent: React.FC<YourPostsComponentProps> = ({
  navigation,
}) => {
  const {navigate} = useNavigation();

  const layout = useWindowDimensions();

  const color = useSelector<RootState, ColorThemeProps>(state =>
    getThemeColor(state.theme),
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Active', title: 'Active'},
    {key: 'Inactive', title: 'Inactive'},
    {key: 'Sold', title: 'Sold'},
    {key: 'Deactivated', title: 'Deactivated'},
  ]);

  const renderScene = SceneMap({
    Active: ActiveRoute,
    Inactive: InactiveRoute,
    Sold: SoldRoute,
    Deactivated: DeactivatedRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={color.text}
      inactiveColor={'#8D8D8D'}
      indicatorStyle={{backgroundColor: color.secondary, height: 3}}
      labelStyle={{
        fontSize: getFontSize(13),
        fontFamily: POPPINS_REGULAR,
        textTransform: 'none',
      }}
      pressOpacity={0.8}
      pressColor={color.secondary + '4D'}
      style={{
        backgroundColor: color.background_bottomNav,
        elevation: 0,
        borderBottomWidth: 1,
        borderBottomColor: color.divider,
      }}
    />
  );

  return (
    <View style={{height: '100%'}}>
      {/* <TouchableWithoutFeedback
        onPress={() => {
          navigate(ADD_POST);
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
          }}>
          <Text style={{ color: colors.white }}>Add post</Text>
        </View>
      </TouchableWithoutFeedback> */}

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabBar}
      />

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: colors.secondary,
        }}
        onPress={() => navigation.navigate(ADD_POST)}
      />
    </View>
  );
};

export default YourPostsComponent;
