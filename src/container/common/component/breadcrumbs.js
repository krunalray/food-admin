import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Breadcrumbs extends Component {

  renderBreadcrumb(breadcrumbs) {
    return breadcrumbs.map((breadcrumb) => {
      return (
        <li className="breadcrumb-item text-muted" key={"breadcrumb." + breadcrumb.value}>
          <Link class="text-muted" to={breadcrumb.value}>{breadcrumb.text}</Link>
        </li>
      );
    });
  }

  render() {
    const { breadcrumbs } = this.props;
    if (!breadcrumbs) {
      return <div className="loading">Loading</div>
    }
    return (

     
        <ol class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-2 font-size-sm">
          <li class="breadcrumb-item text-muted active" aria-current="page"><Link className="text-muted" to={"/admin"}>Home</Link></li>
          {this.renderBreadcrumb(breadcrumbs)}
        </ol>
     

    );
  }
}

export default Breadcrumbs;
