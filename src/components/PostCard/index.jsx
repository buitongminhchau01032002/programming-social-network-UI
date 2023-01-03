// title, bref, .......
function PostCard({ title, brief }) {
    return (
        <div className="mt-7 shadow-test">
            <div className="font-semibold">{title}</div>
            <div>{brief}</div>
        </div>
    );
}

export default PostCard;
