const router = require('express').Router();
const {
    getAllPosts,
    getPostsById,
    createPost,
    deletePost,
    updatePostById,
    createReaction,
    deleteReaction,
} = require('../../controllers/post-controller');

router.route('/').get(getAllPosts).post(createPost);

router.route('/:postId').get(getPostsById).put(updatePostById).delete(deletePost);

router.route('/:postId/reactions').post(createReaction);

router.route('/:postId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;