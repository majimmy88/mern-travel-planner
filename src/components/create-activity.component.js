import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Map from "./map.component";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const Wrapper = styled.div`
  display:flex;
`;


export default class CreateActivity extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeLocation= this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      location: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      renderMap: true
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5500/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  componentWillUnmount() {
    this.setState({renderMap: false});
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const activity = {
      username: this.state.username,
      location: this.state.location,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(activity);

    axios.post('http://localhost:5500/activities/add', activity)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div class="d-flex p-2">
        <div class="container">
          <h3>Create New Activity Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
                  {
                    this.state.users.map(function(user) {
                      return <option
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group">
              <label>Location: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.location}
                  onChange={this.onChangeLocation}
                  />
            </div>
            <div className="form-group">
              <label>Description: </label>
              <input  type="message"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input
                  type="text"
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="Create Activity Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        <div>
          {this.state.renderMap ? <Map />: null}
        </div>
      </div>
    )
  }
}