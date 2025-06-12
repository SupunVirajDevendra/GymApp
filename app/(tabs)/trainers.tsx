import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  image: string;
  bio: string;
  classes: string[];
}

const trainers: Trainer[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Yoga & Pilates',
    rating: 4.9,
    reviews: 128,
    experience: '8 years',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    bio: 'Certified yoga instructor specializing in Vinyasa and Power Yoga. Passionate about helping others achieve their fitness goals.',
    classes: ['Power Yoga', 'Pilates', 'Meditation'],
  },
  {
    id: 2,
    name: 'Mike Chen',
    specialty: 'HIIT & Strength',
    rating: 4.8,
    reviews: 95,
    experience: '6 years',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    bio: 'Former professional athlete turned fitness trainer. Expert in high-intensity interval training and strength conditioning.',
    classes: ['HIIT', 'Strength Training', 'CrossFit'],
  },
  {
    id: 3,
    name: 'Emma Davis',
    specialty: 'Dance & Cardio',
    rating: 4.7,
    reviews: 112,
    experience: '5 years',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    bio: 'Professional dancer with a passion for fitness. Specializes in dance-based cardio workouts and flexibility training.',
    classes: ['Zumba', 'Dance Cardio', 'Stretching'],
  },
  {
    id: 4,
    name: 'David Wilson',
    specialty: 'CrossFit & Functional',
    rating: 4.9,
    reviews: 156,
    experience: '10 years',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    bio: 'CrossFit Level 3 trainer with extensive experience in functional fitness and Olympic weightlifting.',
    classes: ['CrossFit', 'Weightlifting', 'Functional Training'],
  },
];

export default function TrainersScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTrainerCard = (trainer: Trainer) => (
    <View key={trainer.id} style={styles.trainerCard}>
      <Image source={{ uri: trainer.image }} style={styles.trainerImage} />
      <View style={styles.trainerInfo}>
        <View style={styles.trainerHeader}>
          <View>
            <Text style={styles.trainerName}>{trainer.name}</Text>
            <Text style={styles.trainerSpecialty}>{trainer.specialty}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{trainer.rating}</Text>
            <Text style={styles.reviewsText}>({trainer.reviews})</Text>
          </View>
        </View>
        
        <Text style={styles.trainerBio} numberOfLines={2}>
          {trainer.bio}
        </Text>
        
        <View style={styles.classesContainer}>
          {trainer.classes.map((className, index) => (
            <View key={index} style={styles.classTag}>
              <Text style={styles.classTagText}>{className}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.trainerFooter}>
          <View style={styles.experienceContainer}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.experienceText}>{trainer.experience} experience</Text>
          </View>
        </View>
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
        <Text style={styles.title}>Our Trainers</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search trainers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#6B7280"
        />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {filteredTrainers.map(renderTrainerCard)}
      </ScrollView>
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
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  content: {
    padding: 16,
  },
  trainerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  trainerImage: {
    width: '100%',
    height: 200,
  },
  trainerInfo: {
    padding: 16,
  },
  trainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  trainerSpecialty: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  trainerBio: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  classesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  classTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  classTagText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  trainerFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
}); 