import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddRecordMutation,
  useLazyGetAllPostsQuery,
  useUpdateRecordMutation,
} from "../../Services/PostApi";
import { successToast } from "../../shared/components/toast";
import { POST_TAG } from "../../shared/tagFile";
import { getAllPosts } from "./PostSlice";

const Post = () => {
  const [id, setId] = useState(0);
  const [postDetail, setPostDetail] = useState();
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post);
  const [addPost, { isLoading: isPostAddLoading }] = useAddRecordMutation();
  const [updatePost, { isLoading: isPostUpdateLoading }] =useUpdateRecordMutation();

  const [
    getPost,
    {
      data: postList,
      isError: isPostError,
      isLoading: isPostLoading,
      isFetching: isPostFetching,
    },
  ] = useLazyGetAllPostsQuery();

  useEffect(() => {
    getPost({
      tag: POST_TAG,
    });
  }, []);

  useEffect(() => {
    setPostDetail(postData.posts);
  }, [postData]);

  useEffect(() => {
    if (!isPostLoading && !isPostError && postList && !isPostFetching) {
      dispatch(getAllPosts(postList));
    }
  }, [isPostError, postList, isPostLoading, isPostFetching]);

  const clear = () => {
    setUserId(0);
    setTitle("");
    setBody("");
  };
  const handleAdd = () => {
    const postData = {
      title: title,
      body: body,
      userId: userId,
    };
    addPost({
      data: postData,
      tag: POST_TAG,
    });
    addPost({
      data: postData,
      tag: POST_TAG,
    }).then((response) => {
      if (!response.error) {
        clear()
        successToast("Post added successfully.");
      }
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
          <h4>Add Post</h4>
          <div>
            <label>User ID : </label>
            <input
              type="text"
              name="useId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <br />
            <label>Title : </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label>Body : </label>
            <input
              type="text"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <br />
            <button onClick={handleAdd}>
              {isPostAddLoading ? "Adding" : "Add Post"}
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "400px" }}>
          {postDetail &&
            postDetail.map((item, index) => (
              <div key={index}>
                <h5>
                  {item.id} . {item.title}
                </h5>
                <h6>{item.body}</h6>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
