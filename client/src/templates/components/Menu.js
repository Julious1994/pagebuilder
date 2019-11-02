import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from './Link';

const popupStyle = {
	top: 'unset !important',
	left: '-200px !important',
	zIndex: 1000,
};

const UL = styled.ul`
	list-style: none;
	display: flex;
	color: white;
	cursor: pointer;
`;

const LI = styled.li`
	padding: 5px;
	position: relative;
	display: inline;
	${props => !props.editable &&
		`&:hover > ul {
			display: block;
		}`
	}
	${props => props.editable && props.active &&
		`& > ul {
			display: block;
		}`
	}
`;

const SubmenuItem = styled.li`
	padding: 10px;
	background-color: black;
	${props => !props.editable &&
		`&:hover > ul {
			display: inline-block;
			top: 0;
			left: 100%;
		}`
	}
	${props => props.editable && props.active &&
		`& > ul {
			display: inline-block;
			top: 0;
			left: 100%;
		}`
	}
	position: relative;
	width: 125px;
`;

const SubmenuTitle = styled.span`
	white-space: nowrap;
`;

const SubMenu = styled.ul`
	position: absolute;
	list-style: none;
	display: none;
	color: white;
	cursor: pointer;
	padding: 0px;
	${props => props.level > 1 && `
		top: 0;
		left: 100%;
	`}
`;

const LinkContent = styled.div`
	display: flex;
	justify-content: space-between;
`;

class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			menuIndex: null,
			subIndex: [],
			selectedLevel: [],
		}
	}

	handleLinkChange = (level, index, link, operation) => {
		const { menuIndex } = this.state;
		const { menuList, onMenuChange } = this.props;
		if(level === 0) {
			if(operation === 'add') {
				menuList.splice(index, 0, {title: link.title, href: link.href});
			} else if(operation === 'remove') {
				menuList.splice(index, 1);
			} else if(operation === 'subLink') {
				const sbLink = { title: `Sub ${link.title}`, href: link.href };
				const menuItem = menuList[index];
				if(menuItem.subLinks && Array.isArray(menuItem.subLinks)) {
					menuItem.subLinks.push(sbLink);
				} else {
					menuItem.subLinks = [sbLink];
				}
				menuList[index] = menuItem;
			} else {
				menuList[menuIndex] = {...link};
			}
		} else {
			let menu = menuList[menuIndex];
			const item = { index, level, link };
			menu = this.changeSubLink(menu, item, 1, operation)
			menuList[menuIndex] = menu;
		}
		onMenuChange && onMenuChange(menuList);
	}

	changeSubLink(menu, item, level, operation) {
		const { subIndex } = this.state;
		if(level === item.level) {
			const { link } = item;
			if(operation === 'add') {
				menu.subLinks.splice(item.index, 0, {title: link.title, href: link.href});
			} else if(operation === 'remove') {
				menu.subLinks.splice(item.index, 1);
			} else if(operation === 'subLink') {
				const sbLink = { title: `SUb ${link.title}`, href: link.href };
				const menuItem = menu.subLinks[item.index];
				if(menuItem.subLinks && Array.isArray(menuItem.subLinks)) {
					menuItem.subLinks.push(sbLink);
				} else {
					menuItem.subLinks = [sbLink];
				}
				menu.subLinks[item.index] = menuItem;
			} else {
				menu.subLinks[item.index] = {...item.link};
			}
			return menu;
		}
		const elementIndex = subIndex[level-1];
		const subMenu = menu.subLinks[elementIndex];
		menu.subLinks[elementIndex] = this.changeSubLink(subMenu, item, level + 1, operation);

		return menu;
	}

	renderMenuItem(level, menu, index) {
		const { editable } = this.props;
		const { menuIndex } = this.state;
		return(
			<LI key={index} editable={editable} active={index === menuIndex}>
				<Link
					link={menu}
					editable={editable}
					popupStyle={popupStyle}
					onMenuClick={() => this.menuClick(index, level)}
					onAddLink={() => this.handleLinkChange(level, index, menu, 'add')}
					onRemoveLink={() => this.handleLinkChange(level, index, menu, 'remove')}
					onAddChildLink={() => this.handleLinkChange(level, index, menu, 'subLink')}
					onSettingChange={(link) => this.handleLinkChange(level, index, link)}
				>
					<span>{menu.title}</span>
				</Link>
				{
					menu.subLinks && Array.isArray(menu.subLinks) &&
					this.renderSubMenu(level+1, menu.subLinks)
				}
			</LI>
		)
	}

	renderSubMenu(level, links) {
		return(
			<SubMenu>
				{
					links.map((link, i) => (
						this.renderSubMenuItem(level, link, i)
					))
				}
			</SubMenu>
		)
	}

	menuClick = (menuIndex, level) => {
		console.log('menu click', menuIndex, level);
		const { menuIndex: selectedMenuIndex } = this.state;
		if(selectedMenuIndex === menuIndex) {
			this.setState({ menuIndex: null, selectedLevel: [], subIndex: []});
		} else {
			this.setState({ menuIndex, selectedLevel: [level], subIndex: [] });
		}
	}

	subMenuClick = (subIndex, level) => {
		console.log('sub click', subIndex, level);
		const { subIndex: subList, selectedLevel } = this.state;
		if(!selectedLevel.includes(level)) {
			selectedLevel.push(level);
			subList.push(subIndex);
		} else {
			subList.splice(0, subList.length);
			subList.push(subIndex);
		}
		this.setState({ subIndex: subList, selectedLevel });
	}

	renderSubMenuItem(level, link, index) {
		const { editable } = this.props;
		const { selectedLevel, subIndex } = this.state;
		const { subLinks = [] } = link;
		const links = Array.isArray(subLinks) ? subLinks : [];
		const hasLinks = links.length > 0;
		console.log('leve', level, index, selectedLevel, subIndex, link.title);
		return(
			<SubmenuItem
				level={level}
				key={index}
				editable={editable}
				active={
					subIndex.includes(index) && selectedLevel.includes(level)
				}
			>
				<Link
					link={link}
					editable={editable}
					popupStyle={popupStyle}
					onAddLink={() => this.handleLinkChange(level, index, link, 'add')}
					onRemoveLink={() => this.handleLinkChange(level, index, link, 'remove')}
					onAddChildLink={() => this.handleLinkChange(level, index, link, 'subLink')}
					onSettingChange={(link) => this.handleLinkChange(level, index, link)}
					onMenuClick={() => {
						link.subLinks && Array.isArray(link.subLinks) && link.subLinks.length &&
						this.subMenuClick(index, level)
					}}
				>
					<LinkContent>
						<SubmenuTitle>{link.title}</SubmenuTitle>
						{
							hasLinks &&
							<FontAwesomeIcon icon={faChevronRight} />
						}
					</LinkContent>
				</Link>
				{
					link.subLinks && Array.isArray(link.subLinks) &&
					this.renderSubMenu(level+1, link.subLinks)
				}
			</SubmenuItem>
		)
	}

	render() {
		const { menuList } = this.props;
		return(
			<UL>
				{
					menuList.map((menuItem, i) => (
						this.renderMenuItem(0, menuItem, i)
					))
				}
			</UL>
		)
	}
}

export default Menu;
