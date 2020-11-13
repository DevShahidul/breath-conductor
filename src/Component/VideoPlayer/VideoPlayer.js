import React, { useState, useRef, useContext } from 'react';
import {BreathContext} from '../../context'
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { PlayerWrap, PlayerLoader} from './VideoPlayer.elements';
import PlayerControls from './playerControls';
import LoadingGif from '../../Assets/Image/gif/loading-circle.gif';


const formate = (seconds) => {
  if(isNaN(seconds)){
    return '00:00';
  }
  const date = new Date(seconds * 1000 );
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds();
  
  if(hh){
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
  }

  return `${mm}:${ss}`
}

export const VideoPlayer = ({onSyllabusToggle, syllabusExpanded, header}) => {
    const { handleEndVideo, exerciseVideo, intro_duration } = useContext(BreathContext);

    const [state, setState] = useState({
        playing: false,
        muted: false,
        volume: 0.5,
        fullScreenStatus: false,
        played: 0,
        seeking: false,
        timeDisplayFormate: 'normal',
        volumeTop: false,
        loading: true
    })

    const [skiptIntro, setsSkiptIntro] = useState({
        hideSkipIntro: true,
    })

    const { playing, muted, volume, fullScreenStatus, played, seeking, timeDisplayFormate, volumeTop, loading} = state;

    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : "00:00";
    const duration = playerRef.current ? playerRef.current.getDuration() : "00:00";

    const elapsedTime = timeDisplayFormate === 'normal' ? formate(currentTime) : `-${formate(duration - currentTime)}`;
    const totalDuration = formate(duration);

    const skiptedDuration =  intro_duration.split(':').reduce((acc,time) => (60 * acc) + +time);

    // Handle change display formate
    const handleChangeTimeDisplayFormate = () => {
      setState({
        ...state,
        timeDisplayFormate: timeDisplayFormate === 'normal' ? 'remaining' : 'normal'
      })
    }

    // Handle seek change
    const handleSeekChange = (e, newValue) => {
      setState({
        ...state, 
        played: parseFloat(newValue / 100)
      })
    }

    // Handle Seek mouse down
    const handleSeekMouseDown = () => {
      setState({...state, seeking: true})
    }

    // Handle Seek mouse up
    const handleSeekMouseUp = (e, newValue) => {
      setState({
        ...state, 
        seeking: false
      })
      playerRef.current.seekTo(newValue / 100);
    }

    // const handleEndVideo = () => {
    //   console.log(" I'm working!!!!!")
    // }

    // Handle progress time
    const handleProgress = (changeState) => {
      // console.log(changeState)
      if(!seeking){
        setState({
          ...state,
          ...changeState
        })
      }

      let getCurrentPlayingTime = playerRef.current.getCurrentTime();
      
      if(getCurrentPlayingTime >= skiptedDuration){
        setsSkiptIntro({
          ...state,
          hideSkipIntro: true
        })
      }


    }

    // Handle full screen function 
    const handleToggleFullScreen = () => {
      setState({
        ...state,
        fullScreenStatus: !fullScreenStatus
      })
      screenfull.toggle(playerContainerRef.current);
    }

    // Volume change function
    const handleVolumeChange = (e, newValue) => {
      setState({
        ...state,
        volume: parseFloat(newValue/100),
        muted: newValue === 0 ? true : false,
        volumeTop: newValue >= 80 ? true : false
      })
    }
    // Volume seek down function
    const handleVolumeSeekUp = (e, newValue) => {
      setState({
        ...state,
        volume: parseFloat(newValue/100),
        muted: newValue === 0 ? true : false
      })
    }
    // Handle Mute function
    const handleOnMuted = () => {
      setState({
        ...state, 
        muted: !muted,
        volume: muted === false ? 0 : 0.5
      })
    }

    // Handle Rewind function
    const handleRewind = () => {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
      const timer = setTimeout(() => {
        setState({
          ...state,
          playing: true
        })
      }, 1000);
      return () => clearTimeout(timer);
    }
    // Handle Forward function
    const handleForward = () => {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
      const timer = setTimeout(() => {
        setState({
          ...state,
          playing: true
        })
      }, 1000);
      return () => clearTimeout(timer);
    }
  

    const handleOnSkip = () => {
      playerRef.current.seekTo(0 + skiptedDuration );
      const timer = setTimeout(() => {
        setState({
          ...state,
          playing: true
        })

        setsSkiptIntro({
          ...skiptIntro,
          hideSkipIntro: true,
        })
        //console.log('This will run after 1 second!')
      }, 1000);
      return () => clearTimeout(timer);
      
    }

    const handleOnReady = () => {
      setState({
        loading: false
      })
    }

    const handleOnstart = () => {
      setState({
        ...state,
        playing: true
      })
    }

    // Handle play pause function
    const handlePlayPause = () => {
      setState({
        ...state, 
        playing: !playing,
      })
    }

    // Handle OnBuffer
    const handleOnBuffer = () => {
      const timer = setTimeout(() => {
        setState({
          ...state,
          playing: true
        })
        //console.log('This will run after 1 second!')
      }, 500);
      return () => clearTimeout(timer);
    }

    let proxyurl = "https://quiet-retreat-79741.herokuapp.com/";

    return (
    <PlayerWrap className={header ? 'headerShown' : ''} header={header} syllabusToggle={onSyllabusToggle} syllabusExpanded={syllabusExpanded} ref={playerContainerRef}>
        {loading ? <PlayerLoader src={LoadingGif} alt="Loader image" /> : null }
        <ReactPlayer
          className='react-player'
          url={proxyurl+exerciseVideo}
          width='100%'
          height='100%'
          muted={muted}
          playing={playing}
          ref={playerRef}
          volume={volume}
          onReady={handleOnReady}
          onProgress={handleProgress}
          onBuffer={handleOnBuffer}
          onEnded={handleEndVideo}
          onStart={handleOnstart}
          config={{
            file:{
              attributes:{
                crossOrigin: "anonymous"
              }
            }
          }}
        />
        {!loading ? 
        <PlayerControls 
          onPlayPause={handlePlayPause} 
          playing={playing} 
          onRewind={handleRewind} 
          onForward={handleForward} 
          muted={muted} 
          onMute={handleOnMuted} 
          volume={volume}
          VolumeHigh={volumeTop}
          onVolumeChange={handleVolumeChange} 
          onVolumeSeekUp={handleVolumeSeekUp} 
          onToggleFullScreen={handleToggleFullScreen}
          toggleFullScreen={fullScreenStatus}
          played={played}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          onChangeTimeDisplayFormate={handleChangeTimeDisplayFormate}
          onSkipIntro={handleOnSkip}
          hideIntroSkipBtn={state.hideSkipIntro}
        /> : null }
    </PlayerWrap>
    )
}



