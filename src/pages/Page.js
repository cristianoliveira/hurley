import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'app/images/logo.svg';

import 'app/styles/App.sass';

import feedcastApi from 'feedcast-client';
import helpers from 'app/scripts/helpers'

import PlayerFooter from 'app/components/PlayerFooter';
import Footer from './footer'

const FORM_LINK = process.env.REACT_APP_FEEDBACK_FORM_URL || '#';

export default class Page extends Component {
  constructor(props) {
    super(props);

    let { lc } = helpers.localize(this)

    this.state = {
      categories: [],
      populated: false,
      showSidebar: window.innerWidth >= 500,
      activePlayer: false,
      lc
    }
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  componentDidMount() {
    this._isMounted = true
    feedcastApi
    .getCategories({per_page: 50, page: 1})
    .then( data => {
        this.setState({
          categories : data.categories,
          populated: true
        })
    })
  }

  toggleSidebar(bol, ifMobile){
    if('boolean' === typeof ifMobile){
      if(ifMobile && window.innerWidth <= 500){
        this.setState({ showSidebar: bol })
      }
    } else {
      if(bol && 'boolean' === typeof bol){
        this.setState({ showSidebar: bol })
      } else {
        this.setState({ showSidebar: ! this.state.showSidebar});
      }
    }
  }

  render() {
    const { lc } = this.state

    return (
      <div className={`feedcast feedcast--sidebar-${this.state.showSidebar?'active':'inactive'}`}>
        <div className="feedcast__header">
          <button
            onClick={()=>{this.toggleSidebar()}}
            className="feedcast__sidebar-toggle">
            <i className="fa fa-bars"></i>
          </button>
          <NavLink to="/" className="feedcast__logo-wrapper">
            <img src={logo} className="feedcast__logo" alt="logo" />
          </NavLink>
        </div>
        <div className={`feedcast__container feedcast__sidebar--${this.state.showSidebar?'active':'inactive'}`}>
          <div className="feedcast__container-wrapper">
            {this.props.children}
          </div>
          <Footer lc={lc} />
        </div>
        <div
          onClick={()=>{this.toggleSidebar(false)}}
          className={`feedcast__sidebar-overlay feedcast__sidebar-overlay--${this.state.showSidebar ? 'show':'hide'}`}></div>
        <div className={`feedcast__sidebar feedcast__sidebar--${this.state.showSidebar ? 'show':'hide'}`}>
          <div className="feedcast__sidebar-wrapper">
            <NavLink exact onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/"><i className="fa fa-home"></i> {lc.home}</NavLink>
            <NavLink onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/episodes"><i className="fa fa-history"></i> {lc.episodes}</NavLink>
            <NavLink onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/channels"><i className="fa fa-rss"></i> {lc.channels}</NavLink>
            <NavLink onClick={()=>{this.toggleSidebar(false, true)}} activeClassName="active" to="/queue"><i className="fa fa-indent"></i> {lc.queue}</NavLink>
            <a href={FORM_LINK} target="_blank"><i className="fa fa-comments-o"></i> {lc.feedback}</a>
            <h5>{lc.categories}</h5>
            {
              this.state.categories
                .sort((a,b)=>b.channels.length - a.channels.length)
                .map((c, i)=>(
                  <NavLink
                    onClick={()=>{this.toggleSidebar(false, true)}}
                    key={i}
                    to={`/category/${c.slug}`}>
                    <i className={`fa fa-${c.icon}`}></i>
                    {` ${helpers.translate(c.title)}`}
                    <span>{c.channels.length}</span>
                  </NavLink>))
            }
          </div>
        </div>
        <PlayerFooter />
      </div>
    );
  }
}
