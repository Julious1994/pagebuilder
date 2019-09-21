import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import Section from '../../components/Section';


const Input = styled.input`
	padding: 8px 20px;
	flex: 0.5;
`;
const Button = styled.input`
 	background-color: #4182FB;
 	border: none;
 	color: white;
	padding: 10px 20px;
	font-weight: bolder;
	cursor: pointer;
`;
const Field = styled.div`
	padding: 10px;
	display: flex;
	justify-content: center;
`;

const SubscribeContainer = styled.div`
	padding: 50px;
	background-color: ${props => props.backgroundColor || 'transparent'};
	color: ${props => props.color || 'initial'};
`;

class Subscribe extends React.Component {
	render() {
		const { settings = {}, onChange, editable } = this.props;
		return (
			<Section
				center={settings.centerSection}
				backgroundColor={settings.sectionBackground}
			>
				<SubscribeContainer
					backgroundColor={settings.backgroundColor}
					color={settings.color}
				>
					<div>
						<h1>
							<EditableDiv
								html={settings.title}
								disabled={!editable}
								onChange={(e) => {
									const { value } = e.target;
									onChange && onChange('title', value);
								}}
							/>
						</h1>
					</div>
					<EditableDiv
						html={settings.subscribeText}
						disabled={!editable}
						onChange={(e) => {
							const { value } = e.target;
							onChange && onChange('subscribeText', value);
						}}
					/>
					<form>
						<Field>
							<Input name="email" />
							<Button type="submit" value="Submit" />
						</Field>
					</form>
				</SubscribeContainer>
			</Section>
		)
	}
}

Subscribe.defaultSettings = {
	color: '',
	backgroundColor: '',
	submitText: 'Submit',
	title: 'Subscribe',
	subscribeText: 'As seen above, pseudo-selectors and pseudo-elements are pretty much in traditional CSS can be done in Styled Components.',
	centerSection: false,
	sectionBackground: 'transparent',
}

Subscribe.settings = {
  backgroundColor: 'color',
	color: 'color',
	centerSection: 'boolean',
	sectionBackground: 'color',
}

export default Subscribe;
