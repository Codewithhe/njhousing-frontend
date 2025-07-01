import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const termsContent = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the App, you agree to comply with these Terms and all applicable laws. If you do not agree, please do not use the App.",
  },
  {
    title: "2. Eligibility",
    body: "You must be at least 18 years old to create an account and apply for housing through this App. By using the App, you confirm that the information you provide is truthful and accurate.",
  },
  {
    title: "3. Services Provided",
    body: "Affordable NJ Housing helps users:\n• Discover and view affordable housing listings across New Jersey\n• Track open lotteries and housing application periods\n• Submit housing applications (for premium users only)\n• Get eligibility guidance based on user profile\n• Receive alerts and updates on new opportunities\n\nWe are not a housing provider or government entity.",
  },
  {
    title: "4. Membership Plans",
    body: "• Free Plan: Includes access to property listings, eligibility tools, and document storage.\n• Premium Plan ($29/month or $299/year): Includes auto-application support, early alerts, video guidance, push notifications, and chat/email support.\n\nPremium subscriptions auto-renew unless canceled before the renewal date.",
  },
  {
    title: "5. Data Accuracy",
    body: "You are responsible for ensuring all data entered in your profile is complete and accurate. Affordable NJ Housing is not liable for application rejections or delays due to incorrect or missing user information.",
  },
  {
    title: "6. Third-Party Applications",
    body: "In some cases, we may submit housing applications on your behalf through official third-party housing websites. You authorize us to do this when you consent under your profile.",
  },
  {
    title: "7. Account Suspension or Termination",
    body: "We reserve the right to suspend or terminate accounts that:\n• Provide false or misleading information\n• Abuse the auto-application feature\n• Engage in any fraudulent or malicious activity",
  },
  {
    title: "8. Refund Policy",
    body: "All payments are final. No refunds will be issued for partial usage of premium services. Users may cancel upcoming renewals anytime.",
  },
  {
    title: "9. Content Ownership",
    body: "All content in the app including listings, videos, guides, and tools is the intellectual property of Affordable NJ Housing or its licensors and may not be reproduced without permission.",
  },
  {
    title: "10. Disclaimer",
    body: "Affordable NJ Housing does not guarantee housing placement. We are a facilitation tool, not a housing authority or legal representative.",
  },
  {
    title: "11. Limitation of Liability",
    body: "We are not liable for any direct or indirect losses resulting from:\n• Missed opportunities\n• Errors in eligibility\n• External application site outages\n• User profile inaccuracy",
  },
  {
    title: "12. Changes to Terms",
    body: "We may update these Terms and Conditions at any time. Users will be notified of material changes via the App or registered email.",
  },
  {
    title: "13. Contact",
    body: "For questions or support, email us at: dianegloria08@gmail.com",
  },
];

const Terms = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Terms and Conditions</Text>
      {termsContent.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#444",
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
  },
});
