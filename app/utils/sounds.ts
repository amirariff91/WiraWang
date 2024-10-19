import { Audio } from 'expo-av';

const loadSound = async (soundFile: any): Promise<Audio.Sound | undefined> => {
  const sound = new Audio.Sound();
  try {
    await sound.loadAsync(soundFile);
    return sound;
  } catch (error) {
    console.error('Error loading sound', error);
    return undefined;
  }
};

export const playCorrectSound = async () => {
  const sound = await loadSound(require('@/assets/sounds/correct.mp3'));
  if (sound) {
    await sound.playAsync();
  }
};

export const playIncorrectSound = async () => {
  const sound = await loadSound(require('@/assets/sounds/incorrect.mp3'));
  if (sound) {
    await sound.playAsync();
  }
};

export const playCompletionSound = async () => {
  const sound = await loadSound(require('@/assets/sounds/completion.mp3'));
  if (sound) {
    await sound.playAsync();
  }
};
