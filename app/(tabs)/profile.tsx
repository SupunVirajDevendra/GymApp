import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const userInfo = {
  name: 'Supun Devendra',
  email: 'supun.devendra@gmail.com',
  phone: '+94 77 123 4567',
  joinDate: 'January 2024',
  profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
};

const settings = [
  {
    id: 1,
    title: 'Personal Information',
    icon: 'person-outline',
    type: 'link',
  },
  {
    id: 2,
    title: 'Notifications',
    icon: 'notifications-outline',
    type: 'link',
  },
  {
    id: 3,
    title: 'Payment Methods',
    icon: 'card-outline',
    type: 'link',
  },
];

export default function ProfileScreen() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
  });
  const [notifications, setNotifications] = useState({
    classReminders: true,
    promotions: false,
    updates: true,
  });
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', isDefault: false },
  ]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Here you would typically:
            // 1. Clear any auth tokens
            // 2. Clear user data
            // 3. Navigate to login screen
            router.push('/auth/login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderSettingItem = (setting: any) => (
    <TouchableOpacity
      key={setting.id}
      style={styles.settingItem}
      onPress={() => setActiveModal(setting.title)}
    >
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Ionicons name={setting.icon as any} size={24} color="#3B82F6" />
        </View>
        <Text style={styles.settingTitle}>{setting.title}</Text>
      </View>
      <View style={styles.settingRight}>
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  const renderPersonalInfoModal = () => (
    <Modal
      visible={activeModal === 'Personal Information'}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Personal Information</Text>
            <TouchableOpacity onPress={() => setActiveModal(null)}>
              <Ionicons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={personalInfo.name}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, name: text })}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={personalInfo.email}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, email: text })}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.input}
                value={personalInfo.phone}
                onChangeText={(text) => setPersonalInfo({ ...personalInfo, phone: text })}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderNotificationsModal = () => (
    <Modal
      visible={activeModal === 'Notifications'}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity onPress={() => setActiveModal(null)}>
              <Ionicons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.notificationItem}>
              <View>
                <Text style={styles.notificationTitle}>Class Reminders</Text>
                <Text style={styles.notificationDescription}>Get notified before your classes</Text>
              </View>
              <Switch
                value={notifications.classReminders}
                onValueChange={(value) => setNotifications({ ...notifications, classReminders: value })}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.notificationItem}>
              <View>
                <Text style={styles.notificationTitle}>Promotions</Text>
                <Text style={styles.notificationDescription}>Receive special offers and discounts</Text>
              </View>
              <Switch
                value={notifications.promotions}
                onValueChange={(value) => setNotifications({ ...notifications, promotions: value })}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.notificationItem}>
              <View>
                <Text style={styles.notificationTitle}>Updates</Text>
                <Text style={styles.notificationDescription}>Stay informed about new features</Text>
              </View>
              <Switch
                value={notifications.updates}
                onValueChange={(value) => setNotifications({ ...notifications, updates: value })}
                trackColor={{ false: '#E5E7EB', true: '#93C5FD' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderPaymentMethodsModal = () => (
    <Modal
      visible={activeModal === 'Payment Methods'}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Payment Methods</Text>
            <TouchableOpacity onPress={() => setActiveModal(null)}>
              <Ionicons name="close" size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            {paymentMethods.map((method) => (
              <View key={method.id} style={styles.paymentMethodItem}>
                <View style={styles.paymentMethodInfo}>
                  <View style={styles.paymentMethodIcon}>
                    <Ionicons name="card" size={24} color="#3B82F6" />
                  </View>
                  <View>
                    <Text style={styles.paymentMethodType}>{method.type}</Text>
                    <Text style={styles.paymentMethodNumber}>•••• {method.last4}</Text>
                  </View>
                </View>
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>
            ))}
            <TouchableOpacity style={styles.addPaymentButton}>
              <Ionicons name="add-circle-outline" size={24} color="#3B82F6" />
              <Text style={styles.addPaymentText}>Add New Payment Method</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
        <Text style={styles.title}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={{ uri: userInfo.profileImage }} style={styles.profileImage} />
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8.5</Text>
            <Text style={styles.statLabel}>Hours</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2,450</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {settings.map(renderSettingItem)}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {renderPersonalInfoModal()}
      {renderNotificationsModal()}
      {renderPaymentMethodsModal()}
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
  profileSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#1F2937',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalBody: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  modalButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  paymentMethodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentMethodType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  paymentMethodNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  defaultBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 16,
  },
  addPaymentText: {
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 8,
  },
}); 