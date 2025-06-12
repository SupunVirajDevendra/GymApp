import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const achievements = [
  {
    id: 1,
    title: 'Early Bird',
    description: 'Attended 5 morning classes',
    icon: 'sunny-outline',
    progress: 3,
    total: 5,
  },
  {
    id: 2,
    title: 'Yoga Master',
    description: 'Complete 10 yoga sessions',
    icon: 'body-outline',
    progress: 7,
    total: 10,
  },
  {
    id: 3,
    title: 'Consistency King',
    description: 'Work out 3 times a week for a month',
    icon: 'trophy-outline',
    progress: 8,
    total: 12,
  },
];

const stats = [
  {
    id: 1,
    title: 'Total Workouts',
    value: '24',
    icon: 'fitness-outline',
  },
  {
    id: 2,
    title: 'Hours Trained',
    value: '36',
    icon: 'time-outline',
  },
  {
    id: 3,
    title: 'Calories Burned',
    value: '12,450',
    icon: 'flame-outline',
  },
];

const recentWorkouts = [
  {
    id: 1,
    name: 'HIIT Training',
    date: 'Today',
    duration: '45 min',
    calories: '450',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500',
  },
  {
    id: 2,
    name: 'Yoga Flow',
    date: 'Yesterday',
    duration: '60 min',
    calories: '320',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
  },
  {
    id: 3,
    name: 'Strength Training',
    date: '2 days ago',
    duration: '50 min',
    calories: '380',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
  },
];

export default function ProgressScreen() {
  const handleShare = async () => {
    try {
      const message = `My Fitness Progress:
🏋️‍♂️ Total Workouts: 24
⏱️ Hours Trained: 36
🔥 Calories Burned: 12,450

Achievements:
🌅 Early Bird: 3/5 morning classes
🧘‍♂️ Yoga Master: 7/10 yoga sessions
👑 Consistency King: 8/12 workouts

Check out my fitness journey! 💪`;

      await Share.share({
        message,
        title: 'My Fitness Progress',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#1F2937" />
            </TouchableOpacity>
            <Text style={styles.title}>My Progress</Text>
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={handleShare}
            >
              <Ionicons name="share-outline" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name={stat.icon as any} size={24} color="#3B82F6" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                <Ionicons name={achievement.icon as any} size={24} color="#3B82F6" />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${(achievement.progress / achievement.total) * 100}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {achievement.progress}/{achievement.total}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          {recentWorkouts.map((workout) => (
            <View key={workout.id} style={styles.workoutCard}>
              <Image source={{ uri: workout.image }} style={styles.workoutImage} />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDate}>{workout.date}</Text>
                <View style={styles.workoutStats}>
                  <View style={styles.workoutStat}>
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text style={styles.workoutStatText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.workoutStat}>
                    <Ionicons name="flame-outline" size={16} color="#6B7280" />
                    <Text style={styles.workoutStatText}>{workout.calories} cal</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  shareButton: {
    padding: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  workoutImage: {
    width: '100%',
    height: 120,
  },
  workoutInfo: {
    padding: 15,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  workoutDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  workoutStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutStatText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
}); 