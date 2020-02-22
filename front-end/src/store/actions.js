import axiosApi from "../axiosApi";

export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const CREATE_NEW_POST_SUCCESS = 'CREATE_NEW_POST_SUCCESS';
export const FETCH_SINGLE_POST_SUCCESS = 'FETCH_SINGLE_POST_SUCCESS';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const CREATE_NEW_COMMENT_SUCCESS = 'CREATE_NEW_COMMENT_SUCCESS';

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const createNewPostSuccess = () => ({type: CREATE_NEW_POST_SUCCESS});
export const fetchSinglePostSuccess = post => ({type: FETCH_SINGLE_POST_SUCCESS, post});
export const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});
export const createNewCommentSuccess = () => ({type: CREATE_NEW_COMMENT_SUCCESS});


export const fetchNews = () => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/news');
			dispatch(fetchNewsSuccess(response.data));
		} catch (e) {
			console.error('Fetch news failed', e);
		}
	}
};

export const createNewPost = data => {
	return async (dispatch) => {
		try {
			await axiosApi.post('/news', data);
			dispatch(createNewPostSuccess());
			dispatch(fetchNews());
		} catch (e) {
			console.error('Creating post failed', e);
		}
	}
};

export const fetchSinglePost = id => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/news/' + id);
			dispatch(fetchSinglePostSuccess(response.data));
		} catch (e) {
			console.error('Fetch single post failed', e);
		}
	}
};

export const deletePost = id => {
	return async (dispatch) => {
		try {
			await axiosApi.delete('/news/' + id);
			dispatch(fetchNews());
		} catch (e) {
			console.error('Failed post delete', e);
		}
	}
};

export const fetchComments = () => {
	return async (dispatch) => {
		try {
			const response = await axiosApi.get('/comments');
			dispatch(fetchCommentsSuccess(response.data));
		} catch (e) {
			console.error('Fetch comments failed', e);
		}
	}
};

export const createNewComment = data => {
	return async (dispatch) => {
		try {
			await axiosApi.post('/comments', data);
			dispatch(createNewCommentSuccess());
			dispatch(fetchComments());
		} catch (e) {
			console.error('Creating comment failed', e);
		}
	}
};

