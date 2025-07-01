import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const FAQ_DATA = [
  {
    question: "What is Affordable NJ Housing?",
    answer:
      "Affordable NJ Housing is a platform that helps New Jersey residents find, apply, and stay updated on affordable housing opportunities across the state. We simplify the process and notify you of open lotteries and listings.",
  },
  {
    question: "How do I apply for affordable housing through the app?",
    answer:
      "You can view current listings and apply directly if you’re eligible. For premium members, we apply automatically on your behalf after collecting your application data once.",
  },
  {
    question: "What’s the difference between Free and Premium membership?",
    answer:
      "Free members can search and browse listings. Premium members receive:\n• Auto-application service\n• Priority alerts\n• Diane Gloria’s expert housing guidance videos\n• Access to chat support\n• Push notifications for new openings",
  },
  {
    question: "How will I know if I’m eligible for a property?",
    answer:
      "Once your profile is completed, our system will automatically match you with properties you’re eligible for and mark them accordingly.",
  },
  {
    question: "What documents do I need to apply?",
    answer:
      "You’ll typically need:\n• Proof of income\n• Government-issued ID\n• Proof of NJ residency\n• Any vouchers (e.g., Section 8)\nWe’ll guide you in uploading and managing these through the Document Vault.",
  },
  {
    question: "Can I update my eligibility or application information later?",
    answer:
      "Yes, you can update your profile, income, household size, and documents anytime through the Profile section.",
  },
  {
    question: "How do I cancel or change my membership plan?",
    answer:
      "You can manage your membership under Profile > Membership Status. You can downgrade to Free or cancel renewal anytime.",
  },
  {
    question: "Will I get alerts for new housing opportunities?",
    answer:
      "Yes! Premium users receive instant push notifications. Free users can check listings manually in the app.",
  },
  {
    question: "Is Affordable NJ Housing affiliated with the NJ government?",
    answer:
      "No. We are an independent platform created to help residents access housing resources more easily. All applications are submitted to the appropriate government housing authorities.",
  },
  {
    question: "Who is Diane Gloria?",
    answer:
      "Diane Gloria is a highly respected affordable housing professional in New Jersey. As a dedicated member of the Affordable Housing Professionals of New Jersey, Diane brings 40 years of experience as a licensed real estate broker and an expert in affordable housing in New Jersey.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Faq</Text>

      {FAQ_DATA.map((item, index) => (
        <View key={index} style={styles.item}>
          <TouchableOpacity
            onPress={() => toggleItem(index)}
            style={styles.questionContainer}
          >
            <Text style={styles.question}>
              {index + 1}. {item.question}
            </Text>
          </TouchableOpacity>
          {activeIndex === index && (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default Faq;

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
  item: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  questionContainer: {
    paddingVertical: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  answerContainer: {
    marginTop: 4,
    paddingLeft: 10,
  },
  answer: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});
