import React, { Component } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import BodyList from './components/BodyList.jsx'
// import CommentList from './components/CommentList.jsx'
import NavBar from './components/NavBar.jsx'
// import PostList from './components/PostList.jsx'
// import PostPage from './components/PostPage.jsx'

class App extends Component {
  state = {
    label: []
  }

  updateLabel = (arr) => {
    this.setState({ label: arr })
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar label={this.state.label} />
        <BodyList updateLabel={this.updateLabel} />
      </React.Fragment>
    );
  }
}

export default App