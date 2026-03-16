import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from "../../utils/theme";
import CustomTextBold from "../common/BoldCustomtext";
import CustomText from "../common/Text";

const SubscriptionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const route = useRoute();
  const { title, address } = route?.params ?? "";
  const navigation = useNavigation();
  const handleSubscribe = (method) => {
    navigation.navigate("Payment", {
      name: selectedPlan === "monthly" ? "Premium Monthly" : "Premium Annual",
      amount: selectedPlan === "monthly" ? 2900 : 29900,
      method: method, // Pass whether it's stripe or paypal
    });
  };

  const premiumFeatures = [
    {
      icon: "star",
      text: "Access to Diane Gloria's video guidance",
    },
    {
      icon: "notifications",
      text: "Push notifications for new lotteries",
    },
    {
      icon: "person-add",
      text: "We apply on behalf of user (with consent)",
    },
    {
      icon: "chatbubble-ellipses",
      text: "Live chat support",
    },
    {
      icon: "mail",
      text: "Auto-email updates",
    },
    {
      icon: "document-text",
      text: "Document management and eligibility tracking",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <CustomTextBold style={styles.header}>Choose Your Plan</CustomTextBold>
        <CustomText style={styles.subtitle}>Unlock the best of NJ Housing with a premium subscription.</CustomText>

        <View style={styles.card}>
          <CustomTextBold style={[styles.planTitle, { color: COLORS.textPrimary }]}>Free Plan</CustomTextBold>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            <CustomText style={styles.featureText}>
              View all listings (no pricing)
            </CustomText>
          </View>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            <CustomText style={styles.featureText}>
              Create account & save preferences
            </CustomText>
          </View>
        </View>

        <View style={[styles.card, styles.premiumCard]}>
          <CustomTextBold style={styles.planTitlePremium}>Premium Plan</CustomTextBold>
          <View style={styles.planOptionsContainer}>
            <TouchableOpacity
              style={[styles.planOption, selectedPlan === "monthly" && styles.selectedPlanOption]}
              onPress={() => setSelectedPlan("monthly")}
            >
              <View style={styles.radioCircle}>
                {selectedPlan === "monthly" && <View style={styles.radioInner} />}
              </View>
              <View style={{flexDirection: "row", alignItems: "baseline"}}>
                <CustomTextBold style={styles.price}>$29</CustomTextBold>
                <CustomText style={{color: COLORS.white, fontSize: FONT_SIZE.md}}> / month</CustomText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.planOption, selectedPlan === "annual" && styles.selectedPlanOption]}
              onPress={() => setSelectedPlan("annual")}
            >
              <View style={styles.radioCircle}>
                {selectedPlan === "annual" && <View style={styles.radioInner} />}
              </View>
              <View style={{flexDirection: "row", alignItems: "baseline"}}>
                <CustomTextBold style={styles.priceAnnual}>$299</CustomTextBold>
                <CustomText style={{color: COLORS.white, fontSize: FONT_SIZE.sm}}> / annual</CustomText>
              </View>
            </TouchableOpacity>
          </View>

          {premiumFeatures.map((feature, index) => (
            <View key={index} style={styles.feature}>
              <Ionicons name={feature.icon} size={20} color={COLORS.gold} />
              <CustomText style={styles.featureTextPremium}>{feature.text}</CustomText>
            </View>
          ))}
        </View>
        {/* Payment Options */}
        <View style={styles.paymentButtonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.stripeButton]} 
            onPress={() => handleSubscribe("stripe")}
          >
            <Ionicons name="card" size={20} color={COLORS.white} style={{marginRight: 8}} />
            <CustomTextBold style={styles.buttonText}>Pay with Card (Stripe)</CustomTextBold>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.paypalButton]} 
            onPress={() => handleSubscribe("paypal")}
          >
            <Ionicons name="logo-paypal" size={20} color="#003087" style={{marginRight: 8}} />
            <CustomTextBold style={[styles.buttonText, {color: "#003087"}]}>Pay with PayPal</CustomTextBold>
          </TouchableOpacity>
        </View>

        <CustomText style={styles.disclaimer}>
          Cancel anytime. Applications will be submitted manually on 3rd-party
          portals with your consent.
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  header: {
    fontSize: FONT_SIZE.xxxl,
    marginVertical: SPACING.sm,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    width: "100%",
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  premiumCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.large,
  },
  planTitle: {
    fontSize: FONT_SIZE.xxl,
    marginBottom: SPACING.lg,
  },
  planTitlePremium: {
    fontSize: FONT_SIZE.xxl,
    marginBottom: SPACING.lg,
    color: COLORS.gold,
  },
  price: {
    fontSize: FONT_SIZE.xxxl,
    color: COLORS.white,
  },
  priceAnnual: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.white,
    opacity: 0.9,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  featureText: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZE.md,
    color: COLORS.textPrimary,
  },
  featureTextPremium: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xxl,
    borderRadius: BORDER_RADIUS.pill,
    width: "100%",
    alignItems: "center",
    marginTop: SPACING.md,
    ...SHADOWS.medium,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
  },
  disclaimer: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  paymentButtonContainer: {
    width: "100%",
    gap: SPACING.md,
  },
  stripeButton: {
    backgroundColor: COLORS.accent,
    flexDirection: "row",
  },
  paypalButton: {
    backgroundColor: "#FFC439",
    flexDirection: "row",
  },
  planOptionsContainer: {
    marginBottom: SPACING.lg,
  },
  planOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  selectedPlanOption: {
    borderColor: COLORS.gold,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gold,
  },
});

export default SubscriptionScreen;
