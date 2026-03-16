import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SignupAPI } from "../../../utils/apicalls/SignupApi";
import CustomLogo from "../../CustomLogo";
import CustomText from "../../common/Text";
import CustomTextSemi from "../../common/CustomTextSemi";
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING, FONT_SIZE } from "../../../utils/theme";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!passcode) newErrors.passcode = "Passcode is required.";
    else if (passcode.length < 6)
      newErrors.passcode = "Passcode must be at least 6 characters.";
    if (!confirmPasscode)
      newErrors.confirmPasscode = "Confirm passcode is required.";
    else if (confirmPasscode !== passcode)
      newErrors.confirmPasscode = "Passcodes do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const userData = {
      firstName,
      lastName,
      email,
      password: passcode,
    };

    await SignupAPI(
      passcode,
      confirmPasscode,
      userData,
      setLoading,
      navigation
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../../../assets/images/background/premium_bg.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={["rgba(5, 17, 56, 0.2)", "rgba(5, 17, 56, 0.8)"]}
          style={styles.gradient}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.logoContainer}>
                  <CustomLogo
                    color={COLORS.white}
                    image={require("../../../assets/images/logo_comp/nj_house_map.png")}
                  />
                  <CustomText style={styles.tagline}>Join Our Community Today</CustomText>
                </View>

                <View style={styles.card}>
                  <CustomTextSemi style={styles.title}>Create Account</CustomTextSemi>
                  <CustomText style={styles.subtitle}>Enter your details to get started</CustomText>

                  <View style={styles.row}>
                    <View style={[styles.inputWrapper, { flex: 1, marginRight: SPACING.sm }]}>
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor={COLORS.textTertiary}
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </View>
                    <View style={[styles.inputWrapper, { flex: 1 }]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        placeholderTextColor={COLORS.textTertiary}
                        value={lastName}
                        onChangeText={setLastName}
                      />
                    </View>
                  </View>
                  <View style={styles.errorRow}>
                    <View style={{ flex: 1 }}>
                      {errors.firstName && <CustomText style={styles.errorText}>{errors.firstName}</CustomText>}
                    </View>
                    <View style={{ flex: 1 }}>
                      {errors.lastName && <CustomText style={styles.errorText}>{errors.lastName}</CustomText>}
                    </View>
                  </View>

                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={20} color={COLORS.gray400} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Email Address"
                      placeholderTextColor={COLORS.textTertiary}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                  {errors.email && <CustomText style={[styles.errorText, { marginBottom: SPACING.md }]}>{errors.email}</CustomText>}

                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray400} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Passcode"
                      placeholderTextColor={COLORS.textTertiary}
                      secureTextEntry
                      value={passcode}
                      onChangeText={setPasscode}
                    />
                  </View>
                  {errors.passcode && <CustomText style={[styles.errorText, { marginBottom: SPACING.md }]}>{errors.passcode}</CustomText>}

                  <View style={styles.inputWrapper}>
                    <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.gray400} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Passcode"
                      placeholderTextColor={COLORS.textTertiary}
                      secureTextEntry
                      value={confirmPasscode}
                      onChangeText={setConfirmPasscode}
                    />
                  </View>
                  {errors.confirmPasscode && <CustomText style={[styles.errorText, { marginBottom: SPACING.md }]}>{errors.confirmPasscode}</CustomText>}

                  <TouchableOpacity 
                    style={[styles.submitButton, loading && styles.disabledButton]} 
                    onPress={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                      <Text style={styles.submitText}>Complete Sign Up</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.footer}>
                    <CustomText style={styles.footerText}>Already have an account?</CustomText>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <CustomTextSemi style={styles.loginLink}> Login</CustomTextSemi>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  backgroundImage: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.05,
    marginBottom: SPACING.xxl,
  },
  tagline: {
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: SPACING.sm,
    fontSize: FONT_SIZE.md,
    fontFamily: "Poppins-Regular",
  },
  card: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: SPACING.xxxl,
    paddingTop: SPACING.xxxl,
    paddingBottom: Platform.OS === "ios" ? 50 : 30,
    flex: 1,
    ...SHADOWS.large,
  },
  title: {
    fontSize: 28,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xxl,
  },
  row: {
    flexDirection: "row",
  },
  errorRow: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    height: 56,
  },
  inputIcon: {
    marginRight: SPACING.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginLeft: SPACING.xs,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.lg,
    ...SHADOWS.medium,
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.xl,
    paddingBottom: SPACING.xl,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
  },
  loginLink: {
    color: COLORS.accent,
    fontSize: FONT_SIZE.md,
  },
});
