import { dataStore } from "./dataReducer";

function rootReducer(state = {}, action) {
	return {
		data: dataStore(state.data, action),
	};
}

export default rootReducer;
