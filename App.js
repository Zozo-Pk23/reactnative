import React from 'react';
import MainStack from './src/Navigator/MainStack';
import { LogBox } from 'react-native';
export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <MainStack />
  )
}