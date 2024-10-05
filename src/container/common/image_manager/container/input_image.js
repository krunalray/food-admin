import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { modal } from '../../../common/modal';
import Manager from './manager';
import ModalVideo from '../modal/video';


class InputImage extends Component {

	constructor(props) {
    super(props);
    this.onSelectImage = this.onSelectImage.bind(this);
  }

	Manager(title, userData) {
    modal.add(Manager, {
      title: title,
      size: 'large',
      closeOnOutsideClick: false,
      hideCloseButton: false,
      userData: userData,
			onSelectImage: this.onSelectImage,
      dashboard: true
    });
  }
	onSelectImage(image) {
		//console.log("image>>>>>>>>>>>>>>>>>>>>>", image);
		if(image == "") {
			this.props.input.onChange("");
		} else {
			if(this.props.input){
				this.props.input.onChange(image);
			}
		}
  }

	modelVideo(title, userData) {
		modal.add(ModalVideo, {
			title: title,
			size: 'large',
			closeOnOutsideClick: false,
			hideCloseButton: false,
			userData: userData,
			onSelectImage: this.onSelectImage,
			dashboard: true
		});
	}

	searchCommonImage(title, search_image_page, userData) {
		modal.add(Manager, {
      title: title,
      size: 'large',
      closeOnOutsideClick: false,
      hideCloseButton: false,
      userData: userData,
			onSelectImage: this.onSelectImage,
			dashboard: true,
			searchImagePage: search_image_page,
			commonSearch: this.props.common_search,
			commonSearchResource: this.props.common_search_resource,
    });
	}

	checkImageUrl = (imgUrl) => {

		// console.log("imageurl>>>>>>", imgUrl);

		// let image = new Image();

		// image.src = imgUrl;

		// console.log("image>>>>>>", image);

		// if(image.width == 0) {
		// 	return false;
		// } else {
		// 	return true;
		// }

		var image = new Image();

    image.src = imgUrl;

		console.log("image>>>>>", image);

    if (!image.complete) {
			return false;
    } else if (image.height === 0) {
			return false;
    }

    return true;
	}


  render() {

		const { input, icon, label, is_label, size, disabled, type, meta, setting, video, common_search, common_search_page, common_search_resource } = this.props;
		
		// console.log(common_search);
		// console.log(common_search_page);
		// console.log(input.value);

    var inputLabel = '';
    if(is_label) {
      inputLabel = <label className="control-label">{label}</label>;
    }
		var image_link = "common/default.png";
		if (input.value) {
			

			image_link =  input.value;
		}
	
		var image_box_size_class = '';
		if(size && size == "sm"){
			image_box_size_class = 'image-block-sm';
		}
		return (
			<div className={image_box_size_class}>
				{inputLabel}
				<div className="input-image-block">
					  {
							input.value.video_link

							?
 						<span>
							<div className="video">
							</div>
							<div className="play-overlay">
								<a href="#" className="fa fa-play-circle-o fa-3" data-toggle="modal" data-target="#myModal"></a>
							</div>
								<input type="hidden" value={input.value.video_link} placeholder={label} className="form-control" />
							</span>
						 :
						 <span>
						 <img className="input-image-content" src={image_link} />
							<input type="hidden" value={input.value} placeholder={label}  className="form-control" />
						</span>

					 }

					<div className="input-image-hover-overlay">
						<ul className="input-image-overlay-actions">
							<li>
								<a
									className="input-image-overlay-actions__link"
									onClick={ () => this.Manager('Image Manager', input)}
									>
									<i className="bi bi-pencil-square"></i>
								</a>
							</li>
							{
								video == 'true'
								?
									<li>
										<Link
											className="input-image-overlay-actions__link"
											onClick={ () => this.modelVideo('Video Link Manager', input)}
											>
											<i className="fa fa-video-camera"></i>
										</Link>
									</li>
							 :
								null
						 	}

							{
								common_search === true && common_search_page !== null
								?
									<li>
										<Link
											className="input-image-overlay-actions__link"
											onClick={ () => this.searchCommonImage('Common Search', common_search_page, input)}
										>
											<i className="fa fa-search"></i>
										</Link>
									</li>
								:
									null
							}

							<li>
								<a
									className="input-image-overlay-actions__link"
									onClick={ () => this.onSelectImage('')}
									>
									<i className="fa fa-trash-o"></i>
								</a>
							</li>

						</ul>
					</div>
				</div>
			</div>
		)

  }
}

function mapStateToProps(state) {
  return {
    setting: state.app.settings,
  }
}

export default connect(mapStateToProps)(InputImage);
