import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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
	background-color: rgb(20, 157, 204);
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

const LogoText = styled.div`
	font-weight: bolder;
	color: white;
	font-size: 2em;
`;


class HeaderTemplate extends Component {
	constructor(props) {
		super(props);
		this.titleDiv = React.createRef();
	}
	render() {
		const { settings, changeTitle, title, logo, changeLogo } = this.props;
		const { logoImage, logoText, logoAlt } = settings;
		let logoSrc = logo;
		if(logo && logo.name) {
			logoSrc = window.URL.createObjectURL(logo)
		}
		console.log(settings);
		return (
			<Header>
				<LogoWrapper>
					{
						logo ?
							<Image src={logoSrc} editable={true} onChange={changeLogo}  />
							// <img src={logoSrc} alt={logoAlt} />
							:
							<LogoText
								suppressContentEditableWarning={true}
								contentEditable="true"
								onFocus={(e) => console.log(e)}
								onInput={e => {
									changeTitle(e.currentTarget.textContent);
									console.log('xx', this.titleDiv);
								}}
								ref={e => this.titleDiv = e}
							>
								{title}
							</LogoText>
					}
				</LogoWrapper>
				<LinkWrapper>
					<UL>
						<LI>Home</LI>
						<LI>About</LI>
						<LI>Contact</LI>
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
}

HeaderTemplate.settings = {
	title: 'string',
	logo: 'url',
	backgroundColor: 'color',
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
