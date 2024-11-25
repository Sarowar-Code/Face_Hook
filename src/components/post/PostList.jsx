import PostCard from "./PostCard";

const PostList = ({ posts }) => {
    return (
        <>
            {!!posts &&
                posts.map((post) => <PostCard key={post.is} post={post} />)}
        </>
    );
};

export default PostList;
