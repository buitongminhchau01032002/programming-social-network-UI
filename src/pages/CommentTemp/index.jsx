import { useParams } from 'react-router-dom';
import CommentSection from '../../components/CommentSection';

function CommentTemp() {
    const { id } = useParams();

    return (
        <div>
            <div>POST CONTENT</div>

            {/* Add comment to page */}
            <CommentSection postId={id} />
        </div>
    );
}

export default CommentTemp;
