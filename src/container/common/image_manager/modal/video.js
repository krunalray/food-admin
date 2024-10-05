import React,  { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field,reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { modal } from '../../../common/modal';
import Select from 'react-select';
import { Input, Loading } from '../../../common/component';
import { setdVideoLink } from '../system/action';

class ModalVideo  extends Component {

  constructor(props) {
    super(props);

    this.state = { isLoading:false };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeModal = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {

  }

  handleFormSubmit(image) {
    this.props.setdVideoLink(image);
      this.selectImage(image);
  }
  selectImage(image) {
    this.props.onSelectImage(image);
    this.props.removeModal();
  }

  closeModal(){
    this.props.removeModal();
  }


  render() {
    const { handleSubmit, set_video_link } = this.props;

    const { isLoading } = this.state;



    return (
      <div>
        {isLoading ? <Loading /> : null  }
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <div className="row">
            <div className="form-group col-sm-12">
              <Field name="video_link" type="text" component={Input} label="YouTube  Link" is_label={true} className="form-control" />
            </div>

          </div>
            <div className="row">
            <div className="form-group col-sm-12">
              <button action="addVideoLink" className="btn btn-outline-primary btn-block" disabled={isLoading}>
                <i className="fa fa-edit"></i> {isLoading ? 'Loading...' : 'add Link'}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {}

  if (!formProps.description) {
    errors.description = 'Required Description';
  }

  return errors;
}

ModalVideo = reduxForm({
  form: 'addVideoLink',
  enableReinitialize: true,
  validate
})(ModalVideo);

function mapStateToProps(state, ownProps) {

  var iniPro = {}
  var data = ownProps.userData.value;
  var video_link = state.image_manager.set_video_link;
  if(data != undefined) {
    iniPro.video_link = data.video_link;
  }else {
    iniPro.video_link = video_link;
  }
  return {
    initialValues: iniPro,
    set_video_link: state.image_manager.set_video_link,
  }
}

export default connect(mapStateToProps, { setdVideoLink })(ModalVideo);
