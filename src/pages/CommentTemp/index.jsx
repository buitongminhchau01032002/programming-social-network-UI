import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../../components/CommentSection';
import PostCartSection from '../../components/PostCardSection';

function CommentTemp() {
    const { id } = useParams();
    

    return (
        <div>
            <div>POST CONTENT</div>
            <PostCartSection postId={id} full={false} />

            {/* Add comment to page */}
            <CommentSection postId={id} />
        </div>
    );
}

export default CommentTemp;
