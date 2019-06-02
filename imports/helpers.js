import { _ } from 'meteor/underscore';

const getObjProperty= (containerObj, str, defaultValueArg)=>{
	var defaultValue = typeof defaultValueArg !== 'undefined' ? defaultValueArg : null;
	try {
		return _(str.split('.')).reduce(function(obj, key) {
			return obj[key];
		}, containerObj);
	} catch (e) {
		return defaultValue;
	}
}

export { 
  getObjProperty
};