import React, { Component, createRef } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import loader from "../../assets/loader.svg";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { creatMarket } from "../../actions/dashboard";
import Navbar from "../shared/Navbar"
import Dropzone, { useDropzone } from 'react-dropzone'
toast.configure()
export class AddMarket extends Component {

  state = {
    name: '',
    address: '',
    category: '',
    description: '',
    loading: false,
    empty: false,
    error: false,
    showAddImages: false,
    marketId: "",
    files: []
  }

  notify = (text) => toast.success(text)

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
    const { name, address, category, description } = this.state;
    await this.props.creatMarket({ name, description, category, address });
    if (this.props.created) {
      this.setState({
        showAddImages: true,
        marketId: this.props.data._id
      })
      this.notify("Market Created Successfully!")
    } else {
      this.setState({
        error: true,
        loading: false,
        errorMsg: "Market cound not be created"
      })
    }
  }

  onDrop = (files) => {
    console.log(files);
    this.setState({ files })

  }


  render() {
    const { name, address, category, description, error, errorMsg, showAddImages } = this.state;
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <div>
        <Navbar name="TLLMKT" />
        {error &&
          <div className="alert alert-dismissible alert-danger">
            <button type="button" className="close" data-dismiss="alert">&times;</button>
            <strong>{errorMsg}</strong>
          </div>
        }
        <div style={{ justifyContent: "center", display: "flex" }}>
          <div>
            <h1 style={{ fontFamily: 'Montserrat', marginTop: "60px" }}>Add A Market</h1>
            <div className="form-group col-sm-12" style={{ marginTop: "30px" }}>
              <label style={{ float: "left" }}>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={text => this.handleChange("name", text)}
                style={{ fontFamily: 'Montserrat' }} />
            </div>

            <div className="form-group col-sm-12" style={{ marginTop: "30px" }}>
              <label style={{ float: "left" }}>Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={text => this.handleChange("description", text)}
              />
            </div>

            <div className="form-group col-sm-12">
              <label style={{ float: "left" }}>Category</label>
              <select className="custom-select"
                onChange={text => this.handleChange("category", text)}
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="electronics">Electronics</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div className="form-group col-sm-12">
              <label style={{ float: "left" }}>Market Address</label>
              <input
                type="text"
                className="form-control"
                name="description"
                onChange={text => this.handleChange("address", text)}
              />
            </div>



            <div className="form-group col-md-12" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!name || !category || !description || !address}
                onClick={this.handleSubmit}
                style={{ fontSize: "15px" }}>
                {!this.props.loading ? "CREATE" : <img alt='loading'
                  src={loader} style={{ width: '23px' }} />}
              </button>
            </div>

          </div>
        </div>

        {/* ADD IMAGE CONTAINER */}
        {
          showAddImages &&
          <center>
            <div className="container-fluid" >
              <h1>ADD IMAGES</h1>
              <Dropzone onDrop={this.onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click me to select files!</p>
                    </div>
                    <aside>
                      <h4>Files</h4>
                      <ul>{files}</ul>
                    </aside>
                  </section>
                )}
              </Dropzone>
              <div className="form-group col-md-12" style={{ justifyContent: "center" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={files.length < 1}
                  onClick={this.handleImageSubmit}
                  style={{ fontSize: "15px" }}>
                  {!this.props.loading ? "Submit" : <img alt='loading'
                    src={loader} style={{ width: '23px' }} />}
                </button>
              </div>
            </div>
          </center>
        }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  creatMarket: data => dispatch(creatMarket(data))
});

const mapStateToProps = state => ({
  loading: state.dash.loading,
  created: state.dash.created,
  errorMsg: state.dash.errorMsg,
  data: state.dash.data

});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMarket));
