import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

function BluetoothPage() {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const manager = new BleManager();

  const startScanning = () => {
    setIsScanning(true);
    setDevices([]);
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.error(error);
        return;
      }
      if (scannedDevice) {
        setDevices((prevDevices) => {
          if (prevDevices.find((d) => d.id === scannedDevice.id)) {
            return prevDevices; // Device is already in the list
          }
          return [...prevDevices, scannedDevice];
        });
      }
    });
  };

  const stopScanning = () => {
    setIsScanning(false);
    manager.stopDeviceScan();
  };

  const connectToDevice = (device) => {
    stopScanning();
    device
      .connect()
      .then((connectedDevice) => connectedDevice.discoverAllServicesAndCharacteristics())
      .then((connectedDevice) => {
        setConnectedDevice(connectedDevice);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => connectToDevice(item)}>
      <Text>{item.name || 'Unnamed device'} - {item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {isScanning ? (
        <Button title="Stop Scanning" onPress={stopScanning} />
      ) : (
        <Button title="Start Scanning" onPress={startScanning} />
      )}
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {connectedDevice && <Text>Connected to {connectedDevice.name || 'Unnamed device'}</Text>}
    </View>
  );
}

export default BluetoothPage;
