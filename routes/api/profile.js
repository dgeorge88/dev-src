const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

//profile validator
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const validatePostInput = require("../../validation/post");

//profile and user model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Got Profile" }));

// @route   GET api/profile
// @desc    Get auth user profile
// @access  Private

//protected auth user route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //errors object
    const errors = {};
    //find user profile by user id(jwt token) else error
    Profile.findOne({ user: req.user.id })
      //populate user data into profile
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.invalidprofile = "User Profile does not exist";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create&Edit user profile
// @access  Private

//protected auth user route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validation
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }
    //Get profile data fields
    const profileData = {};
    profileData.user = req.user.id;
    if (req.body.handle) profileData.handle = req.body.handle;
    if (req.body.skilllvl) profileData.skilllvl = req.body.skilllvl;

    if (req.body.company) profileData.company = req.body.company;
    if (req.body.location) profileData.location = req.body.location;
    if (req.body.bio) profileData.bio = req.body.bio;

    if (req.body.website) profileData.website = req.body.website;
    if (req.body.githubdepo) profileData.githubdepo = req.body.githubdepo;
    //skills array
    if (typeof req.body.skills !== "undefined") {
      profileData.skills = req.body.skills.split(",");
    }
    //social media array
    profileData.social = {};
    if (req.body.youtube) profileData.social.youtube = req.body.youtube;
    if (req.body.facebook) profileData.social.facebook = req.body.facebook;
    if (req.body.twitter) profileData.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileData.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileData.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update Profile Data
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileData },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //check if profile exists
        Profile.findOne({ handle: profileData.handle }).then(profile => {
          if (profile) {
            errors.handle = "That profile already exists";
            res.status(400).json(errors);
          }
          //create new profile
          new Profile(profileData).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @route   GET api/profile/all
// @desc    Get all user profiles
// @access  Public
router.get("/all", (req, res) => {
  //error handler
  const errors = {};
  Profile.find()
    .populate("user", ["name", "email"])
    .then(profiles => {
      //if no profiles exist error
      if (!profiles) {
        errors.invalidprofiles = "No profiles exists";
        return res.status(404).json(errors);
      }
      //else display all user profiles
      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by user handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  //error handler
  const errors = {};
  //find user handle
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "email"])
    .then(profile => {
      if (!profile) {
        //no profile found
        errors.invalidprofile = "No profile exists for this user";
        res.status(404).json(errors);
      }
      //else return profile
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  //error handler
  const errors = {};
  //find user handle
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "email"])
    .then(profile => {
      if (!profile) {
        //no profile found
        errors.invalidprofile = "No profile exists for this user";
        res.status(404).json(errors);
      }
      //else return profile
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/experience
// @desc    Add user expierence
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validation
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      //user experience object
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add to expierence array profile
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add user education
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validation
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      //user experience object
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        course: req.body.course,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add to expierence array profile
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/expierence/:exp_id
// @desc    Delete user experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.param.exp_id);

        //splice array
        profile.experience.splice(removeIndex, 1);
        //save result
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete user education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.param.edu_id);

        //splice array
        profile.education.splice(removeIndex, 1);
        //save result
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);
// @route   POST api/profile/like/:id
// @desc    Like profile by ID
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get current user id
    Profile.findOne({ user: req.user.id }).then(profile => {
      Profile.findById(req.params.id)
        .then(profile => {
          //check if post has been liked by user
          if (
            profile.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ likedalready: "You have already liked this profile" });
          }
          //else allow like
          profile.likes.unshift({ user: req.user.id });
          //save to array
          profile.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(err));
    });
  }
);

// @route   POST api/profile/unlike/:id
// @desc    UnLike profile by ID
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //get current user id
    Profile.findOne({ user: req.user.id }).then(profile => {
      Profile.findById(req.params.id)
        .then(profile => {
          //check if post has been liked by user
          if (
            profile.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You must first like the profile" });
          }
          //then remove like
          const removeIndex = profile.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //remove from array
          profile.likes.splice(removeIndex, 1);

          //save result
          profile.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ err }));
    });
  }
);

// @route   POST api/profile/comment/:id
// @desc    Create post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findById(req.params.id)
      .then(profile => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id
        };

        // Add to exp array
        profile.comments.unshift(newComment);
        // res.json(profile)

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   DELETE api/profile/comment/:profile_id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.params.id)
      .then(profile => {
        // Check to see if comment exists
        if (
          profile.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = profile.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        profile.comments.splice(removeIndex, 1);

        profile.save().then(post => res.json(profile));
      })
      .catch(err =>
        res.status(404).json({ commentnotfound: "No comment found" })
      );
  }
);

//@route DELETE api/profile/:id
//@desc Delete user and profile by ID
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.type === "admin") {
      Profile.findOneAndRemove(req.params.id).then(profile => {
        User.findOneAndRemove({ _id: profile.user }).then(() =>
          res.json({ success: true })
        );
      });
    } else {
      return res.status(401).json({ notauth: "User not authorised" });
    }

    // })
  }
);

module.exports = router;
