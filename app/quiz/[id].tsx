import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useQuiz } from '../context/QuizContext';

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { quizData, currentScore, setCurrentScore } = useQuiz();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const quiz = quizData.find(q => q.id === id);

  if (!quiz) {
    Alert.alert("Error", "Quiz not found", [
      { text: "OK", onPress: () => router.back() }
    ]);
    return null;
  }

  const question = quiz.questions[currentQuestion];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === question.correctAnswer) {
      setCurrentScore(currentScore + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push({
        pathname: '/quiz-result',
        params: { score: currentScore.toString(), total: quiz.questions.length.toString() }
      });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View key={currentQuestion} entering={FadeIn} exiting={FadeOut}>
        <ThemedText type="title" style={styles.question}>{question.question}</ThemedText>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => handleAnswer(index)}
          >
            <ThemedText style={styles.optionText}>{option}</ThemedText>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF8E1', // Lighter orange background for better contrast
  },
  question: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#E65100', // Darker orange color for question
    fontSize: 20,
    fontWeight: 'bold',
  },
  option: {
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
  optionText: {
    color: '#212121', // Darker text for better contrast
    fontSize: 16,
  },
});