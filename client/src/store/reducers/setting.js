import { HIDE_SETTING, SHOW_SETTING, TOGGLE_COMPONENT_SETTING, TOGGLE_PALLETE } from '../actionType';
import { produce } from 'immer';

import { level } from './../../constant';

const initialState = {
	open: false,
	level: level.GLOBAL,
	id: null,
	pageId: null,
	type: 'content',
	templateIndex: null,
	componentSetting: {
		templateIndex: null,
		type: 'content',
	}
};

export default function(state=initialState, action) {
	const { payload } = action;
	switch(action.type) {
		case SHOW_SETTING: {
			const { block } = payload;
			return produce(state, draft => {
				draft.open = true;
				draft.showPallete = true;
				draft.level = payload.level;
				if(payload.level === level.COMPONENT) {
					draft.id = block.component;
					draft.type = payload.type
					if(payload.type === 'content') {
						draft.templateIndex = payload.index;
					}
				}
				if(payload.pageId) {
					draft.pageId = payload.pageId;
				}
			});
		}
		case TOGGLE_PALLETE: {
			return produce(state, draft => {
				draft.showPallete = !state.showPallete;
			});
		}
		case HIDE_SETTING: {
			return produce(state, draft => {
				draft.open = false;
				draft.level = level.GLOBAL;
				draft.showPallete = true;
			});
		}
		case TOGGLE_COMPONENT_SETTING: {
			return produce(state, draft => {
				draft.componentSetting.templateIndex = payload.index;
				draft.componentSetting.type = payload.type;
				draft.showPallete = true;
			});
		}
		default:
			return state;
	}
}

