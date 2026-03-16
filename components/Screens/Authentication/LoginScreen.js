import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { loginApi } from "../../../utils/apicalls/loginApi";
import { useDispatch } from "react-redux";
import CustomLogo from "../../CustomLogo";
import CustomText from "../../common/Text";
import CustomTextSemi from "../../common/CustomTextSemi";
import { COLORS, SHADOWS, BORDER_RADIUS, SPACING, FONT_SIZE } from "../../../utils/theme";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const handleLogin = () => {
    loginApi(email, password, navigation, setError, setLoading, dispatch);
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
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <SafeAreaView style={styles.content}>
                <View style={styles.logoContainer}>
                  <CustomLogo
                    color={COLORS.white}
                    image={require("../../../assets/images/logo_comp/nj_house_map.png")}
                  />
                  <CustomText style={styles.tagline}>Access Affordable Living</CustomText>
                </View>

                <View style={styles.card}>
                  <CustomTextSemi style={styles.title}>Welcome Back</CustomTextSemi>
                  <CustomText style={styles.subtitle}>Sign in to your account to continue</CustomText>

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

                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray400} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      placeholder="Password"
                      placeholderTextColor={COLORS.textTertiary}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={COLORS.gray500}
                      />
                    </TouchableOpacity>
                  </View>

                  {error ? (
                    <View style={styles.errorContainer}>
                      <Ionicons name="alert-circle-outline" size={16} color={COLORS.error} />
                      <CustomText style={styles.errorText}>{error}</CustomText>
                    </View>
                  ) : null}

                  <TouchableOpacity 
                    onPress={handleLogin} 
                    style={[styles.loginButton, loading && styles.disabledButton]}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color={COLORS.white} size="small" />
                    ) : (
                      <Text style={styles.loginButtonText}>Login</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.footer}>
                    <CustomText style={styles.footerText}>Don't have an account?</CustomText>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                      <CustomTextSemi style={styles.signupLink}> Sign Up</CustomTextSemi>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </ScrollView>
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
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.1,
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
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
  eyeIcon: {
    padding: SPACING.xs,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  errorText: {
    color: COLORS.error,
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZE.sm,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.md,
    ...SHADOWS.medium,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SPACING.xl,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
  },
  signupLink: {
    color: COLORS.accent,
    fontSize: FONT_SIZE.md,
  },
});
