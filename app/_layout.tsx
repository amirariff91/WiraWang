import React from 'react';
import { Stack } from 'expo-router';
import { QuizProvider } from './context/QuizContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <QuizProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: '#F5F5F5',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="quiz-selection" 
          options={{ 
            title: 'Pilih Kuiz',
          }} 
        />
        <Stack.Screen 
          name="quiz/[id]" 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="quiz-result" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
    </QuizProvider>
  );
}
