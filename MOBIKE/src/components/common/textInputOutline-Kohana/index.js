import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  Easing,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BaseInput from 'react-native-textinput-effects/lib/BaseInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../assets/theme/colors';
import styles from './styles';

export default class TextInputOutline extends BaseInput {
  static propTypes = {
    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    //iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    //iconName: PropTypes.string.isRequired,
    /*
     * Passed to react-native-vector-icons library as color prop
     */
    //iconColor: PropTypes.string,
    /*
     * Passed to react-native-vector-icons library as size prop.
     */
    //iconSize: PropTypes.number,

    inputPadding: PropTypes.number,
  };

  static defaultProps = {
    easing: Easing.bezier(0.2, 1, 0.3, 1),
    iconSize: 25,
    inputPadding: 16,
    useNativeDriver: false,
  };

  render() {
    const {
      iconClass: Icon,
      iconColor,
      iconSize,
      iconName,
      label,
      containerStyle,
      inputPadding,
      inputStyle,
      labelStyle,
      iconContainerStyle,
      labelContainerStyle,
      inputType,
      rightIconStyle,
      error,
      borderWidthtoTop,
      marginBottomContainer,
      bigContainerStyle,
      //add when change border of container
      ...props
    } = this.props;
    const { focusedAnim, value, visibility = true } = this.state;

    handleChangeVisibility = () =>
      this.setState({
        ...this.state,
        visibility: this.state.visibility ? false : true,
      });

    return (
      <View
        style={[
          {
            // marginBottom: this.props.marginBottomContainer
            //   ? this.props.marginBottomContainer
            //   : 17,
            // height: 60,

            marginBottom: 12,
          },
          bigContainerStyle,
        ]}>
        <View
          style={[
            styles.container,
            containerStyle,
            // {borderColor: error ? '#f72585' : 'black'},
          ]}
          onLayout={this._onLayout}>
          {this.props.iconName && (
            <TouchableWithoutFeedback onPress={this.focus}>
              <Animated.View
                style={{
                  justifyContent: 'center',
                  padding: inputPadding,
                  transform: [
                    {
                      translateX: focusedAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-15 - iconSize, 0],
                      }),
                    },
                  ],
                  paddingVertical: 10,
                  paddingStart: 15,
                  ...iconContainerStyle,
                }}>
                <Icon name={iconName} color={iconColor} size={iconSize} />
              </Animated.View>
            </TouchableWithoutFeedback>)}
          <TouchableWithoutFeedback onPress={this.focus}>
            <Animated.View
              style={{
                position: 'absolute',
                top: inputPadding,
                left: 0,
                transform: [
                  {
                    translateX: focusedAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [inputPadding, 80],
                    }),
                  },
                ],
                opacity: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
                padding: 14,
                top: -1 - borderWidthtoTop,
                ...labelContainerStyle,
              }}>
              <Text style={[styles.label, labelStyle]}>{label}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <TextInput
            ref={this.input}
            {...this.props}
            style={[
              styles.textInput,
              {
                paddingHorizontal: inputPadding,
              },
              inputStyle,
            ]}
            value={value}
            onBlur={this._onBlur}
            onFocus={this._onFocus}
            onChange={this._onChange}
            underlineColorAndroid={'transparent'}
            secureTextEntry={
              this.props.inputType == 'password'
                ? !this.state.visibility
                : false
            }
            spellCheck={false}
            autoCorrect={false}
            overFlow="hidden"
            //maxLength={32}
            {...props}
          />
          {this.props.inputType == 'password' ? (
            <TouchableOpacity onPress={handleChangeVisibility}>
              <Ionicons
                style={[styles.rightIcon, rightIconStyle]}
                name={this.state.visibility ? 'eye' : 'eye-off'}
                icon={iconColor}
                size={iconSize}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {error && (
          <Text
            style={{
              alignSelf: 'flex-end',
              color: '#F50057',
              paddingEnd: 5,
              fontSize: 12,
              paddingTop: 1,
              textAlign: 'right',
            }}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     //flex: 1,
//     flexDirection: 'row',
//     overflow: 'hidden',
//     backgroundColor: '#F5F5F5',
//     height: 50,
//     //marginVertical: 0,
//     borderColor: 'black',
//     borderWidth: 1,
//     borderRadius: 7,
//   },
//   label: {
//     fontSize: 16,
//     color: 'black',
//     fontStyle: 'italic',
//     fontWeight: '100',
//     opacity: 0.5,
//   },
//   textInput: {
//     flex: 1,
//     paddingVertical: 0,
//     color: 'black',
//     fontSize: 17,
//   },

//   rightIcon: {
//     paddingVertical: 12,
//     paddingEnd: 10,
//   },

//   iconContainer: {
//     paddingVertical: 10,
//     paddingStart: 15,
//   },
// });
