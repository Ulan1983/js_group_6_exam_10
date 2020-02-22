import {
	FETCH_COMMENTS_BY_ID_SUCCESS,
	FETCH_COMMENTS_SUCCESS,
	FETCH_NEWS_SUCCESS,
	FETCH_SINGLE_POST_SUCCESS
} from "./actions";


const initialState = {
	news: [],
	singlePost: null,
	comments: [],
	commentsById: []
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
		case FETCH_COMMENTS_SUCCESS:
			return {
				...state,
				comments: action.comments
			};
		case FETCH_COMMENTS_BY_ID_SUCCESS:
			return {
				...state,
				commentsById: action.comments
			};
		default:
			return state
	}
};

export default reducer;