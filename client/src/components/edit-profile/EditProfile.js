import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../comp/TextFieldGroup";
import TextAreaFieldGroup from "../comp/TextAreaFieldGroup";
import SelectListGroup from "../comp/SelectListGroup";
import InputGroup from "../comp/InputGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import PlacesScript from "../comp/PlacesScript";
import SearchInput from "../comp/SearchInput";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialMedia: false,
      //general bio
      handle: "",
      company: "",
      website: "",
      skilllvl: "",
      skills: "",
      bio: "",

      //location
      location: "",
      search: "",
      id: "locate",

      //social
      github: "",
      twitter: "",
      facebook: "",
      instagram: "",
      youtube: "",
      linkedin: "",

      //errors
      errors: {}
    };

    //default binds
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //location binds
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  //error handler
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //skill array
      const skillsArray = profile.skills.join(",");
      //if doesnt exist deploy empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.github = !isEmpty(profile.github) ? profile.github : "";

      //empty object for social media
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";

      //set field states
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        skilllvl: profile.skilllvl,
        skills: skillsArray,
        bio: profile.bio,
        github: profile.github,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram,
        youtube: profile.youtube,
        linkedin: profile.linkedin
      });
    }
  }

  //GoogleApi handler
  handleScriptLoad() {
    //filter options
    let options = {
      types: ["(cities)"]
    };

    /*global google*/

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("locate"),
      options
    );

    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  }

  //autocomplete handler
  handlePlaceSelect() {
    let addresObject = this.autocomplete.getPlace();

    this.setState({
      //to maintain location input
      search: addresObject.formatted_address,
      //send to state
      location: addresObject.formatted_address
    });
  }

  //onSubmit handler
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      //general bio
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      skilllvl: this.state.skilllvl,
      skills: this.state.skills,
      bio: this.state.bio,

      //location
      location: this.state.location,

      //socialmedia links
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      github: this.state.github
    };

    this.props.createProfile(profileData, this.props.history);
  }

  //onChange handler
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    //errors
    const { errors, displaySocialMedia } = this.state;

    //social media handler
    let socialMedia;

    if (displaySocialMedia) {
      socialMedia = (
        <div>
          <InputGroup
            placeholder="GitHub Username"
            name="github"
            icon="fab fa-github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />

          <InputGroup
            placeholder="Twitter Username"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Youtube Username"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Facebook Username"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Instagram Username"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

          <InputGroup
            placeholder="LinkedIn Username"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    }

    //select list options
    const options = [
      { label: "* Select Status", value: 0 },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Student", value: "Student" },
      { label: "Graduate", value: "Graduate" },
      { label: "Manager", value: "Manager" },
      { label: "Teacher/Lecturer", value: "Teacher/Lecturer" }
    ];
    return (
      <div className="create-profile">
        <div className="float-left">
          <Link to="/dashboard" className="btn btn-light mb-3">
            <i className="fas fa-chevron-left" /> Back
          </Link>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className=" text-center">Edit Profile</h1>
              <p className="lead text-center">Change your Profile Data</p>
              <small>* = required</small>
              <PlacesScript onLoad={this.handleScriptLoad} />

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Username"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique username handle."
                />
                <SelectListGroup
                  placeholder="* Career Status"
                  name="skilllvl"
                  value={this.state.skilllvl}
                  onChange={this.onChange}
                  error={errors.skilllvl}
                  options={options}
                  info="Select your current career status."
                />

                <SearchInput
                  placeholder={this.state.location}
                  id={this.state.id}
                  name="search"
                  value={this.state.search}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Enter your new location."
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Input your skills (e.g. CSS,HTML,mySQL, ect.)"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Input company you work for if valid."
                />

                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Input your website if valid."
                />

                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="A short description about yourself."
                />
                <div className="mb-4">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialMedia: !prevState.displaySocialMedia
                      }));
                    }}
                  >
                    Add Social Media
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialMedia}
                <input
                  type="submit"
                  value="Submit Changes"
                  className="btn btn-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
