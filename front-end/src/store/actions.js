import axiosApi from "../axiosApi";

export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const CREATE_NEW_POST_SUCCESS = 'CREATE_NEW_POST_SUCCESS';

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const createNewPostSuccess = () => ({type: CREATE_NEW_POST_SUCCESS});


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