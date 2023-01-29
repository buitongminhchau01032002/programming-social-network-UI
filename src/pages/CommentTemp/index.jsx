import FullPostCard from '../../components/FullPostCard';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userSelector } from '../../redux/selectors';
import { userActions } from '../../redux/slices/userSlice';
import clsx from 'clsx';
import CommentCard from './CommentCard';
import ReplyDialog from './ReplyDialog';
import CreateCommentInPost from './CreateCommentInPost';
import EditDialog from './EditDialog';

function CommentTemp() {
    const [commentReplaying, setCommentReplaying] = useState(null);
    const [commentEditing, setCommentEditing] = useState(null);
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    function getCommentsJSX(comments, isRoots = true) {
        return (
            <div
                className={clsx({
                    'border-l border-primary pl-6': !isRoots,
                    'mt-6': isRoots,
                })}
            >
                {comments.map((comment, index) => {
                    return (
                        <div key={index} className="mt-1 pt-4">
                            <CommentCard
                                comment={comment}
                                onEditClick={(cmt) => setCommentEditing(cmt)}
                                onReplayClick={(cmt) => setCommentReplaying(cmt)}
                                onChangeComment={getComments}
                            />
                            {comment.replies && comment.replies.length > 0 && getCommentsJSX(comment.replies, false)}
                        </div>
                    );
                })}
            </div>
        );
    }

    useEffect(() => {
        getComments();
    }, []);

    function getComments() {
        fetch('http://localhost:8080/api/comment/' + id)
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.error) {
                    console.log(resJson.error);
                    setComments([]);
                    return;
                }
                console.log(resJson.comments);
                setComments(resJson.comments);
            })
            .catch((error) => {
                console.log('error', error);
                setComments([]);
            });
    }

    return (
        <>
            <div className="">
                {/* COMMENT GROUP */}
                <div className="py-4">
                    {/* CREATE COMMENT */}
                    <CreateCommentInPost postId={id} onCreatedComment={getComments} />

                    {getCommentsJSX(comments)}
                </div>
            </div>
            {commentReplaying && (
                <ReplyDialog
                    postId={id}
                    comment={commentReplaying}
                    onCreatedComment={getComments}
                    onClickOutside={() => setCommentReplaying(null)}
                />
            )}
            {commentEditing && (
                <EditDialog
                    comment={commentEditing}
                    onEditedComment={getComments}
                    onClickOutside={() => setCommentEditing(null)}
                />
            )}
        </>
    );
}

export default CommentTemp;
