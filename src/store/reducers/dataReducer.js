import { DATA } from "../constants/dataConst";

export const dataStore = (state = {}, action) => {
	switch (action.type) {
		case DATA: { return { ...state, data: action.payload } }

		default: { return { ...state } }
	}
};
