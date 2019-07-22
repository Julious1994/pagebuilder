import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

import Section from './../components/Section';
import Link from './../components/Link';

const SocialWrapper = styled.div`
	flex: 1;
`;
const LinkList = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
`;
const AboutWrapper = styled.div`
	flex: 2;
`;
const FooterContainer = styled.div`
	background-color: #3B3D44;
	display: flex;
	flex-direction: column;
	padding: 50px 0px;
`;
const SocialIcon = styled(FontAwesomeIcon)`
	padding: 10px;
	width: 25px;
	height: 25px;
	cursor: pointer;
	color: ${props => props.color || '#fff'};
`;

const FooterInfo = styled.div`
	display: flex;
`;

const Title = styled(EditableDiv)`
	font-size: 18px;
	line-height: 1.5em;
	font-weight: bolder;
	outline: none;
	color: #fff;
`;

const FollowList = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const Description = styled(EditableDiv)`
	color: #797F8E;
  outline: none;
`;

const Copyright = styled(EditableDiv)`
	padding-top: 10px;
	color: #A2A5B5;
  outline: none;
`;

class Footer2 extends React.Component {
	render() {
		const { settings } = this.props;
		console.log(this.props);
		return (
			<Section>
				<FooterContainer>
					<FooterInfo>
						<LinkList>
							<Title
								html={"Group 1"}
							/>
							<Link
								color="#797F8E"
								linkText={"Home"}
							/>
							<Link
								linkText={"Features"}
							/>
							<Link
								linkText={"Pricing"}
							/>
							<Link
								linkText={"Team"}
							/>
						</LinkList>
						<LinkList>
							<Title
								html={"Group 2"}
							/>
							<Link
								linkText={"Privacy Policy"}
							/>
							<Link
								linkText={"Terms"}
							/>
							<Link
								linkText={"FAQ"}
							/>
						</LinkList>
						<AboutWrapper>
							<Title
								html={"About us"}
							/>
							<Description
								html={"AUTO1 is disrupting the automotive industry. Most of the things we do have never been done before."}
							/>

						</AboutWrapper>
						<SocialWrapper>
							<div>
								<Title
									html={"Follow Us"}
								/>
							</div>
							<FollowList>
								<a href="#"><SocialIcon icon={faFacebook} /></a>
								<a href="#"><SocialIcon icon={faTwitter} /></a>
								<a href="#"><SocialIcon icon={faInstagram} /></a>
								<a href="#"><SocialIcon icon={faPinterest} /></a>
								<a href="#"><SocialIcon icon={faPinterest} /></a>
							</FollowList>
						</SocialWrapper>
					</FooterInfo>
					<div>
						<Copyright
							html={"© 2019 GitHub, Inc. All rights reserved."}
						/>
					</div>
				</FooterContainer>
			</Section>
		)
	}
}

Footer2.defaultSettings = {
	linkColor: "#797F8E",
}

export default Footer2;
