import React, { Component } from 'react';

class LoadingPage extends Component {

  render() {
    return (
      <div className="alc-page-loading">
      <div className="container m-auto  py-5">
        <div className="row">
        <div className="col-sm-3 mb-3">
          <div className="card">
            <div className="card-body p-4">
                <div className="line loading w-50"></div>
                <br />
                <div className="line loading w-50"></div>
                <br />
                <div className="line loading w-100"></div>
                <br />
                <div className="button loading small rounded-pill"></div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mb-3">
          <div className="card p-3">
            <div className="card-body">
              <div className="mb-3">
                <div className="line loading"></div>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                <div className="line loading"></div>
                </div>
              </div>
              <div className="card">
                <div className="card-body p-4">
                <div className="loading" style={{"height":"12rem"}}></div>
                <div className="line loading"></div>
                <br />
                <div className="line loading"></div>
                <br />
                <div className="button loading rounded-pill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card">
            <div className="card-body p-4">
                <div className="line loading w-50"></div>
                <br />
                <div className="line loading w-50"></div>
                <br />
                <div className="line loading w-100"></div>
                <br />
                <div className="button loading small rounded-pill"></div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default LoadingPage;
