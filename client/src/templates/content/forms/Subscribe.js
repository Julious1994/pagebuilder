import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import Section from '../../components/Section';


const Input = styled.input`
	padding: 8px 20px;
	flex: 0.5;
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
				className="fdb-block"
				center={settings.centerSection}
				backgroundColor={settings.sectionBackground}
			>
				<SubscribeContainer
					className="container"
					backgroundColor={settings.backgroundColor}
					color={settings.color}
				>
					<div className="row justify-content-center">
						<div className="col-12 col-md-8 col-lg-6 text-center">

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

							<EditableDiv
								html={settings.subscribeText}
								disabled={!editable}
								onChange={(e) => {
									const { value } = e.target;
									onChange && onChange('subscribeText', value);
								}}
							/>
							<form>
								<div className="input-group mt-4 mb-4">
									<input type="text" className="form-control" placeholder="Enter your email address" />
									<div className="input-group-append">
										<button className="btn btn-primary" type="button">Submit</button>
									</div>
								</div>
							</form>
						</div>
					</div>
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
