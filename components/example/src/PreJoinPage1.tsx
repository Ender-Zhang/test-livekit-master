import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { createLocalVideoTrack, LocalVideoTrack } from 'livekit-client';
// import { AudioSelectButton, ControlButton, VideoSelectButton } from '@livekit/react-components';
import { ControlButton} from '@livekit/react-components';

// import { VideoRenderer } from '@livekit/react-core';
// import { ReactElement, useEffect, useState } from 'react';
import {useEffect, useState } from 'react';
// import { AspectRatio } from 'react-aspect-ratio';
// import { useNavigate } from 'react-router-dom';

// room connection
import { faSquare, faThLarge, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Room, RoomEvent, setLogLevel, VideoPresets } from 'livekit-client';
import { DisplayContext, DisplayOptions, LiveKitRoom } from '@livekit/react-components';
// import { useState } from 'react';
// import 'react-aspect-ratio/aspect-ratio.css';
// import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const PreJoinPage = () => {
  // initial state from query parameters
  // const searchParams = new URLSearchParams(window.location.search);
  // const storedUrl = searchParams.get('url') ?? 'ws://localhost:7880';
  // const storedToken = searchParams.get('token') ?? '';

  // state to pass onto room
  // const [url, setUrl] = useState(storedUrl);
  // const [token, setToken] = useState<string>(storedToken);
  // const [simulcast, setSimulcast] = useState(true);
  // const [dynacast, setDynacast] = useState(true);
  // const [adaptiveStream, setAdaptiveStream] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(false);
  // const [audioEnabled, setAudioEnabled] = useState(true);

  const [simulcast] = useState(true);
  const [dynacast] = useState(true);
  const [adaptiveStream] = useState(true);


  // const [videoEnabled] = useState(false);
  const [audioEnabled] = useState(true);
  // disable connect button unless validated
  const [connectDisabled, setConnectDisabled] = useState(true);
  const [videoTrack, setVideoTrack] = useState<LocalVideoTrack>();
  // const [audioDevice, setAudioDevice] = useState<MediaDeviceInfo>();
  const [audioDevice] = useState<MediaDeviceInfo>();

  // const [videoDevice, setVideoDevice] = useState<MediaDeviceInfo>();
  const [videoDevice] = useState<MediaDeviceInfo>();

  const navigate = useNavigate();


  // connect variables
  const [numParticipants, setNumParticipants] = useState(0);
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    stageLayout: 'grid',
    showStats: false,
  });
  // const navigate = useNavigate();
  // const query = new URLSearchParams(useLocation().search);
  // const url = query.get('url');
  // const token = query.get('token');
  // const recorder = query.get('recorder');
  const url = 'wss://testyuz.livekit.cloud';
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkzd0d3NG1hNDlxdXYiLCJleHAiOjE2Nzk0MzU3MTEsInN1YiI6InVzZXIiLCJqdGkiOiJ1c2VyIiwibmFtZSI6Inp5YzEyMyIsIm1ldGFkYXRhIjoibWV0YWRhdGEiLCJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InRlc3QiLCJyb29tTGlzdCI6dHJ1ZSwicm9vbUFkbWluIjp0cnVlLCJyb29tQ3JlYXRlIjp0cnVlfX0.agwTclIy4MvSpiWUBDKRIA7-rGxhb_09ZpXDklT2shg";
  var url1 = new URL("https://example.livekit.io/#/room?url=wss%3A%2F%2Ftestyuz.livekit.cloud&token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkzd0d3NG1hNDlxdXYiLCJleHAiOjE2Nzk0MzU3MTEsInN1YiI6InVzZXIiLCJqdGkiOiJ1c2VyIiwibmFtZSI6Inp5YzEyMyIsIm1ldGFkYXRhIjoibWV0YWRhdGEiLCJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InRlc3QiLCJyb29tTGlzdCI6dHJ1ZSwicm9vbUFkbWluIjp0cnVlLCJyb29tQ3JlYXRlIjp0cnVlfX0.agwTclIy4MvSpiWUBDKRIA7-rGxhb_09ZpXDklT2shg&videoEnabled=1&audioEnabled=1&simulcast=1&dynacast=1&adaptiveStream=1&videoDeviceId=8dfb8cbced4ab1b954f541c4c4efc189ab9e0b0439e005c4dcad4c51691bcb1b"); 
  var query: URLSearchParams = new URLSearchParams(url1.search);
  


  const onLeave = () => {
    navigate('/');
  };

  const updateParticipantSize = (room: Room) => {
    setNumParticipants(room.participants.size + 1);
  };

  const onParticipantDisconnected = (room: Room) => {
    updateParticipantSize(room);

    /* Special rule for recorder */
    // if (recorder && parseInt(recorder, 10) === 1 && room.participants.size === 0) {
    //   console.log('END_RECORDING');
    // }
  };

  const updateOptions = (options: DisplayOptions) => {
    setDisplayOptions({
      ...displayOptions,
      ...options,
    });
  };


  useEffect(() => {
    if (token && url) {
      setConnectDisabled(false);
    } else {
      setConnectDisabled(true);
    }
  }, [token, url]);

  // const toggleVideo = async () => {
  //   if (videoTrack) {
  //     videoTrack.stop();
  //     setVideoEnabled(false);
  //     setVideoTrack(undefined);
  //   } else {
  //     const track = await createLocalVideoTrack({
  //       deviceId: videoDevice?.deviceId,
  //     });
  //     setVideoEnabled(true);
  //     setVideoTrack(track);
  //   }
  // };

  useEffect(() => {
    // enable video by default
    createLocalVideoTrack({
      deviceId: videoDevice?.deviceId,
    }).then((track) => {
      setVideoEnabled(true);
      setVideoTrack(track);
    });
  }, [videoDevice]);

  // const toggleAudio = () => {
  //   if (audioEnabled) {
  //     setAudioEnabled(false);
  //   } else {
  //     setAudioEnabled(true);
  //   }
  // };

  // const selectVideoDevice = (device: MediaDeviceInfo) => {
  //   setVideoDevice(device);
  //   if (videoTrack) {
  //     if (videoTrack.mediaStreamTrack.getSettings().deviceId === device.deviceId) {
  //       return;
  //     }
  //     // stop video
  //     videoTrack.stop();
  //   }
  // };

  const connectToRoom = async () => {
    if (videoTrack) {
      videoTrack.stop();
    }

    if (
      window.location.protocol === 'https:' &&
      url.startsWith('ws://') &&
      !url.startsWith('ws://localhost')
    ) {
      alert('Unable to connect to insecure websocket from https');
      return;
    }

    const params: { [key: string]: string } = {
      url,
      token,
      videoEnabled: videoEnabled ? '1': '0',
      audioEnabled: audioEnabled ? '1' : '0',
      simulcast: simulcast ? '1' : '0',
      dynacast: dynacast ? '1' : '0',
      adaptiveStream: adaptiveStream ? '1' : '0',
    };
    if (audioDevice) {
      params.audioDeviceId = audioDevice.deviceId;
    }
    if (videoDevice) {
      params.videoDeviceId = videoDevice.deviceId;
    } else if (videoTrack) {
      // pass along current device id to ensure camera device match
      const deviceId = await videoTrack.getDeviceId();
      if (deviceId) {
        params.videoDeviceId = deviceId;
      }
    }
    // navigate({
    //   pathname: '/room',
    //   search: '?' + new URLSearchParams(params).toString(),
    // });
    // console.log('params', new URLSearchParams(params).toString());
    // const vdom =   <LiveKitRoom
    //                       url={url}
    //                       token={token}
    //                       onConnected={(room) => {
    //                         setLogLevel('debug');
    //                         onConnected(room, query);
    //                         room.on(RoomEvent.ParticipantConnected, () => updateParticipantSize(room));
    //                         room.on(RoomEvent.ParticipantDisconnected, () => onParticipantDisconnected(room));
    //                         updateParticipantSize(room);
    //                       }}
    //                       roomOptions={{
    //                         adaptiveStream: isSet(query, 'adaptiveStream'),
    //                         dynacast: isSet(query, 'dynacast'),
    //                         publishDefaults: {
    //                           simulcast: isSet(query, 'simulcast'),
    //                         },
    //                         videoCaptureDefaults: {
    //                           resolution: VideoPresets.h720.resolution,
    //                         },
    //                       }}
    //                       onLeave={onLeave}
    //                     />
    // var vdom:string = "<p>hello</p>" + "<p>hello"+"</p>";
    
    // console.log('vdom', vdom);
    // (document.getElementById("test") as Element).appendChild(vdom);

    // return <p>hello</p>;

    

  };

  // let videoElement: ReactElement;
  // if (videoTrack) {
  //   videoElement = <VideoRenderer track={videoTrack} isLocal={true} />;
  // } else {
  //   videoElement = <div className="placeholder" />;
  // }

  return (
    <div>
    <div className="prejoin">
      <main>
        <hr />
        <div className="entrySection">
          {/* <div>
            <div className="label">LiveKit URL</div>
            <div>
              <input type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
          </div> */}
          <div>
            <div className="label">Token</div>
            {/* <div>
              <input
                type="text"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                autoFocus={true}
              />
            </div> */}
          </div>
          {/* <div className="options">
            <div>
              <input
                id="simulcast-option"
                type="checkbox"
                name="simulcast"
                checked={simulcast}
                onChange={(e) => setSimulcast(e.target.checked)}
              />
              <label htmlFor="simulcast-option">Simulcast</label>
            </div>
            <div>
              <input
                id="dynacast-option"
                type="checkbox"
                name="dynacast"
                checked={dynacast}
                onChange={(e) => setDynacast(e.target.checked)}
              />
              <label htmlFor="dynacast-option">Dynacast</label>
            </div>
            <div>
              <input
                id="adaptivestream-option"
                type="checkbox"
                name="adaptiveStream"
                checked={adaptiveStream}
                onChange={(e) => setAdaptiveStream(e.target.checked)}
              />
              <label htmlFor="adaptivestream-option">Adaptive Stream</label>
            </div>
          </div> */}
        </div>

        {/* <div className="videoSection">
          <AspectRatio ratio={16 / 9}>{videoElement}</AspectRatio>
        </div> */}

        <div className="controlSection">
          {/* <div>
            <AudioSelectButton
              isMuted={!audioEnabled}
              onClick={toggleAudio}
              onSourceSelected={setAudioDevice}
            />
            <VideoSelectButton
              isEnabled={videoTrack !== undefined}
              onClick={toggleVideo}
              onSourceSelected={selectVideoDevice}
            />
          </div> */}
          <div className="right">
            <ControlButton
              label="Connect"
              disabled={connectDisabled}
              icon={faBolt}
              onClick={connectToRoom}
            />
          </div>
        </div>
      </main>
    </div>
    <div>    <DisplayContext.Provider value={displayOptions}>
    <div className="roomContainer">
      <div className="topBar">
        <h2>LiveKit Video</h2>
        <div className="right">
          <div>
            <input
              id="showStats"
              type="checkbox"
              onChange={(e) => updateOptions({ showStats: e.target.checked })}
            />
            <label htmlFor="showStats">Show Stats</label>
          </div>
          <div>
            <button
              className="iconButton"
              disabled={displayOptions.stageLayout === 'grid'}
              onClick={() => {
                updateOptions({ stageLayout: 'grid' });
              }}
            >
              <FontAwesomeIcon height={32} icon={faThLarge} />
            </button>
            <button
              className="iconButton"
              disabled={displayOptions.stageLayout === 'speaker'}
              onClick={() => {
                updateOptions({ stageLayout: 'speaker' });
              }}
            >
              <FontAwesomeIcon height={32} icon={faSquare} />
            </button>
          </div>
          <div className="participantCount">
            <FontAwesomeIcon icon={faUserFriends} />
            <span>{numParticipants}</span>
          </div>
        </div>
      </div>
        <div id = "test">
          <LiveKitRoom
            url={url}
            token={token}
            onConnected={(room) => {
              setLogLevel('debug');
              onConnected(room, query);
              room.on(RoomEvent.ParticipantConnected, () => updateParticipantSize(room));
              room.on(RoomEvent.ParticipantDisconnected, () => onParticipantDisconnected(room));
              updateParticipantSize(room);
            }}
            roomOptions={{
              adaptiveStream: isSet(query, 'adaptiveStream'),
              dynacast: isSet(query, 'dynacast'),
              publishDefaults: {
                simulcast: isSet(query, 'simulcast'),
              },
              videoCaptureDefaults: {
                resolution: VideoPresets.h720.resolution,
              },
            }}
            onLeave={onLeave}
          />
        </div>
    </div>
  </DisplayContext.Provider></div>
  </div>
  );


};


async function onConnected(room: Room, query: URLSearchParams) {
  // make it easier to debug
  (window as any).currentRoom = room;

  if (isSet(query, 'audioEnabled')) {
    const audioDeviceId = query.get('audioDeviceId');
    if (audioDeviceId && room.options.audioCaptureDefaults) {
      room.options.audioCaptureDefaults.deviceId = audioDeviceId;
    }
    await room.localParticipant.setMicrophoneEnabled(true);
  }

  if (isSet(query, 'videoEnabled')) {
    const videoDeviceId = query.get('videoDeviceId');
    if (videoDeviceId && room.options.videoCaptureDefaults) {
      room.options.videoCaptureDefaults.deviceId = videoDeviceId;
    }
    await room.localParticipant.setCameraEnabled(true);
  }
}

function isSet(query: URLSearchParams, key: string): boolean {
  return query.get(key) === '1' || query.get(key) === 'true';
}