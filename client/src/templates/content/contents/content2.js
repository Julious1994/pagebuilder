import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';

import Section from '../../components/Section';

const ContentWrapper = styled.div`
	margin: 50px 0px;
`;
const Description = styled.div`
	margin: 0px 10%;
	text-align: center;
	color: #545454;
	font-size: 18px;
`;
const Header = styled.h1`
	text-align: center;
`;
const Title = styled(EditableDiv)`
	outline: none;
`;

function Content2(props) {
	const { settings, onChange, editable, onEdit } = props;
	return(
		<Section
			center={settings.centerSection}
			backgroundColor={settings.sectionBackground}
		>
			<ContentWrapper>
					<Header>
							<Title
								html={settings.title}
								disabled={!editable}
								onChange={(e) => onChange('title', e.target.value)}
							/>
					</Header>
					<Description>
						<Title
							html={settings.description}
							disabled={!editable}
							onChange={(e) => onChange('description', e.target.value)}
						/>
					</Description>
			</ContentWrapper>
		</Section>
	);
}

Content2.defaultSettings = {
	title: 'Contacts with Form',
	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.',
	color: '',
	backgroundColor: '',
	centerSection: false,
	sectionBackground: 'transparent',
}

Content2.settings = {
	backgroundColor: 'color',
	color: 'color',
	centerSection: 'boolean',
	sectionBackground: 'color',
}

export default Content2;
