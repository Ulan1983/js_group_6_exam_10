import {FETCH_NEWS_SUCCESS} from "./actions";


const initialState = {
	news: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NEWS_SUCCESS:
			return {
				...state,
				news: action.news
			};
		default:
			return state
	}
};

export default reducer;