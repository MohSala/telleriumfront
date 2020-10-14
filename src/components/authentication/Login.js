import React, { Component } from 'react'
import loader from "../../assets/loader.svg";
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { loginWithEmail } from "../../actions/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    empty: false,
    error: false
  }

  notify = (text) => toast.error(text)

  handleLogin = () => {
    this.setState({
      loading: !this.state.loading
    })
  }

  handleChange = (name, e) => {
    this.setState({
      [name]: e.target.value,
      error: false,
      empty: false
    });
  };

  handleSubmit = async () => {
    this.setState({
      loading: true,
      empty: false,
      error: false
    })
    const { email, password } = this.state;
    if (email === '' || password === '') {
      this.setState({
        empty: true,
        loading: false,
        error: false
      })

    }

    await this.props.login({ email, password });

    if (this.props.error) {
      this.notify(this.props.errorMsg.data.message)
      this.setState({
        error: true
      })

    }
  };
  render() {
    const token = localStorage.getItem('token');
    if (token > 0) {
      return <Redirect to={"/dashboard"} />;
    }
    return (

      <div className="container">
        <center>

          <h1 style={{ fontFamily: 'Montserrat', marginTop: "60px" }}>TELLERIUM MKRT</h1>


          <div className="form-group col-sm-6" style={{ marginTop: "100px" }}>
            <label style={{ float: "left" }}>EMAIL ADDRESS</label>
            <input
              type="email"
              className="form-control" name="email"
              onChange={text => this.handleChange("email", text)}
              required placeholder="marketprice@yahoo.com" style={{ fontFamily: 'Montserrat' }} />
          </div>

          <div className="form-group col-sm-6" style={{ marginTop: "50px" }}>
            <label style={{ float: "left" }}>PASSWORD</label>
            <input
              type="password"
              name="password"
              onChange={text => this.handleChange("password", text)}
              required
              className="form-control"
              placeholder="******" />
          </div>

          <div className="row">
            <div className="col-md-12" >
              <button
                type="button"
                onClick={this.handleSubmit}
                disabled={!this.state.email || !this.state.password}
                className="btn btn-success" style={{ fontSize: "15px" }}>{!this.props.loading ? "LOGIN" : <img alt='loading'
                  src={loader} style={{ width: '23px' }} />}</button>
            </div>
          </div>

          <div className="row col-md-6">
            <div className="col-md-12">
              <Link to='/register' style={{ textDecoration: "none" }}>  <button type="button" className="btn btn-link">Don't Have an Account?</button></Link>
            </div>
          </div>
        </center>
      </div>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(loginWithEmail(data))
});

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  errorMsg: state.auth.errorMsg
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login));
