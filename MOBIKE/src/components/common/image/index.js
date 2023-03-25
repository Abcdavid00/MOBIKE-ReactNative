import React from 'react';
import { Image } from 'react-native';
import { Text, View } from 'react-native';

const MobikeImage = ({
    imageID,
    style,
}) => (
    <Image
        source={{ uri: "https://abcdavid-knguyen.ddns.net:30001/image/get/" + imageID }}
        style={[{
            resizeMode: 'contain',
        }, style]}
    />
);

export default MobikeImage;
