/**
 * Copyright (с) 2015-present, SoftIndex LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { omit } from './utils';

class ChildrenWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      children: props.children
    };
    this.setChildren = this.setChildren.bind(this);
  }

  setChildren(children) {
    this.setState({children: children});
  }

  render() {
    return (
      <div {...omit(this.props, ['onDocumentMouseDown', 'onDocumentMouseScroll', 'styles'])}>{this.state.children}</div>
    );
  }
}

const portalClass = '__portal';

export class Portal extends React.Component {
  constructor(props) {
    super(props);
    this._isDocumentEventOwner = this._isDocumentEventOwner.bind(this);
    this._onDocumentMouseDown = this._onDocumentMouseDown.bind(this);
    this._onDocumentMouseScroll = this._onDocumentMouseScroll.bind(this);
    this.state = {
      portal: null
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._onDocumentMouseDown, false);
    document.addEventListener('scroll', this._onDocumentMouseScroll, true);

    const portal = document.createElement('div');
    document.body.appendChild(portal);
    portal.className = portalClass;
    this.state.portal = portal;
    ReactDOM.render(
      <ChildrenWrapper
        {...this.props}
        style={this.props.styles}
        ref={(wrapper) => {
          this.state.wrapper = wrapper; // TODO this.wrapper = wrapper;
        }}
      >
        {this.props.children}
      </ChildrenWrapper>,
      this.state.portal
    );
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
    document.removeEventListener('scroll', this._onDocumentMouseScroll, true);

    ReactDOM.unmountComponentAtNode(this.state.portal);
    document.body.removeChild(this.state.portal);
  }

  componentDidUpdate() {
    this.state.wrapper.setChildren(this.props.children);
  }

  _isDocumentEventOwner(target) {
    return $(target).parents(`.${portalClass}`).get(0) === this.state.portal;
  }

  _onDocumentMouseDown(e) {
    if (this.props.onDocumentMouseDown) {
      this.props.onDocumentMouseDown(e, this._isDocumentEventOwner(e.target));
    }
  }

  _onDocumentMouseScroll(e) {
    if (this.props.onDocumentMouseScroll) {
      this.props.onDocumentMouseScroll(e, this._isDocumentEventOwner(e.target));
    }
  }

  render() {
    return <span/>; // TODO Try with null
  }
}

ChildrenWrapper.propTypes = {
  children: PropTypes.node,
};

Portal.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  onDocumentMouseDown: PropTypes.func,
  onDocumentMouseScroll: PropTypes.func,
};

export default Portal;
