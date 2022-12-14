import React, { Component } from 'react'
import { withStyles } from '@mui/material/styles'

import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/lab/Skeleton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import MoreVertIcon from '@mui/icons-material//MoreVert'
import ReplyIcon from '@mui/icons-material/Reply'
import DeleteIcon from '@mui/icons-material/Delete'

import { indigo, grey } from '@mui/material/colors'

import TimeAgo from 'react-timeago'
import { Box } from '@mui/material'

const styles = (theme) => ({
  avatar: {
    backgroundColor: indigo[500],
  },
  dateClass: {
    color: grey[500],
  },
  box: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  cardReply: {
    marginLeft: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  commentContent: {
    padding: theme.spacing(0, 2, 2),
  },
  skeletonTitle: {
    margin: theme.spacing(1, 0),
  },
  skeletoSubHeader: {
    margin: theme.spacing(0, 0, 0.5, 0),
  },
  skeletonContent: {
    paddingBottom: theme.spacing(0),
  },
  skeletoText: {
    marginBottom: theme.spacing(1),
  },
  iconMarginRight: {
    marginRight: theme.spacing(1.5),
  },
})

class Test extends Component {
  state = {
    setAnchorEl: null,
    isReply: false,
  }
  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        {!this.props.isFetchComment ? (
          [...new Array(parseInt(this.props.totalComment))].map((arr, i) => (
            <Card key={i} className={classes.card}>
              <CardHeader
                avatar={<Skeleton variant="circle" width={40} height={40} className={classes.Avatar} />}
                title={<Skeleton height={14} className={classes.skeletoSubHeader} />}
                subheader={<Skeleton height={12} width="40%" className={classes.skeletoSubHeader} />}
              />
              <Box className={classes.commentContent}>
                <Skeleton height={16} className={classes.skeletoSubHeader} />
              </Box>
            </Card>
          ))
        ) : (
          <React.Fragment>
            {this.props.commentList.map((comment, i) => (
              <React.Fragment key={i}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="Comment Option"
                        aria-controls="Comment-menu"
                        aria-haspopup="true"
                        onClick={(event) => {
                          this.setState({ setAnchorEl: event.currentTarget, isReply: true })
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={comment.author[0].name.$t}
                    subheader={
                      <Typography variant="caption" display="block" className={classes.dateClass}>
                        <TimeAgo date={comment.published.$t} />
                      </Typography>
                    }
                  />

                  <Box className={classes.commentContent}>{comment.content.$t}</Box>
                </Card>
                {this.props.commentReplyList
                  .filter((arr) => arr.related === comment.id)
                  .map((reply) => (
                    <Card className={classes.cardReply} key={reply.id}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                          </Avatar>
                        }
                        title={reply.author[0].name.$t}
                        subheader={
                          <Typography variant="caption" display="block" className={classes.dateClass}>
                            <TimeAgo date={reply.published.$t} />
                          </Typography>
                        }
                        action={
                          <IconButton
                            aria-label="Comment Option"
                            aria-controls="Comment-menu"
                            aria-haspopup="true"
                            onClick={(event) => {
                              this.setState({ setAnchorEl: event.currentTarget, isReply: false })
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        }
                      />
                      <Box className={classes.commentContent}>{reply.content.$t}</Box>
                    </Card>
                  ))}
              </React.Fragment>
            ))}
            <Menu
              id="Comment-menu"
              anchorEl={this.state.setAnchorEl}
              keepMounted
              open={Boolean(this.state.setAnchorEl)}
              onClose={() => {
                this.setState({ setAnchorEl: null })
              }}
            >
              {this.state.isReply ? (
                <MenuItem>
                  <ReplyIcon className={classes.iconMarginRight} /> Reply
                </MenuItem>
              ) : null}
              <MenuItem>
                <DeleteIcon className={classes.iconMarginRight} /> Delete
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Test)
