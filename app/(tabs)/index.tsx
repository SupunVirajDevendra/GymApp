import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const featuredClasses = [
    {
      id: 1,
      name: 'HIIT Training',
      instructor: 'John Smith',
      time: '45 min',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500',
    },
    {
      id: 2,
      name: 'Yoga Flow',
      instructor: 'Sarah Johnson',
      time: '60 min',
      level: 'All Levels',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    },
    {
      id: 3,
      name: 'Strength Training',
      instructor: 'Mike Wilson',
      time: '50 min',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
    },
  ];

  const quickActions = [
    {
      id: 1,
      name: 'Book Class',
      icon: 'calendar-outline',
      color: '#3B82F6',
      gradient: ['#3B82F6', '#2563EB'],
      onPress: () => router.push('/book-class'),
    },
    {
      id: 2,
      name: 'My Schedule',
      icon: 'time-outline',
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      onPress: () => router.push('/my-schedule'),
    },
    {
      id: 3,
      name: 'Progress',
      icon: 'stats-chart-outline',
      color: '#8B5CF6',
      gradient: ['#8B5CF6', '#7C3AED'],
      onPress: () => router.push('/progress'),
    },
    {
      id: 4,
      name: 'Trainers',
      icon: 'people-outline',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
      onPress: () => router.push('/trainers'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>Supun Devendra</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Ionicons name="person-circle-outline" size={40} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionButton}
              onPress={action.onPress}
            >
              <LinearGradient
                colors={action.gradient}
                style={styles.quickActionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={action.icon} size={24} color="#FFFFFF" />
              </LinearGradient>
              <Text style={styles.quickActionText}>{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Classes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Classes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.classesScrollView}
          >
            {featuredClasses.map((classItem) => (
              <View
                key={classItem.id}
                style={styles.classCard}
              >
                <Image source={{ uri: classItem.image }} style={styles.classImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.classGradient}
                >
                  <View style={styles.classInfo}>
                    <Text style={styles.className}>{classItem.name}</Text>
                    <View style={styles.classDetails}>
                      <Text style={styles.classInstructor}>{classItem.instructor}</Text>
                      <Text style={styles.classTime}>{classItem.time}</Text>
                    </View>
                    <View style={styles.levelBadge}>
                      <Text style={styles.levelText}>{classItem.level}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleTime}>
              <Text style={styles.scheduleHour}>09:00</Text>
              <Text style={styles.scheduleAM}>AM</Text>
            </View>
            <View style={styles.scheduleInfo}>
              <Text style={styles.scheduleTitle}>Morning Yoga</Text>
              <Text style={styles.scheduleInstructor}>with Sarah Johnson</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Membership Status */}
        <View style={styles.membershipCard}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            style={styles.membershipGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.membershipInfo}>
              <Text style={styles.membershipTitle}>Premium Membership</Text>
              <Text style={styles.membershipExpiry}>Expires in 15 days</Text>
            </View>
            <TouchableOpacity style={styles.renewButton}>
              <Text style={styles.renewButtonText}>Renew</Text>
            </TouchableOpacity>
          </LinearGradient>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    opacity: 0.9,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profileButton: {
    padding: 5,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  quickActionButton: {
    alignItems: 'center',
    width: '22%',
  },
  quickActionGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    color: '#1F2937',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  classesScrollView: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  classCard: {
    width: 280,
    height: 200,
    borderRadius: 16,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  classImage: {
    width: '100%',
    height: '100%',
  },
  classGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 15,
  },
  classInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  className: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  classInstructor: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginRight: 8,
  },
  classTime: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  levelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  scheduleTime: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
  },
  scheduleHour: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scheduleAM: {
    fontSize: 12,
    color: '#6B7280',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  scheduleInstructor: {
    fontSize: 14,
    color: '#6B7280',
  },
  joinButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  membershipCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  membershipGradient: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membershipInfo: {
    flex: 1,
  },
  membershipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  membershipExpiry: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  renewButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  renewButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});
