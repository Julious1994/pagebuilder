import React from 'react';
import styled from 'styled-components';

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.thumbnailRadius || '50%'};
`;

class Image extends React.Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
	}

	handleImageClick = () => {
		const { editable = false } = this.props;
		if(editable) {
			this.input.click();
		}
	}

	render() {
		const { editable = false, src, onChange } = this.props;
		return(
			<React.Fragment>
				<ItemImage
					src={src}
					onClick={this.handleImageClick}
					thumbnailRadius={this.props.thumbnailRadius}
				/>
				{
					editable &&
					<input
						style={{ display: 'none'}}
						ref={e => this.input = e}
						type="file"
						onChange={e => onChange && onChange(e.target.files[0])}
					/>
				}
			</React.Fragment>
		)
	}
}

export default Image;
