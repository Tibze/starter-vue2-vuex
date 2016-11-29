let instance = null;
let wishlist = [];

export default class {
	constructor(options){
		if(!instance)instance = this;
        return instance;
	}
	static set(key, value) {

		if (typeof(value) == "object") {
			value = JSON.stringify(value);
		}
		window.localStorage[key] = value;
	}
	static get(key) {
		if (typeof(window.localStorage[key]) == 'object') {
			return JSON.parse(window.localStorage[key]);
		} else {
			return window.localStorage[key] || null;
		}
	}			
}
