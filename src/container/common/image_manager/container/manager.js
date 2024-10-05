import React,  { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Field,reduxForm } from 'redux-form'
import { getImageList, setImagePath, insertImageFolder, imageUpload, deleteImage } from '../system/action';
import { Loading, Tooltip, ModalConfirmation } from '../../../common/component';
import { Link } from 'react-router-dom';
import { modal } from '../../../common/modal';
import _ from 'lodash';

class ImageManager extends Component {

  constructor(props) {
    super(props);
    this.state = { folder_name: '', isLoading: false, isError: '', filter_search_text: '' };
    this.handleInsertFolderSubmit = this.handleInsertFolderSubmit.bind(this);
    this.handleInsertFolderChange = this.handleInsertFolderChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.onDeleteConfim = this.onDeleteConfim.bind(this);
  }

  componentWillMount() {
    var _this = this;
    this.setState({ isLoading: true });
    var current_path = "";
    if(this.props.image_path && this.props.image_path != undefined) {
      current_path = this.props.image_path;
    }
    this.props.setImagePath(current_path);

    let searchCommonImage = {};
    searchCommonImage.search_common_image = false;

    if(this.props.searchImagePage !== undefined) {
      searchCommonImage.search_common_image_page = this.props.searchImagePage;
      searchCommonImage.search_common_image = true;
      searchCommonImage.search_common_resource = this.props.commonSearchResource;
    }

    this.props.getImageList(current_path, searchCommonImage, function(err, result) {
      _this.setState({isLoading: false});
      if(result) {
      }
    });
  }

	filterResults = (filter_path) => {
    var _this = this;
    this.setState({ isLoading : true, filter_search_text: '' });
    if(this.props.image_path != "") {
      if(filter_path != "") {
        filter_path = this.props.image_path + '/' + filter_path;
      } else {
        filter_path = this.props.image_path;
      }
    }

    let searchCommonImage = {};
    searchCommonImage.search_common_image = false;

    if(this.props.searchImagePage !== undefined) {
      searchCommonImage.search_common_image_page = this.props.searchImagePage;
      searchCommonImage.search_common_image = true;
      searchCommonImage.filter_search = null;
      searchCommonImage.search_common_resource = this.props.commonSearchResource;
    }

    this.props.getImageList(filter_path, searchCommonImage, function(err, result) {
      _this.setState({isLoading: false});
      if(result) {
      }
    });

    this.props.setImagePath(filter_path);
  }

	filterBack = (filter_path) => {
    if(filter_path) {
      var _this = this;
      this.setState({ isLoading : true});
      if(filter_path != "") {
        var filter_value = filter_path.split("/");
        if(filter_value.length > 1) {
          filter_path = filter_path.replace("/"+filter_value[filter_value.length - 1], "");
        } else {
          filter_path = "";
        }
      }

      let searchCommonImage = {};
      searchCommonImage.search_common_image = false;

      if(this.props.searchImagePage !== undefined) {
        searchCommonImage.search_common_image_page = this.props.searchImagePage;
        searchCommonImage.search_common_image = true;
        searchCommonImage.filter_search = this.state.filter_search_text;
        searchCommonImage.search_common_resource = this.props.commonSearchResource;
      }

      this.props.getImageList(filter_path, searchCommonImage, function(err, result) {
        _this.setState({isLoading: false});
        if(result) {
        }
      });
      this.props.setImagePath(filter_path);
    }
  }

  closeModal(){
    this.props.removeModal();
  }

  selectImage(image) {
    this.props.onSelectImage(image);
    this.props.removeModal();
  }

  handleInsertFolderSubmit(event) {
    var _this = this;
    event.preventDefault();
    this.setState({folder_name: ''});
    this.props.insertImageFolder(this.state.folder_name, this.props.image_path, function(err, result) {
      if(result) {
        _this.setState({showFolderForm: !_this.state.showFolderForm});
        _this.filterResults("");
      }
    });
  }

  handleInsertFolderChange(event) {
    this.setState({folder_name: event.target.value});
  }

  handleImageChange(event) {
    var _this = this;
    event.preventDefault();
    _.keys(event.target.files).map((index) => {
      const file = event.target.files[index];
      if (this.props.passBase64) {
        const reader = new FileReader();
        reader.onload = (upload) => {
          const base64 = upload.target.result;
          //console.log(file);
          //console.log(base64);
          this.props.imageUpload(file, base64, this.props.image_path, function(err, result) {
            if(result != undefined && result.error != undefined) {
              _this.setState({ isError: result.error });
            } else {
              _this.filterResults("");
            }
          });
        }
        reader.readAsDataURL(file);
      } else {
        this.props.imageUpload(file, this.props.image_path, function(err, result) {
          if(result != undefined && result.error != undefined) {
            _this.setState({ isError: result.error });
          } else {
            _this.filterResults("");
          }
        });
      }
    });
  }

  /*deleteFile(file_name) {
    var _this = this;
    this.props.deleteImage(file_name, this.props.image_path, function(err, result) {
      if(result) {
        _this.filterResults("");
      }
    });
  }*/

  onDeleteConfim(file_name){
    this.setState({ isLoading: true });
    var _this = this;
    this.props.deleteImage(file_name, this.props.image_path, function(err, result) {
      if(result) {
        _this.filterResults("");
        _this.setState({ isLoading: false });
      }
    });
  }

  deleteFile(file_name) {
    modal.add(ModalConfirmation, {
      title: "Are you sure you want to delete?",
      size: 'medium',
      closeOnOutsideClick: false,
      hideCloseButton: false,
      data: file_name,
      onDeleteConfim: this.onDeleteConfim,
    });
  }

  insertFoderForm() {
    this.setState({showFolderForm: !this.state.showFolderForm});
  }

  insertFoderFormRender() {
    return(
      <div className="row header">
        <div className="col-sm-11">
          <form onSubmit={this.handleInsertFolderSubmit} >
            <label>
              New Folder:
              <input type="text" value={this.state.folder_name} onChange={this.handleInsertFolderChange} />
            </label>
            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </div>
        <div className="col-sm-1">
          <Link className="link btn btn-default" onClick={ () => this.insertFoderForm(this)} >
            <i className="fa fa-lg fa-times"></i>
          </Link>
        </div>
      </div>
    )
  }

	renderDirectories = () => {
	  return this.props.images.directory.map((file) => {
	  	return(
        <div className="col-sm-3 col-xs-6 text-center image-card" key={file}>
          <Link className="link" onClick={ () => this.filterResults(file)} >
            <div className="folder-image"><i className="fa fa-folder fa-5x"></i></div>
          </Link>
          {
            this.props.commonSearch === undefined
            ?
              <span 
                className="link btn btn-danger btn-sm pull-left delete-button" 
                onClick={ () => this.deleteFile(file)}
              >
                <i className="fa fa-trash-o"></i>
              </span>
            :
              null
          }
          <Link className="link" onClick={ () => this.filterResults(file)} >
            <div className="image-name">{file}</div>
          </Link>
        </div> 
      )
	  });
	}

  renderFiles(setting) {
    if(this.props.commonSearch !== undefined) {
      const files = this.props.images.file;

      if(files.length > 0) {
        let store_url = setting.https_url + '/public/common/' + this.props.searchImagePage;

        return files.map((file, index) => {  
          return(
            <div className="col-sm-3 col-xs-6 text-center image-card" key={"file-" + file + "-" + index}>
    
              <button type="button" className="link" onClick={ () => this.selectImage('/' + (this.props.image_path ? this.props.image_path + '/' : '') + file)}>
                <div className="image-image">
                  <img className="img-thumbnail" src={store_url + '/' + (this.props.image_path ? this.props.image_path + '/' : '') + file} />
                </div>
              </button>
              <Link className="link" onClick={ () => this.selectImage('/' + (this.props.image_path ? this.props.image_path + '/' : '') + file)} >
                <div className="image-name">{file}</div>
              </Link>
            </div>
          );
        });
      } else {
        if(this.props.images.directory.length <= 0) {
          return (
            <div className="col-sm-12">
              <h6 className="text-center mb-0 font-weight-bold">No Files Found!</h6>
            </div>
          );
        }
      }
    } else {
      return this.props.images.file.map((file, index) => {
        //var  store_url ='http://'+ setting.app_url + '/image/app';
        //var store_url ='http://'+ setting.app_url + '/public/app';
        let store_url = setting.https_url + '/public/app';
  
        return(
          <div className="col-sm-3 col-xs-6 text-center image-card" key={"file-" + file + "-" + index}>
            <div className="mb-2">
              <button type="button" className="link" style={{ backgroundColor: "transparent", border: "none" }} onClick={ () => this.selectImage(setting.app_id+ '/' + this.props.image_path + '/' + file)}>
                <div className="image-image"><img className="img-thumbnail" src={store_url +'/'+setting.app_id+ '/' + this.props.image_path + '/' + file} /></div>
              </button>
            </div>
            <div className="clearfix">
              <span 
                className="link btn btn-danger btn-sm pull-left delete-button" 
                onClick={ () => this.deleteFile(file)} 
              >
                <i className="fa fa-trash-o"></i>
              </span>
              <Link className="link" onClick={ () => this.selectImage(setting.app_id+ '/' + this.props.image_path + '/' + file)} >
                <div className="image-name">{file}</div>
              </Link>
            </div>
          </div>
        );
      });
    }	  
	}

  openFileDialog () {
    var fileInputDom = ReactDOM.findDOMNode(this.refs.fileInput);
    fileInputDom.click();
  }

  filterSearch = (e) => {
    // console.log(e.target.value);
    var _this = this;
    this.setState({ isLoading :true, filter_search_text: e.target.value });

    const filter_path = this.props.image_path;

    let searchCommonImage = {};
    searchCommonImage.search_common_image = false;

    if(this.props.searchImagePage !== undefined) {
      searchCommonImage.search_common_image_page = this.props.searchImagePage;
      searchCommonImage.search_common_image = true;
      searchCommonImage.filter_search = e.target.value;
      searchCommonImage.search_common_resource = this.props.commonSearchResource;
    }
    
    this.props.getImageList(filter_path, searchCommonImage, function(err, result) {
      _this.setState({isLoading: false});
    });
  }

  render() {

		const { images, image_path, settings } = this.props;
    const { isLoading, isError, filter_search_text } = this.state;

    if(settings == undefined || !images) {
      return(
        <div><Loading /></div>
      );
    }

    var setting = {};
    setting.app_id = settings.app_id;
    setting.app_url = settings.app_url;
    setting.https_url = settings.https_url;
    var app_id = setting.app_id;

    return (
      <div>
        { isLoading ? <Loading /> : null }
        {
          isError
          ?
          <div className="alert alert-danger mb-5 mt-1">
            {isError}
          </div>
          :
          null
        }
        <div className="image-manager" id="image-manager">
					<div className="row header">
						<div className="col-sm-6">
							{
                image_path != ''
                ?
                  <Link className="link btn btn-default" onClick={ () => this.filterBack(image_path)} data-toggle="tooltip" data-origin-title="Parent" >
                    <i className="fa fa-reply"></i>
                  </Link>
                :
                  null
              }
							<Link className="link btn btn-default">
								<i className="fa fa-refresh" onClick={ () => this.filterResults("")}></i>
							</Link>
              {
                this.props.commonSearch === undefined
                ?
                  <span>
                    <input className="fileInput" ref="fileInput" multiple={true} style={{ display: 'none' }}
                      type="file"
                      name="image"
                      onChange={(e)=>this.handleImageChange(e)} />
                    <Link className="link btn btn-primary" onClick={this.openFileDialog.bind(this)} >
                      <i className="fa fa-upload"></i>
                    </Link>
                    <Link className="link btn btn-default" onClick={ () => this.insertFoderForm(this)} >
                      <i className="fa fa-folder"></i>
                    </Link>
                  </span>
                :
                  null
              }
						</div>

            <div className="col-sm-6">
              {
                this.props.commonSearch !== undefined
                ?
                  <div className="p-2">
                    <input type="text" id="common-search-text" className="form-control" onChange={this.filterSearch.bind(this)} value={filter_search_text} placeholder="Search Image..." />
                  </div>
                :
                  null
              }
            </div>

					</div>
          { this.state.showFolderForm && this.insertFoderFormRender() }
					<div className="row">
            { this.renderDirectories() }
            { this.renderFiles(setting) }
          </div>
        </div>
      </div>
   );
  }
}

function mapStateToProps(state) {
  // console.log("manager state>>>>>>>>>", state);
  return {
    settings: state.app.settings,
    images: state.image_manager.images,
    image_path: state.image_manager.image_path
  }
}

export default connect(mapStateToProps, { getImageList, setImagePath, insertImageFolder, imageUpload, deleteImage })(ImageManager);
