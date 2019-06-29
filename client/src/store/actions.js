import { SHOW_SETTING, HIDE_SETTING } from './actionType';

export const openSetting = (level) => {
	console.log(level);
	return {
	type: SHOW_SETTING,
	payload: { level },
}};

export const hideSetting = () => ({
	type: HIDE_SETTING,
});
