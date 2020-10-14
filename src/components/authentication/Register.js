import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import loader from "../../assets/loader.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { createAccount } from "../../actions/auth";

toast.configure()

export class Register extends Component {
  state = {
    warning: false,
    email: '',
    loading: false,
    password: '',
    error: false,
    errorMsg: '',
  }

  notify = (text) => toast.success(text)

  focus = (e) => {
    if (e.target.value.length < 8) {
      this.setState({
        warning: true
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
    if (e.target.name === 'password' && e.target.value.length > 7) {
      this.setState({
        warning: false,
      })
    } else {
      this.setState({
        warning: true
      })
    }
  }

  change = (name, e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleCreate = async () => {
    this.setState({
      error: false,
    })
    const { email, password } = this.state;
    const regexp = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regexp.test(email)) {
      return this.setState({
        error: true,
        loading: false,
        errorMsg: 'Invalid Email'
      })
    }

    if (password.length < 8) {
      return this.setState({
        error: true,
        loading: false,
        errorMsg: 'Password too short'
      })
    }

    await this.props.createAccount({ email, password });

    if (this.props.created) {
      this.notify("Congrats! You've been registered successfully!")
      return this.props.history.push('/dashboard');
    } else {
      this.setState({
        error: true,
        loading: false,
        errorMsg: this.props.errorMsg.data.message
      })
    }
  };
  render() {
    const { warning, error, errorMsg } = this.state;
    const token = localStorage.getItem('token');
    if (token) {
      return <Redirect to={"/dashboard"} />;
    }
    return (

      <div className="container">
        <center>

          <h1 style={{ fontFamily: 'Montserrat', marginTop: "60px" }}>TELERIUM MKRT</h1>
          {error &&
            <div className="alert alert-dismissible alert-danger">
              <button type="button" className="close" data-dismiss="alert">&times;</button>
              <strong>{errorMsg}</strong>
            </div>
          }

          <div className="form-group col-sm-6" style={{ marginTop: "30px" }}>
            <label style={{ float: "left" }}>EMAIL ADDRESS</label>
            <input
              type="email"
              className="form-control"
              placeholder="marketplace@yahoo.com"
              name="email"
              onChange={text => this.change("email", text)}
              style={{ fontFamily: 'Montserrat' }} />
          </div>

          <div className="form-group col-sm-6" style={{ marginTop: "30px" }}>
            <label style={{ float: "left" }}>PASSWORD</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
              onFocus={this.focus}
              placeholder="******" />
            {
              warning &&
              <p style={{ fontFamily: 'Montserrat', fontSize: "12px" }} className="text-warning">Your password needs to be at least 8 characters long</p>
            }
          </div>

          <div className="row">
            <div className="col-md-12" >
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleCreate}
                disabled={!this.state.email || !this.state.password}
                style={{ fontSize: "15px" }}>
                {!this.props.loading ? "SUBMIT" : <img alt='loading'
                  src={loader} style={{ width: '23px' }} />}
              </button>
            </div>
          </div>

          <div className="row col-md-6">
            <div className="col-md-12">
              <Link to='/login' style={{ textDecoration: "none" }}><button type="button" className="btn btn-link">BACK TO LOGIN</button></Link>
            </div>
          </div>
        </center>
      </div>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  createAccount: data => dispatch(createAccount(data))
});

const mapStateToProps = state => ({
  loading: state.auth.loading,
  created: state.auth.created,
  errorMsg: state.auth.errorMsg
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Register));
