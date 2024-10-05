import React, { Component } from 'react';




class EmptyListCard extends Component {
	render() {
		const { title, description, image, link } = this.props;

		var card_image = image;

		if(image == undefined || image == '') {
			card_image = '/image/banner/ecommerce-concept.jpg';
		}

		return(
			<div className="empty-list-card">
				<div className="container mt-4">
					<div className="row">
						<div className="col-sm-4 mt-4">
							<h2>{title}</h2>
							<h5 className="mb-3">{description}</h5>
							{link}
						</div>
						<div className="col-sm-2"></div>
						
				</div>
			</div>
			</div>
		);
	}
}

export default EmptyListCard;
