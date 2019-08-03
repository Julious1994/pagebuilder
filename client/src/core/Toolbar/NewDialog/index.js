import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import Input from './../../../components/PropertyInput';

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

const Field = styled.div`
	display: flex;
	padding: 5px 0px;
	${props => props.justify ? `justify-content:${props.justify}` : ''}
`;

const FieldTitle = styled.div`
	${props => props.lineHeight ? 'line-height: 2em' : ''}
	width: ${props => props.width || '25%'};
	font-weight: 500;
`;

class NewDialog extends React.Component {
	state={
		documentProps: {
			isArticle: false,
			// isPost: false,
			slug: '/',
			name: 'page',
			draft: true,
		}
	}

	componentDidUpdate() {
		const { isArticle = false, isPost = false } = this.props;
		const { documentProps } = this.state;
		if(documentProps.isArticle !== isArticle) {
			documentProps.isArticle = isArticle;
			this.setState({ documentProps });
		}
	}

	handleDocumentChange(field, value) {
		const { documentProps } = this.state;
		documentProps[field] = value;
		this.setState({ documentProps });
	}

	handleCreate = () => {
		const { documentProps } = this.state;
		const { onCreate } = this.props;
		onCreate && onCreate(documentProps);
	}

	render() {
		const { isOpen, onClose } = this.props;
		const { documentProps } = this.state;
		return(
			<Modal
				isOpen={isOpen}
				onRequestClose={onClose}
				style={customStyles}
				ariaHideApp={false}
			>
				<ContentWrapper>
					<Title> New {documentProps.isArticle ? 'Article' : 'Page'}</Title>
					<Field>
						<FieldTitle>
							Name
						</FieldTitle>
						<Input
							value={documentProps.name}
							onChange={(value) => this.handleDocumentChange('name', value)}
						/>
					</Field>
					<Field>
						<FieldTitle>
							Slug
						</FieldTitle>
						<Input
							value={documentProps.slug}
							onChange={(value) => this.handleDocumentChange('slug', value)}
						/>
					</Field>
					<Field>
						<FieldTitle width="11%" lineHeight="2em">
							Draft
						</FieldTitle>
						<Input
							width="25%"
							type="checkbox"
							onChange={() => this.handleDocumentChange('draft', !documentProps.draft)}
							checked={documentProps.draft}
						/>
					</Field>
					<Field justify="flex-end">
						<CancelButton onClick={onClose}>Cancel</CancelButton>
						<CancelButton onClick={this.handleCreate}>Create</CancelButton>
					</Field>
				</ContentWrapper>
			</Modal>
		)
	}
}

export default NewDialog;
