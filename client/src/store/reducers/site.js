import { produce } from 'immer';
import { headers, contents, footers } from '../../core/templateMapper';
import { level as levels } from './../../constant';
import { swapElement } from './../reducer.helper';
import { openComponentSetting } from './../actions';
import {
	CHANGE_TITLE,
	CHANGE_LOGO,
	SET_COMPONENT,
	CHANGE_SETTING,
	MOVE_DOWN,
	MOVE_UP,
	CLOSE_SAVE_DIALOG,
	SAVE_SITE,
} from './../actionType';

const initialState = {
	site: {
		_id: 1,
		header: null,
		footer: null,
		isArticle: false,
		pages: [
			{
				title: 'About Us',
				slug: 'about-us',
				path: '/about-us',
				meta: { key: '', description: '' },
				page_css: '',
				page_js: '',
				content: [],
				state: {},
			}
		],
	},
	currentPageIndex: 0,
	saveDialog: false,
	editable: true,
};

export default function(state = initialState, action) {
	const { payload } = action;
	switch(action.type) {
		case CHANGE_TITLE: {
			return produce(state, draft => {
				draft.title = payload.title;
			});
		}
		case CHANGE_LOGO: {
			return produce(state, draft => {
				draft.logo = payload.logo;
			});
		}
		case SET_COMPONENT: {
			const { component } = payload;
			const { type, defaultProps = {} } = component;
			if(type === 'content') {
				const { site, currentPageIndex } = state;
				const Component = contents[component.component] || {};
				const block = Component.component;
				return produce(state, draft => {
					const page = draft.site.pages[draft.currentPageIndex];
					const blockState = {...block.defaultSettings, ...defaultProps};
					page.content.push({ ...component, state: {...blockState}, style: {}});
					draft.site.pages[currentPageIndex] = page;
				});
			} else {
				const mapper = type === 'header' ? headers :footers;
				const Component = mapper[component.component] || {};
				const block = Component.component;
				return produce(state, draft => {
					const blockState = JSON.parse(JSON.stringify(block.defaultSettings));
					draft.site[type] = {
						...draft.site[type],
						...component,
						state: {
							...blockState,
						},
					};
				});
			}
		}
		case CHANGE_SETTING: {
			const { level, index, block, type } = payload;
			if(level === levels.COMPONENT) {
				const newState =
					produce(state, draft => {
						const page = draft.site.pages[draft.currentPageIndex];
						if(type === 'content') {
							page.content[index] = {...block};
						} else {
							draft.site[type] = {...block};
						}
						draft.site.pages[draft.currentPageIndex] = {...page};
					});
				return newState;
			} else if(level === levels.PAGE) {
				const newState = produce(state, draft => {
					const page = draft.site.pages[draft.currentPageIndex];
					page.state = block.state;
					draft.site.pages[draft.currentPageIndex] = {...page};
				});
				return newState;
			} else if (level === levels.GLOBAL) {
				const newState = produce(state, draft => {
					draft.site = {...block};
				});
				return newState;
			}
			return state;
		}
		case MOVE_UP: {
			const { index } = payload;
			if(index > 0) {
				const { site, currentPageIndex } = state;
				return produce(state, draft => {
					const page = draft.site.pages[draft.currentPageIndex];
					page.content = swapElement(page.content, index - 1, index);
					draft.site.pages[draft.currentPageIndex] = {...page};
				});
			}
			return state;
		}
		case MOVE_DOWN: {
			const { index } = payload;
			return produce(state, draft => {
				const page = draft.site.pages[draft.currentPageIndex];
				const contentLength = page.content.length;
				if(contentLength - 1 > index) {
					page.content = swapElement(page.content, index, index + 1);
					draft.site.pages[draft.currentPageIndex] = {...page};
				}
			});
			return state;
		}
		case SAVE_SITE: {
			return produce(state, draft => {
				draft.saveDialog = true;
			});
		}
		case CLOSE_SAVE_DIALOG: {
			return produce(state, draft => {
				draft.saveDialog = false;
			});
		}
		default:
			return state;
	}
}
