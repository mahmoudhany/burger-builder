import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import './Layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  sideDrawerOpenHandler = () => {
    this.setState({
      showSideDrawer: true
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          clicked={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className="content">
          {this.props.children}
        </main>
      </Aux >
    )
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}
export default connect(mapStateToProps)(Layout);
