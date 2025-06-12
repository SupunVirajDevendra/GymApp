import AnimatedGradient from '@/components/AnimatedGradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = () => {
    // TODO: Implement actual password reset logic
    setSubmitted(true);
  };

  return (
    <View style={styles.container}>
      <AnimatedGradient />
      <SafeAreaView style={styles.content}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <Text style={styles.logoText}>GYM</Text>
              </View>
            </View>
            <Text style={[styles.title, { color: '#FFFFFF' }]}>Reset Password</Text>
            <Text style={[styles.subtitle, { color: '#FFFFFF' }]}>
              {submitted 
                ? "We've sent you instructions to reset your password"
                : "Enter your email to receive reset instructions"}
            </Text>
          </View>

          {!submitted ? (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: '#FFFFFF' }]}>Email</Text>
                <BlurView intensity={20} style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, { color: '#FFFFFF' }]}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </BlurView>
              </View>

              <TouchableOpacity 
                style={styles.resetButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.resetButtonText}>Send Reset Link</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark" size={40} color="#FFFFFF" />
              </View>
              <Text style={[styles.successText, { color: '#FFFFFF' }]}>
                Check your email for instructions to reset your password. If you don't see it, check your spam folder.
              </Text>
              <TouchableOpacity 
                style={styles.backToLoginButton}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={styles.backToLoginText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }],
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 4,
  },
  inputWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  backToLoginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  backToLoginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 