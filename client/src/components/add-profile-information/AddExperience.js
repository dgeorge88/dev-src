import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../comp/TextFieldGroup";
import TextAreaFieldGroup from "../comp/TextAreaFieldGroup";
import { addExperience } from "../../actions/profileActions";
import PlacesScript from "../comp/PlacesScript";
import SearchInput from "../comp/SearchInput";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",

      //location
      location: "",
      search: "",
      id: "locate",

      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    //general binds
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);

    //location binds
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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

  //onchange handler for inputs
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //check user state
  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="float-left">
          <Link to="/dashboard" className="btn btn-light mb-3">
            <i className="fas fa-chevron-left" /> Back
          </Link>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="text-center">Add Experience</h1>
              <p className="lead text-center">Add any relevent experience</p>
              <small>* = required</small>

              <PlacesScript onLoad={this.handleScriptLoad} />

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />

                <SearchInput
                  placeholder="* Location"
                  id={this.state.id}
                  name="search"
                  value={this.state.search}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Enter your location."
                />

                <strong>From Date</strong>
                <TextFieldGroup
                  placeholder="from"
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />

                <strong>To Date</strong>
                <TextFieldGroup
                  placeholder="to"
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="htmlFor" className="form-check-label">
                    Current Employer
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Information about job"
                />
                <input
                  type="submit"
                  value="Add Experience"
                  className="btn btn-success btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
