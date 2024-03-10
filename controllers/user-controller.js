// const { User } = require('../models');

// const UserController = {
//     getAllUsers(req, res) {
//         User.find({})
//             .then(userData => res.json(userData))
//             .catch(err => res.status(500).json(err));
//     },

//     getUserById(req, res) {
//         User.findById(res.params.userId)
//             .then(userData => res.json(userData))
//             .catch(err => res.status(500).json(err));
//     },

//     createUser(req, res) {
//         User.create(req.body)
//             .then(userData => res.json(userData))
//             .catch(err => res.status(500).json(err));
//     },

//     updateUserById(req, res) {
//         User.findOneAndUpdate(req.params.id, req.body, { new: true })
//             .then(userData => {
//                 if (!userData) {
//                     return res.status(404).json({ message: 'User not found' });
//                 }
//                 res.json(userData);
//             })
//             .catch(err => res.status(500).json(err));
//     },

//     deleteUserById(req, res) {
//         User.findOneAndDelete(req.params.id)
//             .then(userData => {
//                 if (!userData) {
//                     return res.status(404).json({ message: 'User not found' });
//                 }
//                 res.json({ message: 'User deleted!' });
//             })
//             .catch(err => res.status(500).json(err));
//     },

//     addFriend(req, res) {
//         User.findOneAndUpdate(
//             { _id: req.params.userId },
//             { $addToSet: { friends: req.body.friendId || req.params.friendId } },
//             { new: true }
//         )
//             .then(userData => {
//                 if (!userData) {
//                     return res.status(404).json({ message: 'User not found' });
//                 }
//                 res.json(userData);
//             })
//             .catch(err => res.status(500).json(err));
//     },

//     removeFriend({ params }, res) {
//         User.findOneAndUpdate(
//             { _id: params.userId },
//             { $pull: { friends: params.friendId } },
//             { new: true }
//         )
//             .then((dbUserData) => {
//                 if (!dbUserData) {
//                     return res.status(404).json({ message: "No user with this id!" });
//                 }
//                 const removed = !dbUserData.friends.includes(params.friendId);
//                 if (removed) {
//                     res.json({ message: "Friend removed successfully!", dbUserData });
//                 } else {
//                     res.json(dbUserData);
//                 }
//             })
//             .catch((err) => res.status(400).json(err));
//     },
// };

// module.exports - UserController


const User = require('../models/User');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            !user
                ? res.status(404).json({ message: 'no user found' })
                : res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    async deleteUser(res, req) {
        try {
            const user = await User.findOneAndDelete(req.params.id);
            !user
                ? res.status(404).json({ message: 'no user found' })
                : res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err)
        }
    },
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $push: { friends: req.params.friendId } }, { new: true });
            !user
                ? res.status(404).json({ message: 'no user found' })
                : res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true });
            !user
                ? res.status(404).json({ message: 'no user found' })
                : res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }
};
