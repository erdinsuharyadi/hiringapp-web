import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { getEng } from '../redux/Actions/Engineer'

import ListEng from './ListEng'

class Eng extends Component {
  constructor(props){
    super(props)
    this.state ={
      data: []
    }
  }

  componentDidMount(){
    console.log("cek:"+this.props.data)
    this.fetchData()
  }

  async fetchData () {
    await this.props.dispatch(getEng())
    console.log("halo"+this.props.data.engList)
    this.setState({data: this.props.data.engList})
    } 

render(){
  return(
    <div>
      <div>
        This is Menu! 2
        <ListEng menu={this.state.data} />
      </div>
    </div>
  )
  }
}

const mapStateToProps = state => {
  return {
    data: state.engList
  }
}

export default connect (mapStateToProps)(Eng)