import * as api from '../../api'
import {FETCH_ALL,CREATE,UPDATE,DELETE,FETCH_POST,FETCH_BY_SEARCH,START_LOADING,END_LOADING} from '../types/actionTypes';


export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data : {data} } = await api.fetchPosts(page); // get res from api and destructure the data object
    // console.log(data);
    dispatch({type : FETCH_ALL , payload : {data}}); // action = {type: '', payload: [object] }
    dispatch({type : END_LOADING});
  } catch (error) {
    console.log(error.message);
    return {data : 'there is a problem fetching the data'}
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const { data:{data} } = await api.fetchPostsBySearch(searchQuery);
    // console.log(data);
    dispatch({ type:FETCH_BY_SEARCH,payload: {data} });
    dispatch({type : END_LOADING});
  } catch (error) {
    console.log(error.message)
  }
}

export const createPost = (post,navigate)=>  async (dispatch) => {
  try {
    dispatch({type:START_LOADING});
    const {data} = await api.CreatePost(post);
    console.log(data);
    //renavigate
    navigate(`/${data._id}`);
    dispatch({type: CREATE,payload: data});
    dispatch({type : END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
}

//update
export const updatePost = (id,post) => async (dispatch) => {
  try {
    const {data} = await api.UpdatePost(id,post);
    dispatch({type: UPDATE,payload: data});
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

//delete
export const deletePost = (id,post)=> async (dispatch) => {
  try {
    await api.DeletePost(id,post);
    dispatch({type: DELETE,payload: id});
    window.location.reload();
  } catch (error) {
    console.log(error.message);
  }
}
