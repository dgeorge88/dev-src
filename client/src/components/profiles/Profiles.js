import React, { Component } from "react";

import ProfileItem from "./ProfileItem";
import Axios from "axios";

class Profiles extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      profiles: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    Axios.get("/api/profile/all").then(res => {
      this.setState({ profiles: res.data });
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { search, profiles } = this.state;

    let filteredContacts = profiles
      .filter(res => {
        return (
          (
            res.handle.toLowerCase() ||
            res.location.toLowerCase() ||
            res.skilllvl.toLowerCase() ||
            res.company.toLowerCase()
          ).indexOf(search.toLowerCase()) !== -1
        );
      })
      .map(profile => {
        return <ProfileItem key={profile._id} profile={profile} />;
      });

    return (
      <div className="profiles">
        <div className="container">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Find a Developer</h1>
            <p className="lead text-center">View Developer Profiles</p>

            <div className="form-group">
              <input
                id="searchFunc"
                placeholder="Search..."
                name="search"
                value={this.state.search}
                onChange={this.onChange}
                className="form-control"
              />
              <label htmlFor="searchFunc">
                <small>
                  Search user by developer name, company, position, or location
                </small>
              </label>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Developer</th>
                <th>Company</th>
                <th>Position</th>
                <th>Location</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>{filteredContacts}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Profiles;
