import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';

import Section from '../../components/Section';
import Image from '../../../components/Image';

const ContentWrapper = styled.div`
	display: flex;
`;
const Description = styled.div`
	margin: 0px 10%;
	text-align: center;
	color: #545454;
	font-size: 18px;
`;
const Column = styled.div`
	flex: 1;
`;
const Header = styled.h1`
	margin-top: 50px;
	text-align: center;
`;
const Title = styled(EditableDiv)`
	outline: none;
`;

function Content1(props) {
	const { settings, onChange, editable, onEdit } = props;
	function getImage(img) {
		let imgSrc = img;
		if(img && img.name) {
			imgSrc = window.URL.createObjectURL(img)
		} else {
			imgSrc = `./images/${img}`
		}
		return imgSrc;
	}
	return(
		<Section
			center={settings.centerSection}
			backgroundColor={settings.sectionBackground}
		>
			<ContentWrapper>
				<Column>
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
				</Column>
				<Column>
				<Image
					src={getImage(settings.image)}
					alt="team1"
					editable={editable}
					thumbnailRadius="0%"
					onChange={(img) => onChange('image', img)}
				/>
				</Column>
			</ContentWrapper>
		</Section>
	);
}

Content1.defaultSettings = {
	title: 'Contacts with Form',
	description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum The first line of Lorem Ipsum.',
	image: 'team1.jpeg',
	color: '',
	backgroundColor: '',
	centerSection: false,
	sectionBackground: 'transparent',
}

Content1.settings = {
	backgroundColor: 'color',
	color: 'color',
	centerSection: 'boolean',
	sectionBackground: 'color',
}

export default Content1;
