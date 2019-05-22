import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST, CLEAR_ERRORS } from './types';

export const addPost = postData => dispatch => {
	dispatch(clearErrors());
	axios.post('/api/posts', postData)
	.then(res => dispatch({
		type: ADD_POST,
		payload: res.data
	}))
	.catch(error => dispatch({
		type: GET_ERRORS,
		payload: error.response.data
	}));
};

export const getPosts = () => dispatch => {
	dispatch(setPostLoading());
	axios.get('/api/posts')
	.then(res => dispatch({
		type: GET_POSTS,
		payload: res.data
	}))
	.catch(error => dispatch({
		type: GET_POSTS,
		payload: null
	}));
};

export const getPost = id => dispatch => {
	dispatch(setPostLoading());
	axios.get(`/api/posts/${id}`)
	.then(res => dispatch({
		type: GET_POST,
		payload: res.data
	}))
	.catch(error => dispatch({
		type: GET_POST,
		payload: null
	}));
};

export const deletePost = id => dispatch => {
	axios.delete(`/api/posts/${id}`)
	.then(res => dispatch({
		type: DELETE_POST,
		payload: id
	}))
	.catch(error => dispatch({
		type: GET_ERRORS,
		payload: error.response.data
	}));
};

export const addUpvote = id => dispatch => {
	axios.post(`/api/posts/upvote/${id}`)
	.then(res => dispatch(getPosts()))
	.catch(error => dispatch({
		type: GET_ERRORS,
		payload: error.response.data
	}));
};

export const addComment = (postId, commentData) => dispatch => {
	dispatch(clearErrors());
	axios.post(`/api/posts/comment/${postId}`, commentData)
	.then(res => dispatch({
		type: GET_POST,
		payload: res.data
	}))
	.catch(error => dispatch({
		type: GET_ERRORS,
		payload: error.response.data
	}));
};

export const deleteComment = (postId, commentId) => dispatch => {
	axios.delete(`/api/posts/comment/${postId}/${commentId}`)
	.then(res => dispatch({
		type: GET_POST,
		payload: res.data
	}))
	.catch(error => dispatch({
		type: GET_ERRORS,
		payload: error.response.data
	}));
};

export const removeUpvote = id => dispatch => {
	axios.post(`/api/posts/removeupvote/${id}`)
	.then(res => dispatch(getPosts()))
	.catch(error => dispatch({
		type: GET_ERRORS,
		payload: error.response.data
	}));
};

export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};