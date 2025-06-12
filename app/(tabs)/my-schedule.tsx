import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Class {
  id: number;
  name: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  level: string;
  image: string;
  location: string;
}

const upcomingClasses: Class[] = [
  {
    id: 1,
    name: 'Power Yoga',
    instructor: 'Sarah Johnson',
    date: 'Today',
    time: '10:00 AM',
    duration: '60 min',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Studio A',
  },
  {
    id: 2,
    name: 'HIIT Training',
    instructor: 'Mike Chen',
    date: 'Tomorrow',
    time: '2:00 PM',
    duration: '45 min',
    level: 'Advanced',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Main Hall',
  },
  {
    id: 3,
    name: 'Strength Training',
    instructor: 'Emma Davis',
    date: 'Friday',
    time: '9:00 AM',
    duration: '60 min',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Weight Room',
  },
];

const pastSessions: Class[] = [
  {
    id: 1,
    name: 'Cardio Blast',
    instructor: 'Alex Thompson',
    date: 'Yesterday',
    time: '5:00 PM',
    duration: '45 min',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Main Hall',
  },
  {
    id: 2,
    name: 'Yoga Flow',
    instructor: 'Sarah Johnson',
    date: 'Monday',
    time: '8:00 AM',
    duration: '60 min',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    location: 'Studio A',
  },
];

export default function MyScheduleScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCancelBooking = (classId: number) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this class?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Handle cancellation logic here
            console.log('Class cancelled:', classId);
          },
        },
      ],
    );
  };

  const renderCalendarView = () => (
    <Modal
      visible={showCalendar}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowCalendar(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>Calendar View</Text>
            <TouchableOpacity onPress={() => setShowCalendar(false)}>
              <Ionicons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <View style={styles.calendarContent}>
            <View style={styles.calendarNavigation}>
              <TouchableOpacity style={styles.calendarNavButton}>
                <Ionicons name="chevron-back" size={24} color="#1F2937" />
              </TouchableOpacity>
              <Text style={styles.calendarMonth}>March 2024</Text>
              <TouchableOpacity style={styles.calendarNavButton}>
                <Ionicons name="chevron-forward" size={24} color="#1F2937" />
              </TouchableOpacity>
            </View>

            <View style={styles.calendarGrid}>
              {/* Days of week */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <Text key={day} style={styles.calendarDayHeader}>{day}</Text>
              ))}

              {/* Calendar days */}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i + 1;
                const hasClass = upcomingClasses.some(
                  (cls) => cls.date === `March ${day}`
                );

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.calendarDay,
                      hasClass && styles.calendarDayWithClass,
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarDayText,
                        hasClass && styles.calendarDayTextWithClass,
                      ]}
                    >
                      {day}
                    </Text>
                    {hasClass && (
                      <View style={styles.calendarDayDot} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.calendarLegend}>
              <View style={styles.legendItem}>
                <View style={styles.legendDot} />
                <Text style={styles.legendText}>Class Scheduled</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderClassCard = ({ item }: { item: Class }) => (
    <View style={styles.classCard}>
      <Image source={{ uri: item.image }} style={styles.classImage} />
      <View style={styles.classInfo}>
        <View style={styles.classHeader}>
          <Text style={styles.className}>{item.name}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{item.level}</Text>
          </View>
        </View>
        <Text style={styles.classInstructor}>with {item.instructor}</Text>
        <View style={styles.classDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.time} ({item.duration})</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        {activeTab === 'upcoming' && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => handleCancelBooking(item.id)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>Join Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>My Schedule</Text>
        <TouchableOpacity style={styles.calendarButton} onPress={() => setShowCalendar(true)}>
          <Ionicons name="calendar-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past Sessions
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'upcoming' ? upcomingClasses : pastSessions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderClassCard}
        contentContainerStyle={styles.classesList}
        showsVerticalScrollIndicator={false}
      />

      {renderCalendarView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    textAlign: 'center',
  },
  calendarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  classesList: {
    padding: 20,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  classImage: {
    width: '100%',
    height: 160,
  },
  classInfo: {
    padding: 16,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  className: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  levelBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '600',
  },
  classInstructor: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  classDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '500',
  },
  joinButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  calendarContent: {
    paddingBottom: 20,
  },
  calendarNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarNavButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  calendarMonth: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  calendarDayHeader: {
    width: '14.28%',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  calendarDayWithClass: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#1F2937',
  },
  calendarDayTextWithClass: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  calendarDayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3B82F6',
    marginTop: 2,
  },
  calendarLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#6B7280',
  },
}); 