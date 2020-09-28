const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User Profile Schema
const ProfileSchema = new Schema({
  user: {
    //assocate user by ID
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  //handle for searching user profile
  handle: {
    type: String,
    required: true,
    max: 30
  },
  //user company if they have one
  company: {
    type: String
  },
  //user website if they have one
  website: {
    type: String
  },
  //users location for querying
  location: {
    type: String
    //required: true
  },
  //user skill level (junior, senior, ect)
  skilllvl: {
    type: String,
    required: false
  },
  //skills
  skills: {
    //array string
    type: [String],
    required: true
  },
  //user bio
  bio: {
    type: String
  },
  //user experience
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  //education
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      course: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  //social media links
  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    },
    github: {
      type: String
    }
  },
  //likes
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  //comments
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: false
      },
      name: {
        type: String
      }
    }
  ],
  //current date
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
