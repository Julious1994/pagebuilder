import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faNewspaper, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';


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

const Grid = styled.div`
	margin: 10px auto;
	width: 100%;
`;

const Row = styled.div`
	display: flex;
	flex-diretion: row;
	border-bottom: 0.5px solid #AFAFAF;
	padding: 8px 0px;
`;

const ActionView = styled.div`
	display: flex;
	flex-diretion: row;
	justify-content: space-between;
	width: 20%;
`;

const ActionButton = styled(FontAwesomeIcon)`
	cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
	position: absolute;
	right: 20px;
	top: 20px;
	cursor: pointer;
`;

const PageTitle = styled.div`
	flex: 1;
	font-weight: 600;
`;

class OpenDialog extends React.Component {


	handleOpen = (pageIndex) => {
		const { openPage } = this.props;
		openPage && openPage(pageIndex);
	}

	handlePublish = () => {

	}

	renderActionButtons(page, index) {
		return (
			<ActionView>
				<ActionButton
					icon={faNewspaper}
					onClick={this.handlePublish}
				/>
				<ActionButton
					icon={faPencilAlt}
					onClick={() => this.handleOpen(index)}
				/>
				<ActionButton
					icon={faTrash}
					onClick={this.handlePublish}
				/>
			</ActionView>
		);
	}

	renderPage(page) {
		return (
			<PageTitle>
				{page.name}
			</PageTitle>
		);
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
					<Grid>
						{
							pageList.map((page, index) => (
								<Row key={index}>
									{this.renderPage(page)}
									{this.renderActionButtons(page, index)}
								</Row>
							))
						}
					</Grid>
					<ButtonWrapper onClick={this.handleOpen}>Open</ButtonWrapper>
				</ContentWrapper>
			</Modal>
		)
	}
}



export default OpenDialog;
