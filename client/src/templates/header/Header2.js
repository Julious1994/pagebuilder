import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import EditableDiv from 'react-contenteditable';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';


import { changeTitle, changeLogo } from './../../store/actions';
import Image from './../../components/Image';
import SocialLink from './../components/SocialLink';
import Link from './../components/Link';

const LogoWrapper = styled.div`
	margin-top: 10px;
	padding-left: 5px;
`;

const LinkWrapper = styled.div`
	padding-right: 5px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${props => props.backgroundColor || 'rgb(20, 157, 204)'};
`;

const UL = styled.ul`
	list-style: none;
	display: flex;
	color: white;
	cursor: pointer;
`;

const LI = styled.li`
	padding: 5px;
`;

const LogoText = styled(EditableDiv)`
	font-weight: bolder;
	color: ${props => props.color || 'white'};
	font-size: 2em;
`;


class HeaderTemplate extends Component {
	constructor(props) {
		super(props);
		this.titleDiv = React.createRef();
	}

	handleChange = (img) => {
		const { onChange } = this.props;
		onChange('logo', img);
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
		const { logoImage, logo, logoText, socialIconGroup, links } = settings;
		let logoSrc = logo;
		if(logo && logo.name) {
			logoSrc = window.URL.createObjectURL(logo)
		}
		return (
			<Header
				backgroundColor={settings.backgroundColor}
			>
				<LogoWrapper>
					{
						logoImage ?
							<Image src={logoSrc} editable={true} onChange={this.handleChange}  />
							:
							<LogoText
								html={logoText || ''}
								disabled={!editable}
								color={settings.logoColor}
								onChange={(e) => onChange('logoText', e.target.value)}
							/>
					}
				</LogoWrapper>
				<LinkWrapper>
					<UL>
						{
							links.map((link, i) => (
								<LI key={i}>
									<Link
										color="#fff"
										key={i}
										link={link}
										editable={editable}
										onSettingChange={(link) => this.handleLinkChange(link, i, 'links')}
									/>
								</LI>
							))
						}
					</UL>
				</LinkWrapper>
				<LinkWrapper>
					<UL>
						{
							socialIconGroup.map((link, i) => (
								<LI key={i}>
									<SocialLink
										editable={editable}
										link={link}
										onSettingChange={(link) => this.handleLinkChange(link, i, 'socialIconGroup')}
									>
										<FontAwesomeIcon icon={brandIcons[link.icon]} />
									</SocialLink>
								</LI>
							))
						}
					</UL>
				</LinkWrapper>
			</Header>
		)
	}
}

HeaderTemplate.defaultProps = {
	settings: {
		logoText: "Demo logo",
	},
};

HeaderTemplate.defaultSettings = {
	backgroundColor: 'rgb(20, 157, 204)',
	logo: 'Froala',
	logoText: 'Froala',
	logoImage: false,
	logoColor: '#fff',
	links: [
		{ href: '#', title: 'Home', },
		{ href: '#', title: 'About', },
		{ href: '#', title: 'Contact', },
	],
	socialIconGroup: [
		{ href: '#', icon: 'faFacebook'},
		{ href: '#', icon: 'faTwitter'},
		{ href: '#', icon: 'faInstagram'},
		{ href: '#', icon: 'faPinterest'},
	]
}

HeaderTemplate.settings = {
	logoText: 'string',
	backgroundColor: 'color',
	logoImage: 'boolean',
	logoColor: 'color',
};

const mapDispatchToProps = (dispatch) => ({
	changeTitle: (title) => dispatch(changeTitle(title)),
	changeLogo: (logo) => dispatch(changeLogo(logo))
});

const mapStateToProps = state => ({
	title: state.sites.title,
	logo: state.sites.logo,
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderTemplate);
