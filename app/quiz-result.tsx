import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, ScrollView, SafeAreaView, Dimensions, ActivityIndicator, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useQuiz } from '@/app/context/QuizContext';
import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { addLeaderboardEntry } from '@/app/utils/leaderboard';

const { width } = Dimensions.get('window');

interface Answer {
  question: number;
  answer: number;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export default function QuizResultScreen() {
  const { score, total, answers, quizId } = useLocalSearchParams();
  const router = useRouter();
  const { setCurrentScore, quizData } = useQuiz();
  const confettiRef = useRef<ConfettiCannon>(null);
  const [isLoading, setIsLoading] = useState(true);

  const quiz = quizData.find((q: Quiz) => q.id === quizId);
  const parsedAnswers: Answer[] = JSON.parse(answers as string);
  const scorePercentage = (Number(score) / Number(total)) * 100;

  useEffect(() => {
    const addScore = async () => {
      if (scorePercentage >= 80 && confettiRef.current) {
        confettiRef.current.start();
      }
      await addLeaderboardEntry('Player', Number(score), quizId as string);
      setIsLoading(false);
    };
    addScore();
  }, [score, scorePercentage, quizId]);

  const handleReturnHome = () => {
    setCurrentScore(0);
    router.push('/');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score}/${total} in the ${quiz?.title} quiz on Wira Wang app!`,
      });
    } catch (error) {
      console.error('Error sharing result:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.gradientContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <ThemedText style={styles.loadingText}>Mengira skor anda...</ThemedText>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (!quiz) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Kuiz tidak dijumpai</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.gradientContainer}>
        {scorePercentage >= 80 && (
          <ConfettiCannon
            count={200}
            origin={{x: -10, y: 0}}
            autoStart={false}
            ref={confettiRef}
          />
        )}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Pressable onPress={handleReturnHome} style={styles.backButton}>
              <Ionicons name="home" size={24} color="#FFFFFF" />
            </Pressable>
            <ThemedText type="title" style={styles.title}>Keputusan Kuiz</ThemedText>
            <Pressable onPress={handleShare} style={styles.shareButton}>
              <Ionicons name="share-outline" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <ThemedText style={styles.scorePercentage}>{scorePercentage.toFixed(0)}%</ThemedText>
            </View>
            <View style={styles.scoreDetails}>
              <ThemedText style={styles.scoreLabel}>Skor anda</ThemedText>
              <ThemedText style={styles.scoreValue}>{score} / {total}</ThemedText>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${scorePercentage}%` }]} />
              </View>
            </View>
          </View>
          <ThemedText style={styles.encouragementText}>
            {scorePercentage >= 80 ? 'Hebat!' : scorePercentage >= 60 ? 'Bagus!' : 'Teruskan usaha!'}
          </ThemedText>
          
          <ThemedText style={styles.sectionTitle}>Ringkasan Jawapan</ThemedText>
          
          {parsedAnswers.map((answer: Answer, index: number) => {
            const question = quiz.questions[index];
            if (!question) return null;

            const isCorrect = answer.answer === question.correctAnswer;

            return (
              <Animated.View 
                key={index} 
                entering={FadeInUp.delay(index * 100).duration(400)}
                style={[styles.answerItem, isCorrect ? styles.correctAnswerItem : styles.incorrectAnswerItem]}
              >
                <View style={styles.answerHeader}>
                  <ThemedText style={styles.questionNumber}>Soalan {index + 1}</ThemedText>
                  {isCorrect ? (
                    <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                  ) : (
                    <Ionicons name="close-circle" size={24} color="#F44336" />
                  )}
                </View>
                <ThemedText style={styles.questionText}>{question.question}</ThemedText>
                <ThemedText style={[
                  styles.answerText,
                  isCorrect ? styles.correctAnswer : styles.incorrectAnswer
                ]}>
                  Jawapan anda: {question.options[answer.answer]}
                </ThemedText>
                {!isCorrect && (
                  <ThemedText style={styles.correctAnswerText}>
                    Jawapan betul: {question.options[question.correctAnswer]}
                  </ThemedText>
                )}
              </Animated.View>
            );
          })}
        </ScrollView>
        <Pressable style={styles.button} onPress={handleReturnHome}>
          <ThemedText style={styles.buttonText}>Kembali ke Laman Utama</ThemedText>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  gradientContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  scorePercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scoreDetails: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFC107',
    borderRadius: 5,
  },
  encouragementText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  answerItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333333',
  },
  answerText: {
    fontSize: 14,
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  correctAnswer: {
    backgroundColor: '#E8F5E9',
    color: '#1B5E20',
  },
  incorrectAnswer: {
    backgroundColor: '#FFEBEE',
    color: '#B71C1C',
  },
  correctAnswerText: {
    fontSize: 14,
    color: '#1B5E20',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFC107',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1B5E20',
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    padding: 10,
  },
  correctAnswerItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  incorrectAnswerItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 20,
  },
});
