import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import Section from '../../components/Section';


const ContactUsWrapper = styled.div`
	padding: 20px;
	background-color: ${props => props.backgroundColor || 'transparent'}
	color: ${props => props.color || 'initial'}
`;

const RowWrapper = styled.div`
margin: 0px auto;
text-align: center;
`;
const Title = styled(EditableDiv)`
margin: 0px auto;
text-align: center;
font-weight: bolder;
font-size: x-large;
`;

const InputWrapper = styled.input`
padding: 10px;
margin: 5px;
border: 1px solid #545454;
width: calc(50% - 32px);
display: ${props => !props.enabled ? 'none' : 'initial'}
`;

const ButtonWrapper = styled.button`
	background-color: #3B85BC;
	border: none;
	padding: 15px 30px;
	color: white;
	font-weight: bolder;
	margin: 5px;
	cursor: pointer
`;

const CancelButton = styled.input`
	background-color: #fff;
	border: 1px solid #3B85BC;
	padding: 15px 30px;
	color: black;
	font-weight: bolder;
	margin: 5px;
	cursor: pointer
`;

const ContentWrapper = styled.div`
	display: flex;
	text-align: center;
	justify-content: center;
	width: 50%;
	margin: 0px auto;
	flex-direction: column;
`;

const FieldWrapper = styled.div`
text-align: left;
`;

const TextAreaWrapper = styled.textarea`
padding: 10px;
border: 1px solid #545454;
width: calc(100% - 30px);
margin: 5px;
display: ${props => !props.enabled ? 'none' : 'initial'}
`;

class Contact extends React.Component {

	handleSubmit = (e) => {
		const { editable } = this.props;
		e.preventDefault();
		return !editable;
	}

	handleReset = (e) => {
		const { editable } = this.props;
		e.preventDefault();
		return !editable;
	}

	render() {
		const { settings, onChange, editable } = this.props;
		const { title, name=true, email=true, message=true, namePlaceholder, messagePlaceholder, emailPlaceholder, buttonText, actionUrl } = settings;
		return (
		<Section
			center={settings.centerSection}
			backgroundColor={settings.sectionBackground}
			contentWidth={settings.contentWidth}
		>
			<ContactUsWrapper
				backgroundColor={settings.backgroundColor}
				color={settings.color}
			>
				<Title
					html={title}
					disabled={false}
					onChange={(e) => {
						onChange('title', e.target.value);
					}}
				/>
				<ContentWrapper>
					<form action={actionUrl} method="post" onSubmit={this.handleSubmit} onReset={this.handleReset}>
						<FieldWrapper>
							<InputWrapper
								enabled={name}
								placeholder={namePlaceholder}
								type="text"
							/>
							<InputWrapper
								enabled={email}
								placeholder={emailPlaceholder}
								type="email"
							/>
							<InputWrapper
								enabled={settings.phone}
								placeholder={settings.phonePlaceholder}
								type="text"
							/>
							<TextAreaWrapper enabled={message} rows="10" placeholder={messagePlaceholder}></TextAreaWrapper>
						</FieldWrapper>
						<ButtonWrapper>
							{settings.submitTitle}
						</ButtonWrapper>
						<CancelButton type="reset" value={settings.resetTitle} />
					</form>
				</ContentWrapper>
			</ContactUsWrapper>
			</Section>
		)
	}
}

Contact.defaultSettings = {
	title: 'Contacts with Form',
	message: true,
	name: true,
	email: true,
	phone: false,
	emailPlaceholder: "Email",
	namePlaceholder: "Name",
	messagePlaceholder: "Message",
	submitTitle: "Send",
	resetTitle: "Clear",
	actionUrl: "/contact",
	centerSection: false,
	sectionBackground: 'transparent',
	contentWidth: 100,
}

Contact.settings = {
	backgroundColor: 'color',
	color: 'color',
	sectionBackground: 'color',
	contentWidth: {
		type: 'number',
	},
	emailPlaceholder: 'string',
	namePlaceholder: 'string',
	phonePlaceholder: 'string',
	messagePlaceholder: 'string',
	actionUrl: 'string',
	submitTitle: 'string',
	resetTitle: 'string',
	name: 'boolean',
	message: 'boolean',
	phone: 'boolean',
	email: 'boolean',
	centerSection: 'boolean',
}

export default Contact;
