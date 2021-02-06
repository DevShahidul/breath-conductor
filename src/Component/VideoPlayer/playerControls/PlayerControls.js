import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import { PlayArrow, Pause, VolumeOff, VolumeDown, VolumeUp, Fullscreen, FullscreenExit } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ControlsWrapper, ControlWrapMiddle, ControlWrapBottom, SkipIntro } from './PlayerContorls.element';
import { Typography } from '@material-ui/core';
import { BsPlayFill } from "react-icons/bs";

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const PrettoSlider = withStyles({
  root: {
    color: '#4e5662',
    height: 2,
  },
  thumb: {
    opacity: 0,
    height: 16,
    width: 16,
    //border: '2px solid currentColor',
    marginTop: -6,
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffff',
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
})(Slider);

//const theme = useTheme();

const useStyles = makeStyles((theme, iconColor) => ({
    controlIcons: {
        fontSize: '35px',
        transform: 'scale(0.9)',
        "&:hover":{
            transform: 'scale(1)'
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '25px',
            padding: '5px'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            padding: '2px'
        }
    },
    
    controlIconsPlay: {
        fontSize: '30px',
        background: '#ffffff !important',
        color: '#1d1e23 !important'
    },

    muteControl: {
        '&:hover + span':{
            width: '60px'
        }
    },
    
    volumeSlider: {
        overflow: 'hidden',
        width: '0px',
        color: '#ffffff',
        marginRight: '5px',
        transition: 'width .3s ease-in',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width: '60px'
        },
        '&:hover':{
            width: '60px'
        }
        
    },
    timeDisplay: {
        minWidth: '10px',
        fontSize: '12px',
        marginLeft: '10px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px'
        }
    },
    playBack: {
        fontSize: '16px',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));

export const PlayerControls = ({
    onPlayPause, 
    playing, 
    // onRewind,
    // onForward, 
    muted, 
    onMute, 
    onVolumeChange,
    onVolumeSeekUp, 
    volume,
    onToggleFullScreen,
    toggleFullScreen,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    onChangeTimeDisplayFormate,
    VolumeHigh,
    onSkipIntro,
    hideIntroSkipBtn,
    timeId,
    endVideo
}) => {
    const classes = useStyles();

    const handleEnd = () => {
        endVideo();
    }


    return (
        <ControlsWrapper>
            <ControlWrapMiddle onClick={onPlayPause} className={playing ? 'middle-control played' : 'middle-control paused'}>
                {/* <IconButton onClick={onRewind} className={`${classes.controlIcons} ${classes.skipPreviousIcon}`} aria-label="reqind">
                    <SkipPrevious fontSize="inherit"/>
                </IconButton> */}
                <IconButton className={classes.controlIconsPlay} aria-label="reqind">
                    {playing ? <Pause fontSize="inherit" /> : <PlayArrow fontSize="inherit"/>}
                </IconButton>
                {/* <IconButton onClick={onForward} className={classes.controlIcons} aria-label="reqind">
                    <SkipNext fontSize="inherit"/>
                </IconButton> */}
            </ControlWrapMiddle>
            <ControlWrapBottom>
                { timeId !== "9" ?
                <>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={12}> 
                        <PrettoSlider 
                        min={0} 
                        max={100} 
                        value={played * 100}
                        ValueLabelComponent={(props) => ( <ValueLabelComponent {...props} value={elapsedTime} />)}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <IconButton onClick={onPlayPause} className={classes.controlIcons} aria-label="reqind">
                                {playing ? <Pause fontSize="inherit" /> : <BsPlayFill fontSize="inherit"/>}
                            </IconButton>
                            <Button className={classes.timeDisplay} onClick={onChangeTimeDisplayFormate} variant="text" >
                                <Typography>{elapsedTime}</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <IconButton onClick={onToggleFullScreen} className={classes.controlIcons} aria-label="reqind">
                                {toggleFullScreen ? <FullscreenExit fontSize="inherit" /> : <Fullscreen fontSize="inherit"/> }
                            </IconButton>
                            <IconButton onClick={onMute} className={`${classes.controlIcons} ${classes.muteControl}`} aria-label="reqind">
                                {muted ? <VolumeOff fontSize="inherit"/> : VolumeHigh ? <VolumeUp fontSize="inherit" /> : <VolumeDown fontSize="inherit"/>}
                            </IconButton>
                            <Slider 
                            className={classes.volumeSlider} 
                            min={0} 
                            max={100} 
                            value={volume * 100} 
                            onChange={onVolumeChange} 
                            onChangeCommitted={onVolumeSeekUp}
                            aria-labelledby="continuous-slider" />
                        </Grid>
                    </Grid> 
                </Grid>
                {!hideIntroSkipBtn ? <SkipIntro onClick={onSkipIntro}>Skip intro</SkipIntro> : null} 
                </> : 
                <Button fullWidth={true} onClick={handleEnd} variant="contained" color="primary">End</Button> }
            </ControlWrapBottom>
        </ControlsWrapper>
    )
}
