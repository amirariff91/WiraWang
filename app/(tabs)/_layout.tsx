import React from 'react';
import { Pressable } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4CAF50',
        headerLeft: () => {
          if (route.name !== 'index') {
            return (
              <Pressable onPress={() => router.back()} style={{ marginLeft: 16 }}>
                <Ionicons name="arrow-back" size={24} color="#4CAF50" />
              </Pressable>
            );
          }
          return null;
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'WiraWang',
          headerTitle: 'WiraWang',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Papan Pendahulu',
          headerTitle: 'Papan Pendahulu',
          tabBarIcon: ({ color }) => <Ionicons name="trophy" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
