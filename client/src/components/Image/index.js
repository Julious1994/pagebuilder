import React from 'react';

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
				<img src={src} onClick={this.handleImageClick} />
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
