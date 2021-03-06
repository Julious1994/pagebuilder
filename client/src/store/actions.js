import {
	SHOW_SETTING,
	HIDE_SETTING,
	CHANGE_TITLE,
	CHANGE_LOGO,
	SET_COMPONENT,
	CHANGE_SETTING,
	TOGGLE_COMPONENT_SETTING,
	MOVE_DOWN,
	MOVE_UP,
	SAVE_SITE,
	CLOSE_SAVE_DIALOG,
	CREATE_PAGE,
	OPEN_PAGE,
	VIEW_PAGE,
	TOGGLE_PALLETE,
} from './actionType';

import Http from './../services/http';

export const openSetting = (level, block, index, type) => {
	return {
	type: SHOW_SETTING,
	payload: { block, level, index, type },
}};

export const togglePallete = () => {
	return {
		type: TOGGLE_PALLETE,
	}
}

export const openPageSetting = (level, index) => {
	return {
	type: SHOW_SETTING,
	payload: { level, pageId: index },
}};

export const hideSetting = () => ({
	type: HIDE_SETTING,
});

export const changeTitle = (title) => ({
	type: CHANGE_TITLE,
	payload: { title }
});

export const changeLogo = (logo) => ({
	type: CHANGE_LOGO,
	payload: { logo },
});

export const setComponent = (component) => ({
	type: SET_COMPONENT,
	payload: { component },
});

export const onSettingChange = (block, level, index, type) => ({
	type: CHANGE_SETTING,
	payload: { block, level, index, type},
});

export const openComponentSetting = (index, type) => ({
	type: TOGGLE_COMPONENT_SETTING,
	payload: { index, type },
});

export const closeComponentSetting = () => ({
	type: TOGGLE_COMPONENT_SETTING,
	payload: { index: null, type: 'content' }
});

export const moveUp = (index, dispatch) => ({
	type: MOVE_UP,
	payload: { index },
	dispatch
});

export const moveDown = (index) => ({
	type: MOVE_DOWN,
	payload: { index },
});

export const closeSaveDialog = () => ({
	type: CLOSE_SAVE_DIALOG,
});

export const saveSite = (site) => {
	const service = new Http();
	service.post("rest/sites/", site).then(res => console.log('res', res));
	return {
		type: SAVE_SITE,
	}
}

export const createPage = (page) => {
	return {
		type: CREATE_PAGE,
		payload: { page }
	}
}

export const openPage = (pageIndex) => {
	console.log(pageIndex);
	return {
		type: OPEN_PAGE,
		payload: { pageIndex },
	}
}

export const viewPage = () => {
	return {
		type: VIEW_PAGE,
	}
}
