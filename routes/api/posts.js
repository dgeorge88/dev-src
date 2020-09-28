const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = require("../../models/Post");
//Profile model
const Profile = require("../../models/Profile");
//Post Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
  //get posts
  Post.find()
    //sort by most recent
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: "No posts exists" }));
});

// @route   GET api/posts/:id
// @desc    Get single post by id
// @access  Public
router.get("/:id", (req, res) => {
  //get post
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopost: "No post exists with that ID" })
    );
});

// @route   POST api/posts
// @desc    Create a new Post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //validation
    if (!isValid) {
      //is not valid return error
      return res.status(400).json(errors);
    }
    //create new post
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      user: req.user.id
    });
    //then save post
    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE api/posts/:id
// @desc    DELETE post by ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get current user id
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //post ownership validation or admin user
          if (
            req.user.type === "admin" ||
            post.user.toString() === req.user.id
          ) {
            //delete post
            post.remove().then(() => res.json({ success: true }));
          } else {
            //else return auth error
            return res.status(401).json({ notauth: "User not authorised" });
          }
        })
        .catch(err => res.status(404).json({ postnofound: "No post found" }));
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post by ID
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get current user id
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if post has been liked by user
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ likedalready: "You have already liked this post" });
          }
          //else allow like
          post.likes.unshift({ user: req.user.id });
          //save to array
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    UnLike post by ID
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get current user id
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if post has been liked by user
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You must first like the post" });
          }
          //then remove like
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //remove from array
          post.likes.splice(removeIndex, 1);

          //save result
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ err }));
    });
  }
);

// @route   POST api/posts/chat/:id
// @desc    Add chat to post
// @access  Private
router.post(
  "/chat/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newchat = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id
        };

        // Add to chats array
        post.chats.unshift(newchat);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/posts/chat/:id/:chat_id
// @desc    Remove chat from post
// @access  Private
router.delete(
  "/chat/:id/:chat_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if chat msg exists
        if (
          post.chats.filter(chat => chat._id.toString() === req.params.chat_id)
            .length === 0
        ) {
          return res
            .status(404)
            .json({ chatnotexists: "chat message does not exist" });
        }

        // Get remove index
        const removeIndex = post.chats
          .map(item => item._id.toString())
          .indexOf(req.params.chat_id);

        // Splice chat msg out of array
        post.chats.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
