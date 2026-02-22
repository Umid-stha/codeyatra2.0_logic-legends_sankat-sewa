import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface OtherIncidentModalProps {
  visible: boolean;
  onConfirm: (text: string) => void;
  onCancel: () => void;
}

const OtherIncidentModal: React.FC<OtherIncidentModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const [inputText, setInputText] = useState<string>('');

  const handleConfirm = (): void => {
    if (inputText.trim()) {
      onConfirm(inputText.trim());
      setInputText('');
    }
  };

  const handleCancel = (): void => {
    setInputText('');
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.dialog}>
          <Text style={styles.title}>Specify Incident Type</Text>
          <Text style={styles.subtitle}>
            Please describe the type of incident you are reporting.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Gas leak, Tree fall..."
            placeholderTextColor="#AAAAAA"
            value={inputText}
            onChangeText={setInputText}
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleConfirm}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmBtn, !inputText.trim() && styles.confirmBtnDisabled]}
              onPress={handleConfirm}
              disabled={!inputText.trim()}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default OtherIncidentModal;

const RED = '#D32F2F';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dialog: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
    lineHeight: 18,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A1A1A',
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: RED,
    alignItems: 'center',
  },
  confirmBtnDisabled: {
    backgroundColor: '#FFCDD2',
  },
  confirmText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});