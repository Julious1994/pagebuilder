import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

import Section from './../components/Section';

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
	render() {
		return (
			<Section width="50%" center>
				<FooterContainer>
					<Company
						html={"Company Name"}
					/>
					<Address html={"45 West block"} />
					<Address html={"Sector 16 GN Gujarat"} />
					<Address html={"INDIA"} />
					<Contact html={"9856231475"}></Contact>
					<SocialWrapper>
						<a href="#"><SocialIcon icon={faFacebook} /></a>
						<a href="#"><SocialIcon icon={faTwitter} /></a>
						<a href="#"><SocialIcon icon={faInstagram} /></a>
						<a href="#"><SocialIcon icon={faPinterest} /></a>
					</SocialWrapper>
				</FooterContainer>
			</Section>
		)
	}
}

Footer.defaultSettings = {
	backgroundColor: undefined,
	color: 'initial',
}

Footer.settings = {
  backgroundColor: 'color',
  color: 'color',
}

export default Footer;
