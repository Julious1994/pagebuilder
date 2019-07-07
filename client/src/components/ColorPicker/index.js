import React from 'react'
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

const Swatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
  display: inline-block;
  cursor: pointer;
`;

const ColorWrapper = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${props => {
    return props.color;
  }};
`;

const Popover = styled.div`
  position: absolute;
  zIndex: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const defaultColor = {
  r: '241',
  g: '112',
  b: '19',
  a: '1',
};

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    const { onChange } = this.props;
    onChange && onChange(color.hex)
  };

  render() {
    let { value, name } = this.props;
    const color = [null, undefined].includes(value) ? defaultColor : value;
    return (
      <div>
        <Swatch onClick={this.handleClick}>
          <ColorWrapper color={color} />
        </Swatch>
        {
          this.state.displayColorPicker ?
            <Popover>
              <Cover onClick={this.handleClose}/>
              <SketchPicker
                color={color}
                onChangeComplete={this.handleChange}
              />
            </Popover>
          : null
        }
      </div>
    )
  }
}

export default ColorPicker;
