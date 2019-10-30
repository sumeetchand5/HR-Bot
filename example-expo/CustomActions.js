import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,AsyncStorage
} from 'react-native'

import {
  getLocationAsync,
  pickImageAsync,
  takePictureAsync,
} from './mediaUtils'

export default class CustomActions extends React.Component {
  onActionsPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Cancel',
    ]
    const cancelButtonIndex = options.length - 1
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        const userinfo = await AsyncStorage.getItem('userinfo');
        const userContext = JSON.parse(userinfo); 


        const { onSend } = this.props
        switch (buttonIndex) {
          case 0:
            let data = pickImageAsync(onSend,userContext[0].man_id,userContext[0].emp_id,userContext[0].view_level,userContext[0].token,userContext[0].session_id,this.props.setData);
         // ToastAndroid.show("Sumpererer" ,ToastAndroid.LONG);
            return
          case 1:
            takePictureAsync(onSend)
            return
          default:
        }
      },
    )
  }

  renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon()
    }
    return (
      <View style={[styles.wrapper, this.props.wrapperStyle]}>
        <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
      </View>
    )
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
}

CustomActions.defaultProps = {
  onSend: () => {},
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
}

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
}
