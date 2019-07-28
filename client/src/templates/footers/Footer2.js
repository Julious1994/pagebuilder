import React from 'react';
import styled from 'styled-components';
import EditableDiv from 'react-contenteditable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as brandIcons from '@fortawesome/free-brands-svg-icons';

import Section from './../components/Section';
import Link from './../components/Link';
import SocialLink from './../components/SocialLink';

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
	state = {
		isOpen: false,
	}

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
		const { linkGroup1, linkGroup2, socialIconGroup } = settings;
		return (
			<Section>
				<FooterContainer>
					<FooterInfo>
						<LinkList>
							<Title
								html={settings.groupTitle1}
								disabled={!editable}
								onChange={(e) => onChange('groupTitle1', e.target.value)}
							/>
							{
								linkGroup1.map((link, i) => (
									<Link
										key={i}
										color="#797F8E"
										link={link}
										linkSetting={() => this.setState({ isOpen: !this.state.isOpen })}
										editable={editable}
										onSettingChange={(link) => this.handleLinkChange(link, i, 'linkGroup1')}
									/>
								))
							}
						</LinkList>
						<LinkList>
							<Title
								html={settings.groupTitle2}
								disabled={!editable}
								onChange={(e) => onChange('groupTitle2', e.target.value)}
							/>
							{
								linkGroup2.map((link, i) => (
									<Link
										key={i}
										color="#797F8E"
										link={link}
										linkSetting={() => this.setState({ isOpen: !this.state.isOpen })}
										editable={editable}
										onSettingChange={(link) => this.handleLinkChange(link, i, 'linkGroup2')}
									/>
								))
							}

						</LinkList>
						<AboutWrapper>
							<Title
								html={settings.aboutTitle}
								disabled={!editable}
								onChange={(e) => onChange('aboutTitle', e.target.value)}
							/>
							<Description
								html={settings.aboutDescription}
								disabled={!editable}
								onChange={(e) => onChange('aboutDescription', e.target.value)}
							/>

						</AboutWrapper>
						<SocialWrapper>
							<div>
								<Title
									html={settings.followTitle}
									disabled={!editable}
									onChange={(e) => onChange('followTitle', e.target.value)}
								/>
							</div>
							<FollowList>
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
							</FollowList>
						</SocialWrapper>
					</FooterInfo>
					<div>
						<Copyright
							html={settings.copyright}
							disabled={!editable}
							onChange={(e) => onChange('copyright', e.target.value)}
						/>
					</div>
				</FooterContainer>
			</Section>
		)
	}
}

Footer2.defaultSettings = {
	linkColor: "#797F8E",
	backgroundColor: undefined,
	color: 'initial',
	groupTitle1: 'Group1',
	groupTitle2: 'Group2',
	aboutTitle: 'About us',
	followTitle: 'Follow us',
	copyright: '© 2019 GitHub, Inc. All rights reserved.',
	aboutDescription: 'AUTO1 is disrupting the automotive industry. Most of the things we do have never been done before.',
	linkGroup1: [
		{ href: '/team', title: 'Home', },
		{ href: '#', title: 'Features', },
		{ href: '#', title: 'Pricing', },
		{ href: '#', title: 'Team', },
	],
	linkGroup2: [
		{ href: '/home', title: 'Privacy Policy', },
		{ href: '#', title: 'Terms', },
		{ href: '#', title: 'FAQ', },
	],
	socialIconGroup: [
		{ href: '#', icon: 'faFacebook'},
		{ href: '#', icon: 'faTwitter'},
		{ href: '#', icon: 'faInstagram'},
		{ href: '#', icon: 'faPinterest'},
	],
}

Footer2.settings = {
	backgroundColor: 'color',
	linkColor: 'color',
	color: 'color',
	linkGroup1: 'increment',
}

export default Footer2;
