import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, typography } from '../../constants/theme';
import { ChatMessage } from '../../types';
import { MOCK_CHAT_MESSAGES } from '../../constants/mockData';

interface CustomerServiceChatScreenProps {
  onBack: () => void;
}

export const CustomerServiceChatScreen: React.FC<
  CustomerServiceChatScreenProps
> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulated agent reply after 1.2s
    setTimeout(() => {
      const agentReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: 'Thank you for providing the details! I am checking your order progress with our logistics team right away.',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, agentReply]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1200);
  };

  const handleAttach = () => {
    Alert.alert('Attach File', 'Select image or document to upload');
  };

  const handleCall = () => {
    Alert.alert(
      'Customer Support Hotline',
      'Connecting to live representative at +1 (800) 123-4567...'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBack}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Customer Service</Text>
          <View style={styles.onlineStatusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCall}
          style={styles.callBtn}
        >
          <Ionicons name="call-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatScroll}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: false })
          }
        >
          {/* Date Divider */}
          <View style={styles.dateDividerContainer}>
            <View style={styles.datePill}>
              <Text style={styles.dateText}>Today</Text>
            </View>
          </View>

          {/* Messages */}
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageWrapper,
                  isUser ? styles.messageWrapperUser : styles.messageWrapperAgent,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isUser ? styles.bubbleUser : styles.bubbleAgent,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isUser ? styles.textUser : styles.textAgent,
                    ]}
                  >
                    {msg.text}
                  </Text>
                  <Text
                    style={[
                      styles.messageTime,
                      isUser ? styles.timeUser : styles.timeAgent,
                    ]}
                  >
                    {msg.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleAttach}
            style={styles.attachBtn}
          >
            <Ionicons
              name="attach-outline"
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TextInput
            style={[styles.textInput, { maxHeight: 80 }]}
            placeholder="Write your message..."
            placeholderTextColor={colors.textPlaceholder}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={inputText.trim() ? handleSendMessage : handleAttach}
            style={styles.sendBtn}
          >
            <Ionicons
              name={inputText.trim() ? 'send' : 'mic-outline'}
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h3,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  onlineStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 5,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0C9409',
  },
  onlineText: {
    fontSize: 11,
    color: '#0C9409',
    fontWeight: '600',
  },
  callBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatScroll: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateDividerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  datePill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  messageWrapperAgent: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleAgent: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  textUser: {
    color: colors.textWhite,
  },
  textAgent: {
    color: colors.textPrimary,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timeUser: {
    color: '#D1D5DB',
  },
  timeAgent: {
    color: colors.textSecondary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: colors.background,
    gap: 10,
  },
  attachBtn: {
    padding: 6,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: colors.borderDefault,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: colors.textPrimary,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
