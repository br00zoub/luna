import { ipcRenderer } from 'electron'
import { withStyles } from 'material-ui/styles'
import React from 'react'
import TextField from 'material-ui/TextField'
import { appHeaderStyles } from '../styles'

class SearchBox extends React.Component {
  constructor() {
    super()
    this._onKeyUp = this._onKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  _onKeyUp(e) {
    const el = e.target
    const key = e.which || e.keyCode || 0

    if (key === 13) {
      this.handleChange(e)
    }
    return false
  }
  componentDidMount() {
    const root = this.refs.root
    if (root) {
      root.addEventListener('keypress', this._onKeyUp)
    }
  }
  handleChange(e) {
    if (e) {
      e.preventDefault()
    }
    const { toggleLoader, mode, directory } = this.props
    const value = e.target.value

    if (value && value.length > 2) {
      toggleLoader(true)
      ipcRenderer.send('ipc-event', {
        ipcEvent: 'search-packages',
        cmd: ['search'],
        pkgName: value,
        mode,
        directory
      })
    }
    return false
  }
  render() {
    const value = this.state
    const { classes } = this.props

    return (
      <div ref="root">
        <TextField
          error
          id="search"
          color="secondary"
          label="Search npm"
          InputLabelProps={{ className: classes.searchBoxLabel }}
          inputProps={{ className: classes.searchBoxInput }}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default withStyles(appHeaderStyles)(SearchBox)
