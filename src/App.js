import { useEffect } from 'react';
import './App.css';
import { useAddRecordMutation, useDeleteRecordMutation, useGetAllPostsByIdQuery, useGetAllPostsByLimitQuery, useLazyGetAllPostsQuery, useUpdateRecordMutation } from './Services/PostApi.js';
import { errorToast } from './shared/components/toast';
import { POST_TAG } from './shared/tagFile';
  import 'react-toastify/dist/ReactToastify.css';
import Post from './components/Post/Post';

function App() {

  //Deleting Records
  // const [deletePost, responseInfo] = useDeleteRecordMutation(2)
  // console.log("responseInfo", responseInfo);

  return (
    <div className="App">
      <Post/>
    </div>
  );
}

export default App;
