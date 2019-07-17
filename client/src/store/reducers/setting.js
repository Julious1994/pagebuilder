import { HIDE_SETTING, SHOW_SETTING, TOGGLE_COMPONENT_SETTING } from '../actionType';
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
		case HIDE_SETTING: {
			return produce(state, draft => {
				draft.open = false;
				draft.level = level.GLOBAL;
			});
		}
		case TOGGLE_COMPONENT_SETTING: {
			return produce(state, draft => {
				draft.componentSetting.templateIndex = payload.index;
				draft.componentSetting.type = payload.type;
			});
		}
		default:
			return state;
	}
}

