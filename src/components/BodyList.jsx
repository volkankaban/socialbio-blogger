import React, { Component } from 'react'
import { withStyles } from '@mui/material/styles'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import PostList from './PostList'
import PostPage from './PostPage'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  box: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },
  },
})

class BodyList extends Component {
  state = {}
  render() {
    const { classes } = this.props
    return (
      <Box>
        <Container maxWidth="lg">
          <Box className={classes.box}>
            <div className={classes.root}>
              <Grid container justify="center">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" exact render={(props) => <PostList {...props} updateLabel={this.props.updateLabel} />} />
                    <Route path="/([0-9]+)/([0-9]+)/([\.\-\w\S]+)" exact render={(props) => <PostPage {...props} updateLabel={this.props.updateLabel} />} />
                    <Route path="/search/label/:label([\w\s]+)" exact render={(props) => <PostList {...props} updateLabel={this.props.updateLabel} isLabelPage={true} />} />
                    <Route path="/search" exact render={(props) => <PostList {...props} updateLabel={this.props.updateLabel} isSearchPage={true} />} />
                  </Routes>
                </BrowserRouter>
              </Grid>
            </div>
          </Box>
        </Container>
      </Box>
    )
  }
}

export default withStyles(styles)(BodyList)
