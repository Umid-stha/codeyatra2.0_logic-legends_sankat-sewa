import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInputProps,
} from 'react-native';

// ─── Types ──────────────────────────────────────────────────────────────────
interface AccountData {
  username: string;
  password: string;
  confirmPassword: string;
}

interface PersonalData {
  phone: string;
  address: string;
  age: string;
}

interface FieldProps extends TextInputProps {
  label: string;
  error?: string;
}

// ─── Page 1: Account Details ────────────────────────────────────────────────
interface AccountDetailsProps {
  onNext: (data: AccountData) => void;
}

function AccountDetailsScreen({ onNext }: AccountDetailsProps): React.JSX.Element {
  const [form, setForm] = useState<AccountData>({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<AccountData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<AccountData> = {};
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (form.password.length < 6) newErrors.password = 'Min 6 characters';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (): void => {
    if (validate()) onNext(form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Step 1 of 2 — Account Details</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '50%' }]} />
        </View>

        <Field
          label="Username"
          placeholder="Enter username"
          value={form.username}
          onChangeText={(v) => setForm({ ...form, username: v })}
          error={errors.username}
          autoCapitalize="none"
        />
        <Field
          label="Password"
          placeholder="Enter password"
          value={form.password}
          onChangeText={(v) => setForm({ ...form, password: v })}
          error={errors.password}
          secureTextEntry
        />
        <Field
          label="Confirm Password"
          placeholder="Re-enter password"
          value={form.confirmPassword}
          onChangeText={(v) => setForm({ ...form, confirmPassword: v })}
          error={errors.confirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={handleNext}>
          <Text style={styles.btnText}>Next →</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Page 2: Personal Details ────────────────────────────────────────────────
interface PersonalDetailsProps {
  onBack: () => void;
  onSubmit: (data: PersonalData) => void;
}

function PersonalDetailsScreen({ onBack, onSubmit }: PersonalDetailsProps): React.JSX.Element {
  const [form, setForm] = useState<PersonalData>({
    phone: '',
    address: '',
    age: '',
  });
  const [errors, setErrors] = useState<Partial<PersonalData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<PersonalData> = {};
    if (!/^\d{10,}$/.test(form.phone)) newErrors.phone = 'Enter valid phone number';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    const age = parseInt(form.age, 10);
    if (!age || age < 13 || age > 120) newErrors.age = 'Enter valid age (13–120)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if (validate()) onSubmit(form);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Personal Info</Text>
        <Text style={styles.subtitle}>Step 2 of 2 — Personal Details</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '100%' }]} />
        </View>

        <Field
          label="Phone Number"
          placeholder="e.g. 9876543210"
          value={form.phone}
          onChangeText={(v) => setForm({ ...form, phone: v })}
          error={errors.phone}
          keyboardType="phone-pad"
        />
        <Field
          label="Address"
          placeholder="Enter your full address"
          value={form.address}
          onChangeText={(v) => setForm({ ...form, address: v })}
          error={errors.address}
          multiline
          numberOfLines={3}
        />
        <Field
          label="Age"
          placeholder="Enter your age"
          value={form.age}
          onChangeText={(v) => setForm({ ...form, age: v })}
          error={errors.age}
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <TouchableOpacity style={[styles.btn, styles.outlineBtn]} onPress={onBack}>
            <Text style={styles.outlineBtnText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.flex]} onPress={handleSubmit}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Success Screen ──────────────────────────────────────────────────────────
interface SuccessScreenProps {
  onReset: () => void;
}

function SuccessScreen({ onReset }: SuccessScreenProps): React.JSX.Element {
  return (
    <View style={[styles.container, styles.center]}>
      <Text style={styles.emoji}>🎉</Text>
      <Text style={styles.title}>Registered!</Text>
      <Text style={styles.subtitle}>Your account has been created successfully.</Text>
      <TouchableOpacity style={styles.btn} onPress={onReset}>
        <Text style={styles.btnText}>Start Over</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Reusable Field Component ────────────────────────────────────────────────
function Field({ label, error, multiline, numberOfLines, style, ...props }: FieldProps): React.JSX.Element {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          multiline ? { height: 80, textAlignVertical: 'top' } : null,
          style,
        ]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor="#aaa"
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

// ─── App Root ────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3;

export default function App(): React.JSX.Element {
  const [step, setStep] = useState<Step>(1);
  const [accountData, setAccountData] = useState<AccountData | null>(null);

  const handleNext = (data: AccountData): void => {
    setAccountData(data);
    setStep(2);
  };

  const handleSubmit = (personalData: PersonalData): void => {
    const fullData = { ...accountData, ...personalData };
    console.log('Registered:', fullData); // replace with your API call
    setStep(3);
  };

  const handleReset = (): void => {
    setAccountData(null);
    setStep(1);
  };

  if (step === 1) return <AccountDetailsScreen onNext={handleNext} />;
  if (step === 2) return <PersonalDetailsScreen onBack={() => setStep(1)} onSubmit={handleSubmit} />;
  return <SuccessScreen onReset={handleReset} />;
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 28,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#6c63ff',
    borderRadius: 3,
  },
  fieldWrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#222',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  btn: {
    backgroundColor: '#6c63ff',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#6c63ff',
    paddingHorizontal: 20,
  },
  outlineBtnText: {
    color: '#6c63ff',
    fontSize: 16,
    fontWeight: '700',
  },
});