import React, { Component } from 'react'
import { Link } from "react-router-dom"
export class Navbar extends Component {
  logout = () => {
    localStorage.clear();
    this.props.history.push({
      pathname: '/login',
    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link to='/dashboard' className="navbar-brand">{this.props.name}</Link>
          <button style={{ border: 0 }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to='/dashboard' className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to='/addMarket' className="nav-link" href="#">Add Market</Link>
              </li>
            </ul>

            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-primary my-2 my-sm-0" onClick={this.logout}>LOGOUT</button>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
