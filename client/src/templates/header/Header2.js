import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import EditableDiv from 'react-contenteditable';

import { changeTitle, changeLogo } from './../../store/actions';
import Image from './../../components/Image';

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
	color: ${props => props.logoColor || 'white'};
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

	render() {
		const { settings } = this.props;
		const { logoImage, logo, logoText } = settings;
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
								logoColor={settings.logoColor}
							/>
					}
				</LogoWrapper>
				<LinkWrapper>
					<UL>
						<LI>Home</LI>
						<LI>About</LI>
						<LI>Contact</LI>
					</UL>
				</LinkWrapper>
				<LinkWrapper>
					<UL>
						<LI>
							<FontAwesomeIcon icon={faFacebook} />
						</LI>
						<LI>
							<FontAwesomeIcon icon={faTwitter} />
						</LI>
						<LI>
							<FontAwesomeIcon icon={faInstagram} />
						</LI>
						<LI>
							<FontAwesomeIcon icon={faTwitter} />
						</LI>
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
	backgroundColor: '#fff',
	logo: 'Froala',
	logoText: 'Froala',
	logoImage: false,
	logoColor: '#fff',
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
