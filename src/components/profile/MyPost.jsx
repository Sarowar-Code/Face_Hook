import { useProfile } from "../../hooks/useProfile";
import PostList from "../post/PostList";
const MyPost = () => {
    const { state } = useProfile();
    const posts = state?.posts;
    return (
        <>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>

            <PostList posts={posts} />
        </>
    );
};

export default MyPost;
