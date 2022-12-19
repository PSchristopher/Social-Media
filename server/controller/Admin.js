
const User = require('../Modal/user')
const Posts = require('../Modal/post')
const Reports = require('../Modal/report')
const notiSchema = require('../Modal/notificationSchema')


module.exports = {

    login: async (req, res) => {
        const adminEmail = "admin@gmail.com"
        const adminPassword = "12345"
        try {
            if (adminEmail == req.body.email) {
                if (adminPassword == req.body.password) {
                    res.status(200).json(true)
                } else {
                    res.status(200).json({ passmsg: true, message: "Incorrect Password" })
                }
            } else {
                res.status(200).json({ emailmsg: true, message: "Invalid Email" })
            }
        } catch (error) {
            console.log(error);
        }
        console.log(req.body);
    },

    getUserManagement: async (req, res) => {
        console.log('hyyy');
        try {
            await User.find().then(response => {
                console.log(response);
                res.status(200).json(response)
            })


        } catch (error) {
            res.status(401).json({ message: 'Something went wrong! Try again' })
        }
    },


    blockUser: (req, res) => {
        console.log(req.body.userId, 'its body');

        try {
            User.findByIdAndUpdate({ _id: req.body.userId },
                {
                    $set: { report_status: "inactive" }
                }).then((response) => {
                    res.status(200).json({ update: true, message: "User has been Blocked!" })
                }).catch((error) => {
                    console.log(error);
                    res.json({ update: false, message: "User not Blocked! Try again" })
                })
        } catch (error) {
            res.json(error.message)
        }
    },


    /* ------------------------------- UNBLOCK USER ------------------------------- */


    unblockUser: (req, res) => {

        try {
            User.findByIdAndUpdate({ _id: req.body.userId },
                {
                    $set: { report_status: "active" }
                }).then(response => {
                    res.status(200).json({ update: true, message: "User has been Ublocked" })
                }).catch(err => {
                    res.status(401).json({ message: "Something went wrong" })
                })
        } catch (error) {
            res.json(error.message)
        }
    },
    reported: async (req, res) => {
        try {
            const posts = await Posts.find()
            const results = posts.filter((post) => {
                if (post?.reporterID?.length != 0)
                    return (post)
            })

            res.status(200).json(results)
        } catch (error) {
            res.json(error.message)
        }
    },

    getReportData: async (req, res) => {

        try {
            const result = await Reports.find({ postId: req.params.id }).populate('userId', "UserName")
            res.status(200).json(result)
            console.log('ijnb');
            console.log(result, 'ijnb');
        } catch (error) {
            res.status(500).json(error)
        }
    },

    blockPost: async (req, res) => {
        console.log(req.params.id, 'pojhgfdfg');
        try {
            const post = await Posts.findById(req.params.id)
            await post.updateOne({ $set: { reportdedStatus: true } })
            console.log(post);
            const details = {
                user: post.userId,
                desc: 'Post has been Blocked',
                time: Date.now()
            }
            await notiSchema.updateOne({ userId: post.userId }, { $push: { Notifications: details } })
            res.status(200).json({ message: 'post Blocked!' })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    unBlockPost: async (req, res) => {
        console.log(req.params.id, 'pojhgfdfg');

        try {
            const result = await Posts.findByIdAndUpdate(req.params.id,
                {
                    $set: {  reportdedStatus: false  }
                })
            res.status(200).json({ message: 'post Unblocked!' })
        } catch (error) {
            res.status(500).json(error)
        }
    }

}