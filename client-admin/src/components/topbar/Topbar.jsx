import React from "react";
import "./topbar.css";
import { withRouter } from 'react-router-dom';
import { logout } from '../../redux/reducers/authReducer';
import { connect } from 'react-redux';

const Topbar = ({ logout, isAuth }) => {

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Le Record </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
          
          {isAuth && (
            <button action={ () => {
              logout();
            }}  className="widgetSmButton"> Logout </button>

          )}

          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout }) (withRouter(Topbar) );

