import React from 'react';
import styled from 'styled-components';


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
		console.log(this.props);
		const { settings = {} } = this.props;
		return (
			<SubscribeContainer
				backgroundColor={settings.backgroundColor}
				color={settings.color}
			>
				<div>
					<h1>Subscribe</h1>
				</div>
				<div>
					As seen above, pseudo-selectors and pseudo-elements are pretty much in traditional CSS can be done in Styled Components.
				</div>
				<form>
					<Field>
						<Input name="email" />
						<Button type="submit" value="Submit" />
					</Field>
				</form>
			</SubscribeContainer>
		)
	}
}

Subscribe.defaultSettings = {
	color: '',
	backgroundColor: '',
}

Subscribe.settings = {
  backgroundColor: 'color',
  color: 'color',
}

export default Subscribe;
