import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';


Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.7)';

const customStyles = {
  content : {
    top                   : '20%',
    left                  : '30%',
    right                 : '30%',
    bottom                : 'auto',
  }
};

const ContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
`;
const ButtonWrapper = styled.button`
	background-color: #3B85BC;
	border: none;
	padding: 10px 20px;
	color: white;
	font-weight: bolder;
	cursor: pointer;
	margin: 15px auto;
	width: 50%;
`;

const Title = styled.h3`
	margin-top: 0px;
	margin-bottom: 0px;
`;

const SelectWrapper = styled.select`
	width: 100%;
	height: 35px;
	background-color: #949CA9;
	color: white;
	margin: 10px auto;
`;

const Icon = styled(FontAwesomeIcon)`
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
`;

class OpenDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pageIndex: undefined,
		}
	}

	handleChange = (e) => {
		this.setState({ pageIndex: e.target.value });
	}

	handleOpen = () => {
		const { openPage } = this.props;
		const { pageIndex } = this.state;
		if(pageIndex !== undefined) {
			openPage && openPage(pageIndex);
		}
	}

	render() {
		const { isOpen, onClose, pageList } = this.props;
		return(
			<Modal
				isOpen={isOpen}
				onRequestClose={onClose}
				style={customStyles}
				ariaHideApp={false}
			>
				<ContentWrapper>
					<Title>Open Page</Title>
					<Icon icon={faTimes} onClick={onClose}/>
					<SelectWrapper value={this.state.pageIndex} onChange={this.handleChange}>
						<option value={null}>Select page</option>
						{
							pageList.map((page, index) => (
								<option key={index} value={index}>{page.name}</option>
							))
						}
					</SelectWrapper>
					<ButtonWrapper onClick={this.handleOpen}>Open</ButtonWrapper>
				</ContentWrapper>
			</Modal>
		)
	}
}



export default OpenDialog;
