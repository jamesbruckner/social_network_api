const { Post, User, Reaction } = require('../models');
const {Types} = require('mongoose');

const PostController = {
    async getAllPosts(req, res) {
        try {
            const posts = await Post.find({});
            res.json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async getPostsById(req, res) {
        try {
            const post = await Post.findOne({_id:req.params.postId});
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
            } else {
                res.json(post);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async createPost(req, res) {
        try {
            const post = await Post.create(req.Body);
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async deletePost(req, res) {
        try {
            const post = await Post.findByIdAndDelete({_id:req.params.postId});
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async updatePostById(req, res) {
        try {
            const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({ message: 'Post not found' });
            } else {
                res.json(post);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async createReaction(req, res) {
        try {
            const post = await Post.findOneAndUpdate(
                {_id:req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {runValidators:true, new: true}
            );
            post ? res.json(post) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async deleteReaction(req, res) {
        try {
            const post = await Post.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {runValidators: true, new: true}
            );
            thought ? res.json(thought) : res.status(404).json({message: notFound});
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

module.exports = PostController