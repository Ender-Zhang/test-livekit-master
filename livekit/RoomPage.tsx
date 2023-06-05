import * as React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  findNodeHandle,
  NativeModules,
} from 'react-native';
import type { RootStackParamList } from './App';
import { useEffect, useState } from 'react';
import { RoomControls } from './RoomControls';
import { ParticipantView } from './ParticipantView';
import {
  DataPacket_Kind,
  Participant,
  RemoteParticipant,
  Room,
  RoomEvent,
} from 'livekit-client';
import { useRoom, useParticipant, AudioSession } from '@livekit/react-native';
import type { TrackPublication } from 'livekit-client';
import { Platform } from 'react-native';
// @ts-ignore
import { mediaDevices, registerGlobals, ScreenCapturePickerView } from 'react-native-webrtc';
import { startCallService, stopCallService } from './callservice/CallService';
import Toast from 'react-native-toast-message';

import 'fastestsmallesttextencoderdecoder';

import { LogLevel, setLogLevel } from 'livekit-client';
import { setJSExceptionHandler } from 'react-native-exception-handler';
setJSExceptionHandler((error) => {
  console.log('error:', error, error.stack);
}, true);

setLogLevel(LogLevel.debug);
registerGlobals();

export const RoomPage = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'RoomPage'>) => {
  const [, setIsConnected] = useState(false);
  const [room] = useState(
    () =>
      new Room({
        publishDefaults: { simulcast: false },
        adaptiveStream: { pixelDensity: 'screen' },
      })
  );
  const { participants } = useRoom(room);
  const url = "wss://testyuz.livekit.cloud";
  // change token here
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ2NzI4NzYsImlzcyI6IkFQSTN3R3c0bWE0OXF1diIsIm5iZiI6MTY4NDY3MTk3Niwic3ViIjoiYWRtaW4iLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoiY2xvdWQiLCJyb29tSm9pbiI6dHJ1ZX19.CurepZhEfQTU_dm-oWCsj5qxRtLj2RGNgsSI9GoCa8A";
  const [isCameraFrontFacing, setCameraFrontFacing] = useState(true);

  // Perform platform specific call setup.
  useEffect(() => {
    startCallService();
    return () => {
      stopCallService();
    };
  }, [url, token, room]);

  // Connect to room.
  useEffect(() => {
    let connect = async () => {
      // If you wish to configure audio, uncomment the following:
      // await AudioSession.configureAudio({
      //   android: {
      //     preferredOutputList: ["earpiece"]
      //   },
      //   ios: {
      //     defaultOutput: "earpiece"
      //   }
      // });
      await AudioSession.startAudioSession();
      //TODO test key  change
      // await room.connect(url, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTMyMjQxNjgsImlzcyI6IkFQSTN3R3c0bWE0OXF1diIsIm5iZiI6MTY4NDIyNDE2OCwic3ViIjoiYWRtaW4iLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoiY2xvdWQiLCJyb29tSm9pbiI6dHJ1ZX19.wH9qami1D8N9hnSlaH-sO7afsKe8lV-o1j3a6rt9E6Q', {});
      await room.connect(url, token, {});
      console.log('connected to ', url, ' ', token);
      setIsConnected(true);
    };

    connect().catch((er) => {
      console.log('Link Fail:')
      console.log(er)
    });
    return () => {
      room.disconnect();
      AudioSession.stopAudioSession();
    };
  }, [url, token, room]);

  // Setup room listeners
  useEffect(() => {
    const dataReceived = (
      payload: Uint8Array,
      participant?: RemoteParticipant
    ) => {
      //@ts-ignore
      let decoder = new TextDecoder('utf-8');
      let message = decoder.decode(payload);

      let title = 'Received Message';
      if (participant != null) {
        title = 'Received Message from ' + participant.identity;
      }
      Toast.show({
        type: 'success',
        text1: title,
        text2: message,
      });
    };
    room.on(RoomEvent.DataReceived, dataReceived);

    return () => {
      room.off(RoomEvent.DataReceived, dataReceived);
    };
  });

  // Setup views.
  const stageView = participants.length > 0 && (
    <ParticipantView participant={participants[0]} style={styles.stage} />
  );

  const renderParticipant: ListRenderItem<Participant> = ({ item }) => {
    return (
      <ParticipantView participant={item} style={styles.otherParticipantView} />
    );
  };

  const otherParticipantsView = participants.length > 0 && (
    <FlatList
      data={participants}
      renderItem={renderParticipant}
      keyExtractor={(item) => item.sid}
      horizontal={true}
      style={styles.otherParticipantsList}
    />
  );

  const { cameraPublication, microphonePublication, screenSharePublication } =
    useParticipant(room.localParticipant);

  // Prepare for iOS screenshare.
  const screenCaptureRef = React.useRef(null);
  const screenCapturePickerView = Platform.OS === 'ios' && (
    <ScreenCapturePickerView ref={screenCaptureRef} />
  );
  const startBroadcast = async () => {
    if (Platform.OS === 'ios') {
      const reactTag = findNodeHandle(screenCaptureRef.current);
      await NativeModules.ScreenCapturePickerViewManager.show(reactTag);
      room.localParticipant.setScreenShareEnabled(true);
    } else {
      room.localParticipant.setScreenShareEnabled(true);
    }
  };

  return (
    <View >
      {/* {stageView} */}
      {otherParticipantsView}
      <RoomControls
        micEnabled={isTrackEnabled(microphonePublication)}
        setMicEnabled={(enabled: boolean) => {
          room.localParticipant.setMicrophoneEnabled(enabled);
        }}
        cameraEnabled={isTrackEnabled(cameraPublication)}
        setCameraEnabled={(enabled: boolean) => {
          room.localParticipant.setCameraEnabled(enabled);
        }}
        switchCamera={async () => {
          let facingModeStr = !isCameraFrontFacing ? 'front' : 'environment';
          setCameraFrontFacing(!isCameraFrontFacing);

          let devices = await mediaDevices.enumerateDevices();
          var newDevice;
          //@ts-ignore
          for (const device of devices) {
            //@ts-ignore
            if (
              device.kind === 'videoinput' &&
              device.facing === facingModeStr
            ) {
              newDevice = device;
              break;
            }
          }

          if (newDevice == null) {
            return;
          }

          //@ts-ignore
          await room.switchActiveDevice('videoinput', newDevice.deviceId);
        }}
        screenShareEnabled={isTrackEnabled(screenSharePublication)}
        setScreenShareEnabled={(enabled: boolean) => {
          if (enabled) {
            startBroadcast();
          } else {
            room.localParticipant.setScreenShareEnabled(enabled);
          }
        }}
        sendData={(message: string) => {
          Toast.show({
            type: 'success',
            text1: 'Sending Message',
            text2: message,
          });

          //@ts-ignore
          let encoder = new TextEncoder();
          let encodedData = encoder.encode(message);
          room.localParticipant.publishData(
            encodedData,
            DataPacket_Kind.RELIABLE
          );
        }}
        onDisconnectClick={() => {
          navigation.pop();
        }}
      />
      {screenCapturePickerView}
    </View>
  );
};

function isTrackEnabled(pub?: TrackPublication): boolean {
  return !(pub?.isMuted ?? true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stage: {
    flex: 1,
    width: '100%',
  },
  otherParticipantsList: {
    width: '100%',
    height: 150,
    flexGrow: 0,
  },
  otherParticipantView: {
    width: 150,
    height: 150,
  },
});
