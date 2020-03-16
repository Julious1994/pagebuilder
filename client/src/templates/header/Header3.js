import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import EditableDiv from 'react-contenteditable';

import { changeTitle, changeLogo } from './../../store/actions';
import Image from './../../components/Image';
import {getImage} from './../../common.func';

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	background-color: ${props => props.backgroundColor || 'rgb(20, 157, 204)'};
	height: 60px;
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

	render() {
		const { settings, editable, onChange } = this.props;
		const { logoImage, logo, logoText } = settings;
		let logoSrc = getImage(logo);
		return (
			<Header
				backgroundColor={settings.backgroundColor}
				>
				<div className="container">
					<nav className="navbar">
						<a href="https://www.froala.com">
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
						</a>
					</nav>
				</div>
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
