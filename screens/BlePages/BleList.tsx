import { Button, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, PermissionsAndroid, Platform, TouchableOpacity, Text, View, FlatList, SafeAreaView } from "react-native";
import { BleManager, Device, LogLevel } from "react-native-ble-plx";

export default function BleList(props: any) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState<boolean>(false);
  const bm = new BleManager();
  bm.setLogLevel(LogLevel.Verbose);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
        .then(e => {
          PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          ]).then((result) => {
            if (result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED ||
                result[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] !== PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Location permissions not granted');
            }
          });
        });
    }

    const subscription = bm.onStateChange((state) => {
      if (state === 'PoweredOn') {
        scanAndConnect();
        subscription.remove();
      } else {
        console.log("status-------Bluetooth status is not available, please check if Bluetooth is turned on, status code: " + state);
        subscription.remove();
      }
    }, true);
    return () => {
      subscription.remove();
      bm.stopDeviceScan();
    };
  }, []);

  const scanAndConnect = () => {
    setScanning(true);
    bm.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("error-------" + error);
        return;
      }
      if (device && device?.id?.length > 0 && device?.name?.length > 0) {
        setDevices(prevDevices => {
          if (prevDevices.findIndex(e => e.id === device.id) === -1) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });
    setTimeout(() => {
      setScanning(false);
      bm.stopDeviceScan();
    }, 30000); // Stop scanning after 10 seconds
  };

  const connectBtn = async (device: Device) => {
    if (!device.serviceUUIDs || device.serviceUUIDs.length === 0) {
      Alert.alert('services---------No available connection service');
      return;
    }

    if (await device.isConnected()) {
      await device.cancelConnection();
      return;
    }

    device.connect()
      .then((device) => {
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        const services = device.services();
        console.log(services);
      })
      .catch((error) => {
        Alert.alert(device.name + error.message + error.errorCode);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        height: 50, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Device List</Text>
        {scanning ? <ActivityIndicator /> : null}
      </View>
      <FlatList
        keyExtractor={item => item.id}
        style={{ height: '100%', flex: 1 }}
        data={devices}
        renderItem={(item) => {
          return (
            <View style={{
              display: 'flex', justifyContent: 'space-between', margin: 8, flexDirection: 'row',
              borderRadius: 12, backgroundColor: 'white', padding: 12
            }}>
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                  Name: {item.item?.name ?? "Null name-unknown device"}
                </Text>
                <Text>
                  Id: {item.item?.id ?? "local name"}
                </Text>
                <Text>
                  Rssi: {item.item?.rssi ?? 0}
                </Text>
              </View>
              {item.item?.isConnectable &&
                <Button onPress={() => {
                  connectBtn(item.item);
                }}>Connect</Button>
              }
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
