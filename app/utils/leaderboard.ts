import AsyncStorage from '@react-native-async-storage/async-storage';

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  quizId: string;
}

const LEADERBOARD_KEY = 'leaderboard';

export async function addLeaderboardEntry(name: string, score: number, quizId: string): Promise<void> {
  try {
    const leaderboard = await getLeaderboard();
    const newEntry: LeaderboardEntry = {
      name,
      score,
      date: new Date().toISOString(),
      quizId,
    };
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard.slice(0, 10)));
  } catch (error) {
    console.error('Error adding leaderboard entry:', error);
  }
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const leaderboardJson = await AsyncStorage.getItem(LEADERBOARD_KEY);
    return leaderboardJson ? JSON.parse(leaderboardJson) : [];
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
}

export async function getLeaderboardByQuiz(quizId: string): Promise<LeaderboardEntry[]> {
  const leaderboard = await getLeaderboard();
  return leaderboard.filter(entry => entry.quizId === quizId);
}
