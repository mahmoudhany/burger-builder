import React, { Component } from 'react';
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
          open={this.state.showSideDrawer}
          clicked={this.sideDrawerOpenHandler}
        />
        <SideDrawer
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

export default Layout;
