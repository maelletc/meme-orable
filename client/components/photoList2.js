import axios from 'axios';
import React from 'react';

export default class photoList2 extends React.Component {
  state = {
    photoList: []
  }

  componentDidMount() {
    axios.get(`Localhost:3001/`)
      .then(res => {
        const photoList = res.data;
        this.setState({ photoList });
      })
  }

  render() {
    return null;
    
  }
}
