import React from 'react';

import {
  View,
  ViewPropTypes,
  StyleSheet,
  Dimensions,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

let componentIndex = 0;

// const propTypes = {
//   data: PropTypes.array,
//   onChange: PropTypes.func,
//   initValue: PropTypes.string,
//   style: ViewPropTypes.style,
//   selectStyle: ViewPropTypes.style,
//   optionStyle: ViewPropTypes.style,
//   optionTextStyle: Text.propTypes.style,
//   sectionStyle: ViewPropTypes.style,
//   sectionTextStyle: Text.propTypes.style,
//   cancelStyle: ViewPropTypes.style,
//   cancelTextStyle: Text.propTypes.style,
//   overlayStyle: ViewPropTypes.style,
//   cancelText: PropTypes.string,
// };

const defaultProps = {
  data: [],
  onChange: () => {},
  initValue: 'Select me!',
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: 'cancel',
};

export default class ModalPicker extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      animationType: 'slide',
      modalVisible: false,
      transparent: false,
      selected: 'please select',
    };
  }

  componentDidMount() {
    this.setState({ selected: this.props.initValue });
    this.setState({ cancelText: this.props.cancelText });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.initValue != this.props.initValue) {
      this.setState({ selected: nextProps.initValue });
    }
  }

  onChange = item => {
    this.props.onChange(item);
    this.setState({ selected: item.label });
    this.close();
  };

  close = () => {
    this.setState({
      modalVisible: false,
    });
  };

  open = () => {
    this.setState({
      modalVisible: true,
    });
  };

  renderSection = section => (
    <View
      key={section.key}
      style={[styles.sectionStyle, this.props.sectionStyle]}
    >
      <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>
        {section.label}
      </Text>
    </View>
  );

  renderOption(option) {
    return (
      <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
        <View style={[styles.optionStyle, this.props.optionStyle]}>
          <Text style={[styles.optionTextStyle, this.props.optionTextStyle]}>
            {option.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderOptionList() {
    const options = this.props.data.map(item => {
      if (item.section) {
        return this.renderSection(item);
      }
      return this.renderOption(item);
    });

    return (
      <View
        style={[styles.overlayStyle, this.props.overlayStyle]}
        key={`modalPicker${componentIndex++}`}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ paddingHorizontal: 10 }}>{options}</View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text
                style={[styles.cancelTextStyle, this.props.cancelTextStyle]}
              >
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
    return (
      <View style={[styles.selectStyle, this.props.selectStyle]}>
        <Text
          style={[
            styles.selectTextStyle,
            this.props.selectTextStyle,
            this.state.selected == this.props.initValue && { color: '#000' },
          ]}
        >
          {this.state.selected}
        </Text>
        <FontAwesome
          name="sort-down"
          size={15}
          color="#b7c4cb"
          style={{ marginTop: -5 }}
        />
      </View>
    );
  }

  render() {
    const dp = (
      <Modal
        transparent
        ref="modal"
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        animationType={this.state.animationType}
      >
        {this.renderOptionList()}
      </Modal>
    );

    return (
      <View style={[this.props.style, { width: this.props.width || '70%' }]}>
        {dp}
        <TouchableOpacity onPress={this.open} activeOpacity={1}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}

const PADDING = 8;
const BORDER_RADIUS = 5;
const FONT_SIZE = 16;
const HIGHLIGHT_COLOR = 'rgba(0,118,255,0.9)';
const OPTION_CONTAINER_HEIGHT = 400;
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlayStyle: {
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  optionContainer: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.8,
    height: OPTION_CONTAINER_HEIGHT,
    backgroundColor: 'rgba(255,255,255,0.8)',
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2,
  },

  cancelContainer: {
    left: width * 0.1,
    top: (height - OPTION_CONTAINER_HEIGHT) / 2 + 10,
  },

  selectStyle: {
    flex: 1,
    height: 30,
    borderColor: '#d4dce1',
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    backgroundColor: '#F6F7F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: FONT_SIZE,
    marginRight: 10,
  },

  cancelStyle: {
    borderRadius: BORDER_RADIUS,
    width: width * 0.8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: PADDING,
  },

  cancelTextStyle: {
    textAlign: 'center',
    color: '#333',
    fontSize: FONT_SIZE,
  },

  optionStyle: {
    padding: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  optionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE,
    color: HIGHLIGHT_COLOR,
  },

  sectionStyle: {
    padding: PADDING * 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  sectionTextStyle: {
    textAlign: 'center',
    fontSize: FONT_SIZE,
  },
});
