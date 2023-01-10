import PostContentEditor from './PostContentEditor';

function CreatePost() {
    return (
        <div>
            <h2 className="py-10 text-center text-lg font-bold">Tạo bài đăng</h2>

            <form className="grid grid-cols-3 gap-7">
                {/* LEFT */}
                <div className="col-span-2">
                    <div className="mb-6">
                        <label className="font-semibold">Tiêu đề</label>
                        <input
                            className="mt-1 h-9 w-full rounded-md border border-gray-400 px-3 focus-within:!border-primary hover:border-gray-500"
                            placeholder="Tiêu đề bài viết"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="font-semibold">Nội dung</label>
                        <div>
                            <PostContentEditor
                                initialValue="Nội dung ... "
                                onChangeContent={(content) => console.log(content)}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div>
                    <div className="mb-6">
                        <label className="font-semibold">Tiêu đề</label>
                        <input
                            className="mt-1 h-9 w-full rounded-md border border-gray-400 px-3 focus-within:!border-primary hover:border-gray-500"
                            placeholder="Tiêu đề bài viết"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="font-semibold">Tiêu đề</label>
                        <input
                            className="mt-1 h-9 w-full rounded-md border border-gray-400 px-3 focus-within:!border-primary hover:border-gray-500"
                            placeholder="Tiêu đề bài viết"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
