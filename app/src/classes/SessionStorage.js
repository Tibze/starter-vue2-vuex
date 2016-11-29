let instance = null;
export default class {
	constructor(options){
		if(!instance)instance = this;
        return instance;
	}
	static set(key, value) {
		if (typeof(value) == 'object') {
			value = JSON.stringify(value);
		}
		window.sessionStorage[key] = value;
	}
	static get(key) {
		if (typeof(JSON.parse(window.sessionStorage[key])) == 'object') {
			return JSON.parse(window.sessionStorage[key]);
		} else {
			return window.sessionStorage[key] || null;
		}
	}
}    
