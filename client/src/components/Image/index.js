import React from 'react';
import styled from 'styled-components';
import Popover from 'react-tiny-popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus, faLink, faFolderPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

import Input from './../PropertyInput';
import ImageEditor from './ImageEditor';

const PopupWrapper = styled.div`
	background-color: white;
	border: 1px solid #AFAFAF;
	padding: 10px;
	border-radius: 3px;
	position: relative;
`;

const Row = styled.div`
	padding: 5px;
	display: flex;
	justify-content: ${props => props.justify || 'center'}
`;

const SelectWrapper = styled.select`
	width: 99%;
	height: 35px;
	background-color: #949CA9;
	color: white;
`;

const Col = styled.div`
	display: flex;
	flex: 1;
`;

const RadioText = styled.span`
	line-height: 2;
`;

const IconL = styled(FontAwesomeIcon)`
	width: 3em !important;
	height: 1.1em;
	cursor: pointer;
`;

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: visible;
	& > div {
		top: 0px !important;
    width: 100%;
    left: 0px !important;
	}
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
	border-radius: ${props => props.thumbnailRadius || '50%'};

`;

class Image extends React.Component {
	constructor(props) {
		super(props);
		this.input = React.createRef();
		this.state = {
			show: false,
			isOpen: false,
			linkToggle: false,
		};
	}

	handleImageClick = () => {
		const { editable = false } = this.props;
		if(editable) {
			this.input.click();
		}
	}

	onOptionChange = (option) => {
		this.setState({ option });
	}

	onHrefChange = (value) => {
		const { onChange } = this.props;
		onChange(value);
	}

	handleToogleLink = () => {
		this.setState({ linkToggle: !this.state.linkToggle });
	}

	handleEditImage = () => {
		this.setState({ show: true });
	}

	closeImageDialog = () => {
		this.setState({ show: false });
	}

	verifyImage = (file) => {
		if(!file) return;
		const allowedTypes = ['png', 'jpg', 'jpeg', 'gif'];
		const type = file.type.split('/')[1];
		const size = file.size;
		const mbSize = size / (1024*1024);
		if(!allowedTypes.includes(type)) {
			alert("Image must be in " + allowedTypes.toString() + " format");
			return false;
		}
		if(mbSize > 2) {
			alert("Image size must be less than 2 mb");
			return false;
		}
		return true;
	}

	handleChange = (e) => {
		const {onChange} = this.props;
		e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
			const src = reader.result;
			console.log(reader);
			onChange && onChange(src);
		};
		const file = files[0];
		if(this.verifyImage(file)) {
			reader.readAsDataURL(files[0]);
		}
	}

	render() {
		const { editable = false, src, onChange } = this.props;
		const { isOpen, linkToggle  } = this.state;
		return(
			<React.Fragment>
				<Popover
					isOpen={isOpen}
					position={['top', 'bottom']}
					contentDestination={this.refs.imageRef}
					content={(
						<PopupWrapper>
							<Row>
								<IconL icon={faLink} onClick={this.handleToogleLink}/>
								<IconL icon={faUpload} onClick={this.handleImageClick}/>
								<IconL icon={faEdit} onClick={this.handleEditImage}/>
							</Row>

							{
								linkToggle &&
									<React.Fragment>
										<Row>
											<Input
												// value={href}
												onChange={this.onHrefChange}
											/>
										</Row>
									</React.Fragment>
							}
						</PopupWrapper>
					)}
				>
					<Container
						ref="imageRef"
						onMouseEnter={() => this.setState({ isOpen: true })}
						onMouseOut={(e) => {
							if(!this.refs.imageRef.contains(e.relatedTarget)) {
								this.setState({ isOpen: false })
							}
						}}
					>
						<ItemImage
							src={src}
							thumbnailRadius={this.props.thumbnailRadius}
						/>
						{
							editable &&
							<input
								style={{ display: 'none'}}
								ref={e => this.input = e}
								type="file"
								onChange={e => this.handleChange(e)}
							/>
						}
						<ImageEditor
							isOpen={this.state.show}
							onClose={this.closeImageDialog}
							src={src}
							onImageChange={(src) => onChange(src)}
						/>
					</Container>
				</Popover>
			</React.Fragment>
		)
	}
}

export default Image;
