import {
	SHOW_SETTING,
	HIDE_SETTING,
	CHANGE_TITLE,
	CHANGE_LOGO,
	SET_COMPONENT,
	CHANGE_SETTING,
	TOGGLE_COMPONENT_SETTING
} from './actionType';

export const openSetting = (block, level, index, type) => {
	console.log(index);
	return {
	type: SHOW_SETTING,
	payload: { block, level, index, type },
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
})
