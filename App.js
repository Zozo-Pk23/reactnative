import React from 'react';
import MainStack from './src/navigator/MainStack';
import { LogBox } from 'react-native';
import { AuthProvider } from './ApiService';
export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  )
}