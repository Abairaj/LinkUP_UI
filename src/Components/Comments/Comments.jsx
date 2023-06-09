import React, { useEffect, useState } from "react";
import "./comments.scss";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import {
  useCreateCommentMutation,
  useFetchCommentQuery,
} from "../../Redux/Query/CommentQuery";
import { useNavigate } from "react-router-dom";
import { getDuration } from "../helpers";
import { useSocket } from "../../SocketProvider";

const Comments = ({ post }) => {
  const socket = useSocket();
  const user = useSelector((state) => state.user);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [
    createComment,
    { isLoading: isCreatingComment, error: createCommentError },
  ] = useCreateCommentMutation();
  const {
    data: commentsData,
    isLoading: isFetchingComments,
    error: fetchCommentsError,
    refetch: refetchComments,
  } = useFetchCommentQuery(post.post_id);

  const [commentContent, setCommentContent] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [visibleComments, setVisibleComments] = useState(3); // Number of comments to initially show

  const addComments = () => {
    createComment({
      user: post.user.id,
      post: post.post_id,
      content: commentContent,
    })
      .unwrap()
      .then((response) => {
        console.log(response);
        socket.send(
          JSON.stringify({
            event: "notification",
            content: `${user.username} commented on your post`,
            from: user.id,
            to: post.user.id,
            type: "comment",
          })
        );
        setCommentContent("");
        // Refresh comments after successful creation
        refetchComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleShowAllComments = () => {
    setShowAllComments((prevShowAllComments) => !prevShowAllComments);
  };

  useEffect(() => {
    // Fetch comments when the component mounts
    refetchComments(post.post_id);
  }, [refetchComments, post.post_id]);

  return (
    <div className="comments">
      <div className="write">
        {user.profile ? (
          <img src={user.profile} alt="" />
        ) : (
          <Avatar>{user.username[0]}</Avatar>
        )}

        <input
          type="text"
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
          placeholder="Write a comment"
        />
        <button onClick={addComments} disabled={isCreatingComment}>
          {isCreatingComment ? "Adding Comment..." : "Send"}
        </button>
      </div>
      {isFetchingComments ? (
        <div>Loading comments...</div>
      ) : fetchCommentsError ? (
        console.log(fetchCommentsError)
      ) : commentsData && commentsData.length > 0 ? (
        <>
          {commentsData.slice(0, visibleComments).map((comment) => (
            <div className="comment" key={comment.comment_id}>
              <img src={comment.user.profile} alt="" />
              <div className="info">
                <span onClick={() => navigate(`/profile/${comment.user.id}`)}>
                  {comment.user.username}
                </span>
                <p>{comment.content}</p>
              </div>
              <span className="date"> {getDuration(comment.created_at)}</span>
            </div>
          ))}
          {commentsData.length > visibleComments && !showAllComments && (
            <button onClick={toggleShowAllComments}>Show more</button>
          )}
          {showAllComments && (
            <button onClick={toggleShowAllComments}>Show less</button>
          )}
        </>
      ) : (
        <div>No comments</div>
      )}
    </div>
  );
};

export default Comments;
