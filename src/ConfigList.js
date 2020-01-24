import React, {useState} from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {
  List,
  Fab,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DescriptionIcon from '@material-ui/icons/Description'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: 'auto',
    height: 400,
    position: 'relative'
  },
  addButton: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  configInput: {
    width: 400
  }
}))

const ConfigList = ({filter, configs, addConfig, removeConfig}) => {
  const theme = useTheme()
  const classes = useStyles()

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  }

  const [showAddConfigDialog, setShowAddConfigDialog] = useState(false)
  const [newConfigURL, setNewConfigURL] = useState('')

  const handleRemoveConfig = url => {
    removeConfig(url)
  }
  const handleAddConfig = () => {
    setNewConfigURL('')
    setShowAddConfigDialog(false)
    addConfig(newConfigURL)
  }
  const handleCancelAddConfig = () => {
    setNewConfigURL('')
    setShowAddConfigDialog(false)
  }

  const filteredConfigs = filter
    ? configs.filter(config => config.name.toLowerCase().includes(filter))
    : configs

  return (
    <div className={classes.root}>
      <List>
        {filteredConfigs.map(config => (
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={config.name} secondary={config.url} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit">
                <DeleteIcon onClick={() => handleRemoveConfig(config.url)} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={showAddConfigDialog}
        onClose={handleCancelAddConfig}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add a new Configuration
        </DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              label="Configuration File URL"
              className={classes.configInput}
              value={newConfigURL}
              onChange={e => setNewConfigURL(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelAddConfig}>Cancel</Button>
          <Button onClick={handleAddConfig} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Zoom
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `0ms`
        }}
        unmountOnExit
      >
        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => setShowAddConfigDialog(true)}
        >
          <AddIcon className={classes.extendedIcon} />
        </Fab>
      </Zoom>
    </div>
  )
}

export default ConfigList
