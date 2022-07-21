import * as React from 'react';
import { StyleSheet, View, Linking, Platform } from 'react-native';

import ParsedText from 'react-native-parsed-text';

import GLOBALS from '../../constants/globals';

export default class CalendarEvents extends React.Component<any> {
  // Constructor
  constructor(props: any) {
    super(props);
  };

  // Component Mounted
  componentDidMount() {

  };

  handleUrlPress(matchingString: string) {
    let pattern = /\[([^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern) || [];

    let midComponent = `${match[2]}`;
    const url = midComponent.substr(midComponent.indexOf('||') + 2);

    Linking.openURL(url);
  };

  handleAppSettings() {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    }
  };

  renderStyles(matchingString: string) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[([^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern) || [];

    return `${match[2]}`;
  };

  renderThreeStyles(matchingString: string) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[([^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern) || [];

    let midComponent = `${match[2]}`;
    const midText = midComponent.substr(0, midComponent.indexOf('||'));
    return midText;
  };

  // RENDER
  render() {
    const {
      style,
      title,
      fontSize,
      textStyle,
    } = this.props;

    let TextUpdatedStyle = {
      fontSize: fontSize
    }

    let parseSettings = [
      {
        pattern: /\[(u):([^\]]+)\]/i, // url
        style: [styles.primary, styles.bold, styles.italics, styles.underline],
        onPress: this.handleUrlPress,
        renderText: this.renderThreeStyles
      },
      {
        pattern: /\[(ub):([^\]]+)\]/i, // url
        style: [styles.secondary, styles.bold, styles.italics, styles.underline],
        onPress: this.handleUrlPress,
        renderText: this.renderThreeStyles
      },
      {
        pattern: /\[(ut):([^\]]+)\]/i, // url
        style: [styles.third, styles.bold, styles.italics, styles.underline],
        onPress: this.handleUrlPress,
        renderText: this.renderThreeStyles
      },
      {
        pattern: /\[(up):([^\]]+)\]/i, // url
        style: [styles.primary, styles.italics, styles.underline],
        onPress: this.handleUrlPress,
        renderText: this.renderThreeStyles
      },
      {
        pattern: /\[(d):([^\]]+)\]/i, // default or primary gradient color
        style: [styles.primary, styles.bold],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(s):([^\]]+)\]/i, // secondary gradient color
        style: [styles.secondary, styles.bold],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(t):([^\]]+)\]/i, // third gradient color
        style: [styles.third, styles.bold],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(e):([^\]]+)\]/i, // error
        style: [styles.error, styles.bold],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(b):([^\]]+)\]/i, // bold
        style: styles.bold,
        renderText: this.renderStyles
      },
      {
        pattern: /\[(i):([^\]]+)\]/i, // italics
        style: styles.italics,
        renderText: this.renderStyles
      },
      {
        pattern: /\[(bi):([^\]]+)\]/i, // bolditalics
        style: [styles.bold, styles.italics],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(w):([^\]]+)\]/i, // white
        style: [styles.white],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(wb):([^\]]+)\]/i, // whitebold
        style: [styles.white, styles.bold],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(mg):([^\]]+)\]/i, // midgray
        style: [styles.midgray],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(dg):([^\]]+)\]/i, // darkgray
        style: [styles.darkgray],
        renderText: this.renderStyles
      },
      {
        pattern: /\[(ddg):([^\]]+)\]/i, // darker gray
        style: [styles.darkergray],
        renderText: this.renderStyles
      },
    ];

    if (Platform.OS === 'ios') {
      parseSettings.push(
        {
          pattern: /\[(appsettings):([^\]]+)\]/i,
          style: [styles.link, styles.bold, styles.italics, styles.underline],
          onPress: this.handleAppSettings,
          renderText: this.renderStyles
        }
      );
    }
    else if (Platform.OS === 'android') {
      parseSettings.push(
        {
          pattern: /\[(appsettings):([^\]]+)\]/i,
          style: [styles.bold],
          renderText: this.renderStyles
        }
      );
    }

    return (
      <View style = {[ styles.container, style ]}>
        <ParsedText
          style = {[ styles.text, TextUpdatedStyle, textStyle ]}
          parse = {parseSettings}
          childrenProps={{allowFontScaling: false}}
        >
          {title}
        </ParsedText>
      </View>
    );
  }
}

// Styling
const styles = StyleSheet.create({
  container: {
  },
  name: {
    color: GLOBALS.COLORS.SUBLIME_RED
  },
  username: {
    color: GLOBALS.COLORS.GRADIENT_SECONDARY
  },
  text: {
    color: GLOBALS.COLORS.BLACK
  },
  primary: {
    color: GLOBALS.COLORS.GRADIENT_PRIMARY,
  },
  secondary: {
    color: GLOBALS.COLORS.GRADIENT_SECONDARY,
  },
  third: {
    color: GLOBALS.COLORS.GRADIENT_THIRD,
  },
  error: {
    color: GLOBALS.COLORS.SUBLIME_RED,
  },
  white: {
    color: GLOBALS.COLORS.WHITE,
  },
  midgray: {
    color: GLOBALS.COLORS.MID_GRAY,
  },
  darkgray: {
    color: GLOBALS.COLORS.DARK_GRAY,
  },
  darkergray: {
    color: GLOBALS.COLORS.DARKER_GRAY,
  },
  link: {
    color: GLOBALS.COLORS.GRADIENT_PRIMARY,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: 'bold'
  },
  italics: {
    fontStyle: 'italic'
  }
});
