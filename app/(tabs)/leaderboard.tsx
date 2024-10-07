import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const mockLeaderboardData = [
  { id: '1', name: 'Ali', score: 95 },
  { id: '2', name: 'Siti', score: 90 },
  { id: '3', name: 'Ahmad', score: 85 },
  // Add more mock data as needed
];

export default function LeaderboardScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Papan Pendahulu</ThemedText>
      <FlatList
        data={mockLeaderboardData}
        renderItem={({ item, index }) => (
          <View style={styles.leaderboardItem}>
            <ThemedText style={styles.rank}>{index + 1}</ThemedText>
            <ThemedText style={styles.name}>{item.name}</ThemedText>
            <ThemedText style={styles.score}>{item.score}</ThemedText>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1B5E20', // Dark green for better contrast
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
    color: '#F57C00', // Orange for rank
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: '#212121', // Darker text for better contrast
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32', // Green for score
  },
});