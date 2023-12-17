import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [], // Initializing the 'posts' state as an empty array
  // Function for adding a new post to the 'posts' state
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  deletePost: (id) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  setPosts: (posts) => set({ posts }),
  addComment: (
    postId,
    comment // Function for adding a new comment to a specific post in the 'posts' state
  ) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          // If the post id matches, add the new comment to its 'comments' array
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),
}));

export default usePostStore;
