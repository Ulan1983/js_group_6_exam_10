import {FETCH_NEWS_SUCCESS, FETCH_SINGLE_POST_SUCCESS} from "./actions";


const initialState = {
	news: [],
	singlePost: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NEWS_SUCCESS:
			return {
				...state,
				news: action.news
			};
		case FETCH_SINGLE_POST_SUCCESS:
			return {
				...state,
				singlePost: action.post
			};
		default:
			return state
	}
};

export default reducer;