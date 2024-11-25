import { DATA } from "../constants/dataConst";

export const data_Store = (params) => {
	return (dispatch) => dispatch({ type: DATA, payload: params })
}