import React, { Component } from 'react';
class ReportCard extends Component {

  render() {
    const {  title, value,url} = this.props;

  
      return (

        <div className="card card-custom bg-widget"
            style={{
              backgroundImage: 'url(' + url + ')'
            }}
          >
            <div className="card-body">
              <h5 className="card-title font-weight-bold text-muted text-hover-primary">
                {value}
                </h5>
              <p className="card-text font-weight-bold text-success">{title}</p>
            </div>
          </div>
      );
    
  }
}

export default ReportCard;
