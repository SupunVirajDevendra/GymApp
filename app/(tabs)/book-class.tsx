import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: 1, name: 'All', icon: 'grid-outline' },
  { id: 2, name: 'Yoga', icon: 'body-outline' },
  { id: 3, name: 'HIIT', icon: 'fitness-outline' },
  { id: 4, name: 'Strength', icon: 'barbell-outline' },
  { id: 5, name: 'Cardio', icon: 'heart-outline' },
];

const classes = [
  {
    id: 1,
    name: 'Morning Yoga Flow',
    instructor: 'Sarah Johnson',
    time: '45 min',
    level: 'All Levels',
    category: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    schedule: [
      { day: 'Mon', time: '07:00 AM' },
      { day: 'Wed', time: '07:00 AM' },
      { day: 'Fri', time: '07:00 AM' },
    ],
  },
  {
    id: 2,
    name: 'HIIT Training',
    instructor: 'John Smith',
    time: '30 min',
    level: 'Intermediate',
    category: 'HIIT',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500',
    schedule: [
      { day: 'Tue', time: '08:00 AM' },
      { day: 'Thu', time: '08:00 AM' },
    ],
  },
  {
    id: 3,
    name: 'Strength & Conditioning',
    instructor: 'Mike Wilson',
    time: '60 min',
    level: 'Advanced',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
    schedule: [
      { day: 'Mon', time: '06:00 PM' },
      { day: 'Wed', time: '06:00 PM' },
      { day: 'Fri', time: '06:00 PM' },
    ],
  },
];

const filterOptions = {
  category: ['All', 'Yoga', 'HIIT', 'Strength', 'Cardio'],
  level: ['All Levels', 'Beginner', 'Intermediate', 'Advanced'],
  time: ['Any Time', 'Morning', 'Afternoon', 'Evening'],
  instructor: ['All Instructors', 'Sarah Johnson', 'Mike Chen', 'Emma Davis', 'Alex Thompson'],
};

export default function BookClassScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: 'All',
    level: 'All Levels',
    time: 'Any Time',
    instructor: 'All Instructors',
  });

  const filteredClasses = classes.filter((classItem) => {
    const matchesCategory = selectedFilters.category === 'All' || classItem.category === selectedFilters.category;
    const matchesLevel = selectedFilters.level === 'All Levels' || classItem.level === selectedFilters.level;
    const matchesTime = selectedFilters.time === 'Any Time' || 
      (selectedFilters.time === 'Morning' && classItem.schedule.some(s => s.time.includes('AM'))) ||
      (selectedFilters.time === 'Afternoon' && classItem.schedule.some(s => s.time.includes('PM') && !s.time.includes('8:00 PM'))) ||
      (selectedFilters.time === 'Evening' && classItem.schedule.some(s => s.time.includes('8:00 PM')));
    const matchesInstructor = selectedFilters.instructor === 'All Instructors' || classItem.instructor === selectedFilters.instructor;
    const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesLevel && matchesTime && matchesInstructor && matchesSearch;
  });

  const renderFilterDropdown = () => (
    <Modal
      visible={showFilters}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Text style={styles.filterTitle}>Filter Classes</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          {/* Category Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
              {filterOptions.category.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterOption,
                    selectedFilters.category === category && styles.filterOptionActive,
                  ]}
                  onPress={() => setSelectedFilters({ ...selectedFilters, category })}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilters.category === category && styles.filterOptionTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Level Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Level</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
              {filterOptions.level.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.filterOption,
                    selectedFilters.level === level && styles.filterOptionActive,
                  ]}
                  onPress={() => setSelectedFilters({ ...selectedFilters, level })}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilters.level === level && styles.filterOptionTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Time Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
              {filterOptions.time.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.filterOption,
                    selectedFilters.time === time && styles.filterOptionActive,
                  ]}
                  onPress={() => setSelectedFilters({ ...selectedFilters, time })}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilters.time === time && styles.filterOptionTextActive,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Instructor Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Instructor</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterOptions}>
              {filterOptions.instructor.map((instructor) => (
                <TouchableOpacity
                  key={instructor}
                  style={[
                    styles.filterOption,
                    selectedFilters.instructor === instructor && styles.filterOptionActive,
                  ]}
                  onPress={() => setSelectedFilters({ ...selectedFilters, instructor })}
                >
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilters.instructor === instructor && styles.filterOptionTextActive,
                    ]}
                  >
                    {instructor}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterActions}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setSelectedFilters({
                category: 'All',
                level: 'All Levels',
                time: 'Any Time',
                instructor: 'All Instructors',
              })}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                setSelectedCategory(selectedFilters.category);
                setShowFilters(false);
              }}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Book a Class</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search classes..."
          placeholderTextColor="#6B7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => setShowFilters(true)}>
          <Ionicons name="options-outline" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.classCard}>
            <Image source={{ uri: item.image }} style={styles.classImage} />
            <View style={styles.classInfo}>
              <View style={styles.classHeader}>
                <Text style={styles.className}>{item.name}</Text>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{item.level}</Text>
                </View>
              </View>
              <Text style={styles.classInstructor}>with {item.instructor}</Text>
              <Text style={styles.classTime}>{item.time}</Text>
              <View style={styles.scheduleContainer}>
                {item.schedule.map((slot, index) => (
                  <View key={index} style={styles.scheduleSlot}>
                    <Text style={styles.scheduleDay}>{slot.day}</Text>
                    <Text style={styles.scheduleTime}>{slot.time}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.classesList}
      />

      {renderFilterDropdown()}
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
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  headerRight: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    height: 24,
  },
  classesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    height: 200,
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
    marginBottom: 6,
  },
  classTime: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  scheduleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  scheduleSlot: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  scheduleDay: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1F2937',
  },
  scheduleTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  bookButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterOptionActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#1F2937',
  },
  filterOptionTextActive: {
    color: '#FFFFFF',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resetButtonText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '500',
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
}); 