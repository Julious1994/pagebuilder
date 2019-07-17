import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.7)';

const customStyles = {
  content : {
    top                   : '20%',
    left                  : '20%',
    right                 : '20%',
    bottom                : 'auto',
  }
};

const Label = styled.div`
	font-weight: bolder;
`;

const Field = styled.div`
	padding: 10px;
	${props => props.fullWidth ? 'width: 100%' : ''}
	${props => props.flex ? 'flex: ' + props.flex : ''}
	display: flex;
	width: 100%;
	justify-content: flex-end;
`;

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
	margin: 5px;
	cursor: pointer;
`;

const CancelButton = styled.button`
	background-color: #fff;
	border: 1px solid #3B85BC;
	padding: 10px 20px;
	color: black;
	font-weight: bolder;
	margin: 5px;
	cursor: pointer;
`;

const Title = styled.h2`
	margin-top: 0px;
`;

class InfoDialog extends React.Component {
	render() {
		const { isOpen, onClose } = this.props;
		return(
			<Modal
				isOpen={isOpen}
				onRequestClose={onClose}
				style={customStyles}
				ariaHideApp={false}
			>
				<ContentWrapper>
					<Title>Confirmation</Title>
					<div>
						Your page saved successfully.
						Are you want to view page?
					</div>
					<Field>
						<ButtonWrapper>View Page</ButtonWrapper>
						<CancelButton onClick={onClose}>Close</CancelButton>
					</Field>
				</ContentWrapper>
			</Modal>
		)
	}
}

export default InfoDialog;
