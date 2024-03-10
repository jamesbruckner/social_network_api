const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction');

const postSchema = new Schema(
    {
        postText:{
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username:{
            type: String,  
            required: true,
        },
        reactions:[reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

postSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Post = model('Post',postSchema)

module.exports = Post