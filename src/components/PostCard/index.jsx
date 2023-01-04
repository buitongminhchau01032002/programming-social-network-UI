
function PostCard({ post }) {
    return (
        <div className=" mt-4 flex h-52 flex-col rounded-lg bg-slate-200 p-3 text-left transition hover:shadow-lg hover:shadow-slate-300  sm:h-64 sm:p-4 ">
            <div className="flex">
                <div className="mr-2 flex flex-grow">{post.creator.name}</div>
                <div className="mr-2 flex">{ }</div>
                <div className="mr-2 flex ">
                    <i class="fa-regular fa-bookmark"></i>
                </div>
                <div className="flex ">
                    <i class="fa fa-ellipsis-vertical"></i>
                </div>
            </div>

            <div className="font-semibold">{post.title}</div>
            <div>{post.content}</div>
        </div>
    );
}

export default PostCard;
