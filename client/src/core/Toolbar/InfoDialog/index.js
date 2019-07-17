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
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const ButtonWrapper = styled.button`
	background-color: #3B85BC;
	border: none;
	padding: 15px 30px;
	color: white;
	font-weight: bolder;
	margin: 5px;
	cursor: pointer;
`;

const CancelButton = styled.button`
	background-color: #fff;
	border: 1px solid #3B85BC;
	padding: 14px 29px;
	color: black;
	font-weight: bolder;
	margin: 5px;
	cursor: pointer;
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
					<Field fullWidth={true}>
						<Label>Description</Label>
						<textarea rows={7} cols={50}></textarea>
					</Field>
					<Field flex={1}>
						<Label>Time</Label>
						<input
							type="date"
						/>
					</Field>
					<Field flex={1}>
						<Label>Attach screenshot</Label>
						<input type="file" />
					</Field>
					<Field>
						<ButtonWrapper>Send</ButtonWrapper>
						<CancelButton onClick={onClose}>Cancel</CancelButton>
					</Field>
				</ContentWrapper>
			</Modal>
		)
	}
}

export default InfoDialog;
