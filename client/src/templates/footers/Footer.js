import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as brandIcons from '@fortawesome/free-brands-svg-icons';

import Section from './../components/Section';
import SocialLink from './../components/SocialLink';

const Company = styled(EditableDiv)`
	font-weight: bolder;
	line-height: 2em;
	outline: none;
`;
const Address = styled(EditableDiv)`
	color: #A2A5B5;
	line-height: 1.5em;
	outline: none;
`;
const Contact = styled(EditableDiv)`
	margin-top: 10px;
	margin-bottom: 10px;
	color: #A2A5B5;
	outline: none;
`;
const SocialWrapper = styled.div`
`;
const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 50px 0px;
`;
const SocialIcon = styled(FontAwesomeIcon)`
	padding: 10px;
	width: 25px;
	height: 25px;
	cursor: pointer;
	color: ${props => props.color || '#464646'};
`;

class Footer extends React.Component {

	handleLinkChange = (link, index, listName) => {
		const { settings, onChange } = this.props;
		const list = settings[listName];
		if(list && list[index]) {
			list[index] = {...list[index], ...link};
			onChange(listName, list);
		}
	}

	render() {
		const { settings, editable, onChange } = this.props;
		const { socialIconGroup } = settings;
		return (
			<Section width="50%" center>
				<FooterContainer>
					<Company
						html={settings.companyName}
						disabled={!editable}
						onChange={(e) => onChange('companyName', e.target.value)}
					/>
					<Address
						html={settings.address1}
						disabled={!editable}
						onChange={(e) => onChange('address1', e.target.value)}
					/>
					<Address
						html={settings.address2}
						disabled={!editable}
						onChange={(e) => onChange('address2', e.target.value)}
					/>
					<Address
						html={settings.address3}
						disabled={!editable}
						onChange={(e) => onChange('address3', e.target.value)}
					/>
					<Contact
						html={settings.contact}
						disabled={!editable}
						onChange={(e) => onChange('contact', e.target.value)}
					/>
					<SocialWrapper>
						{
							socialIconGroup.map((link, i) => (
								<SocialLink
									key={i}
									editable={editable}
									link={link}
									onSettingChange={(link) => this.handleLinkChange(link, i, 'socialIconGroup')}
								>
									<SocialIcon icon={brandIcons[link.icon]} />
								</SocialLink>
							))
						}
					</SocialWrapper>
				</FooterContainer>
			</Section>
		)
	}
}

Footer.defaultSettings = {
	backgroundColor: undefined,
	color: 'initial',
	companyName: 'Company Name',
	address1: '45 West block',
	address2: 'Sector 16 GN Gujarat',
	address3: 'INDIA',
	contact: '9856231475',
	socialIconGroup: [
		{ href: '#', icon: 'faFacebook'},
		{ href: '#', icon: 'faTwitter'},
		{ href: '#', icon: 'faInstagram'},
		{ href: '#', icon: 'faPinterest'},
	]
}

Footer.settings = {
  backgroundColor: 'color',
  color: 'color',
}

export default Footer;
