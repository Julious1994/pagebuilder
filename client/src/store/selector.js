import { level as levels } from './../constant';
import templateMapper from './../core/templateMapper';

export const getBlock = (id, level, site, pageId, type) => {
	const page = site.pages[pageId];
	console.log(id, level, site,pageId)
	if(page) {
		if(level === levels.COMPONENT) {
			if(type === 'content') {
				const content = page.content || [];
				console.log(content, id);
				return content[id];
			} else {
				if(site[type]) {
					return site[type];
				}
			}
		}
	}
	return {};
}

export const getPageContent = (pages, pageIndex) => {
	const page = pages[pageIndex];
	console.log(page, pages, pageIndex);
	return page.content;
}
