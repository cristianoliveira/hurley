import React, { Component } from 'react';


import feedcastApi from './../scripts/feedcastApi'
import FeedcastLoader from './../components/FeedcastLoader'
import Episodes from './../components/home/episodes'
import CategoriesSidebar from './../components/home/categoriesSidebar'
import CategoriesChannelList from './../components/home/categoriesChannelList'
import './../styles/home.sass'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories : [],
      populated: false
    }
  }



  componentDidMount() {
    feedcastApi
    .getCategories()
    .then( data => {
        this.setState({
          categories : data.categories,
          populated: true
        })
    })
  }



  render() {
    const {params} = this.props
    return this.state.populated ? (
      <div className="feedcast__home">
        <CategoriesSidebar categories={this.state.categories} />
        <div className="feedcast__home-content-wrapper">
          <Episodes params={params}/>
          <CategoriesChannelList categories={this.state.categories}/>
        </div>
      </div>
    ) : (<FeedcastLoader />);
  }

}


export default Home;
