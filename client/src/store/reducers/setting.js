import { HIDE_SETTING, SHOW_SETTING } from '../actionType';
import { produce } from 'immer';

import { level } from './../../constant';

const initialState = {
	open: false,
	level: level.GLOBAL,
	id: null,
	pageId: null,
	type: 'content',
};

export default function(state=initialState, action) {
	const { payload } = action;
	switch(action.type) {
		case SHOW_SETTING: {
			return produce(state, draft => {
				draft.open = true;
				draft.level = payload.level;
			});
		}
		case HIDE_SETTING: {
			return produce(state, draft => {
				draft.open = false;
				draft.level = level.GLOBAL;
			});
		}
		default:
			return state;
	}
}

