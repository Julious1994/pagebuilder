export function getImage(img) {
	let imgSrc = img;
	if(img && img.name) {
		imgSrc = window.URL.createObjectURL(img)
	} else if(!img.startsWith("data:")) {
		imgSrc = `./images/${img}`
	}
	return imgSrc;
}
