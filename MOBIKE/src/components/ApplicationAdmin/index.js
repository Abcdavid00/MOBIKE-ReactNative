import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import colors from '../../assets/theme/colors';
import PostRoute from './PostRoute';
// const PostRoute = () => (
//     <View style={{ height: '100%', backgroundColor: 'red' }}>
//         {isLoading ?
//                     _renderSkeleton()
//                     :
//     </View>
// );

const ReportRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const ApplicationAdminComponent = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Post', title: 'Post' },
        { key: 'Report', title: 'Report' },

    ]);

    const renderScene = SceneMap({
        Post: PostRoute,
        Report: ReportRoute,
    });


    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={colors.text}
            inactiveColor={'#8D8D8D'}
            indicatorStyle={{ backgroundColor: colors.secondary, height: 3, }}
            labelStyle={{ fontSize: 13, fontWeight: '500', textTransform: 'none' }}
            pressOpacity={0.8}
            pressColor={'#C0DAF155'}
            style={{ backgroundColor: 'white', elevation: 0, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' }}
        />
    );
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />

    )
}

export default ApplicationAdminComponent