import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { submitContactQuery } from "../utils/apicalls/submitQuery";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ProgressBar from "./common/Progressbar";
import CustomText from "./common/Text";
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS, GRADIENTS } from "../utils/theme";
import CustomTextBold from "./common/BoldCustomtext";
import { LinearGradient } from "expo-linear-gradient";

const validationSchemas = [
  // Step 1: Pre-App Property
  Yup.object().shape({
    property: Yup.string().required("Property Location is required"),
  }),
  // Step 2: Head of Household Info
  Yup.object().shape({
    salutation: Yup.string().required("Salutation is required"),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    suffix: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),
    extension: Yup.string(),
    address1: Yup.string().required("Address Line 1 is required"),
    address2: Yup.string(),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip Code is required"),
  }),
  // Step 3: Household Composition
  Yup.object().shape({
    headName: Yup.string().required("Head of Household Name is required"),
    dob: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .required("Date of Birth is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Transgender", "Other"], "Invalid Gender")
      .required("Gender is required"),
    disabled: Yup.boolean(),
    secondPerson: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("Second person field is required"),
    njResident: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("NJ Resident field is required"),
    grossIncome: Yup.number()
      .typeError("Combined gross annual income must be a number")
      .required("Combined gross annual income is required")
      .min(0, "Income cannot be negative"),
    monthlyRent: Yup.number()
      .typeError("Monthly rent payments must be a number")
      .required("Monthly rent payments are required")
      .min(0, "Rent cannot be negative"),
    veteran: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("Veteran field is required"),
    section8: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("Section 8 voucher field is required"),
    rentalAssistance: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("Rental assistance field is required"),
  }),
  // Step 4: Additional Information
  Yup.object().shape({
    householdSize: Yup.string()
      .oneOf(["1", "2", "3", "4", "5+"], "Invalid Household Size")
      .required("Total Household Size is required"),
    adaAccessible: Yup.boolean(),
    substandardHousing: Yup.boolean(),
    householdVeteran: Yup.boolean(),
    studioContact: Yup.boolean(),
  }),
  // Step 5: Signature
  Yup.object().shape({
    eSignature: Yup.string().required("Signature is required"),
    signatureDate: Yup.date()
      .test("not-future", "Signature date cannot be in the future", (value) => {
        if (!value) return false;
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const selected = new Date(value);
        selected.setHours(0, 0, 0, 0);
        return selected <= now;
      })
      .required("Signature date is required"),
    hearAbout: Yup.string()
      .oneOf(
        ["Social Media", "Friend", "Website", "Email", "Other"],
        "Select an option"
      )
      .required("Please select how you heard about COAH PRO"),
    agreeTerms: Yup.boolean().oneOf([true], "You must agree to the terms"),
  }),
];

function ContactQueryform() {
  const { user } = useSelector((state) => state.user);
  const [step, setStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();

  const initialValues = {
    property: "",
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    email: "",
    phone: "",
    extension: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    headName: "",
    dob: null,
    gender: "",
    disabled: false,
    secondPerson: "",
    njResident: "",
    grossIncome: "",
    monthlyRent: "",
    veteran: "",
    section8: "",
    rentalAssistance: "",
    householdSize: "",
    adaAccessible: false,
    substandardHousing: false,
    householdVeteran: false,
    studioContact: false,
    eSignature: "",
    signatureDate: new Date(),
    hearAbout: "",
    zipCode: "",
    agreeTerms: false,
  };

  const renderStep = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    submitCount,
  }) => {
    // Only show errors after user has attempted to submit
    const showError = (field) => submitCount > 0 && touched[field] && errors[field];

    switch (step) {
      case 1:
        return (
          <View>
            <CustomTextBold style={styles.header}>
              Pre-Application
            </CustomTextBold>
            <CustomText style={styles.notice}>
              Before you begin, please ensure you have all your household and
              income details ready...
            </CustomText>
            <TextInput
              style={styles.input}
              placeholder="Property Location"
              value={values.property}
              onChangeText={handleChange("property")}
              onBlur={handleBlur("property")}
              placeholderTextColor={COLORS.textTertiary}
            />
            {showError("property") && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.property}
              </CustomText>
            )}
          </View>
        );

      case 2:
        return (
          <View>
            <CustomTextBold style={styles.header}>
              1. Head of Household Information
            </CustomTextBold>
            {[
              { name: "salutation", placeholder: "Salutation (Mr./Ms./Dr.)" },
              { name: "firstName", placeholder: "First Name" },
              { name: "middleName", placeholder: "Middle Name (optional)" },
              { name: "lastName", placeholder: "Last Name" },
              { name: "suffix", placeholder: "Suffix (e.g., Jr., Sr.) (optional)" },
              { name: "email", placeholder: "Email", keyboardType: "email-address" },
              { name: "phone", placeholder: "Phone", keyboardType: "phone-pad" },
              { name: "extension", placeholder: "Extension (optional)" },
              { name: "address1", placeholder: "Address Line 1" },
              { name: "address2", placeholder: "Address Line 2 (optional)" },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "zipCode", placeholder: "Zip Code", keyboardType: "numeric" },
            ].map(({ name, placeholder, keyboardType }) => (
              <View key={name} style={{ marginBottom: SPACING.md }}>
                <CustomText style={styles.inputLabel}>{placeholder}</CustomText>
                {name === "salutation" ? (
                  <View style={{ marginTop: SPACING.xs, borderWidth: 1, borderColor: COLORS.border, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, overflow: "hidden" }}>
                    <Picker
                      selectedValue={values[name]}
                      onValueChange={(itemValue) => setFieldValue(name, itemValue)}
                      style={{ color: COLORS.textPrimary }}
                    >
                      <Picker.Item label="Select Salutation *" value="" color={COLORS.textTertiary} />
                      <Picker.Item label="Mr." value="Mr." color={COLORS.textPrimary} />
                      <Picker.Item label="Ms." value="Ms." color={COLORS.textPrimary} />
                      <Picker.Item label="Mrs." value="Mrs." color={COLORS.textPrimary} />
                      <Picker.Item label="Dr." value="Dr." color={COLORS.textPrimary} />
                    </Picker>
                  </View>
                ) : name === "suffix" ? (
                  <View style={{ marginTop: SPACING.xs, borderWidth: 1, borderColor: COLORS.border, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surface, overflow: "hidden" }}>
                    <Picker
                      selectedValue={values[name]}
                      onValueChange={(itemValue) => setFieldValue(name, itemValue)}
                      style={{ color: COLORS.textPrimary }}
                    >
                      <Picker.Item label="Select Suffix (optional)" value="" color={COLORS.textTertiary} />
                      <Picker.Item label="Jr." value="Jr." color={COLORS.textPrimary} />
                      <Picker.Item label="Sr." value="Sr." color={COLORS.textPrimary} />
                      <Picker.Item label="II" value="II" color={COLORS.textPrimary} />
                      <Picker.Item label="III" value="III" color={COLORS.textPrimary} />
                      <Picker.Item label="IV" value="IV" color={COLORS.textPrimary} />
                      <Picker.Item label="Ph.D" value="Ph.D" color={COLORS.textPrimary} />
                      <Picker.Item label="M.D" value="M.D" color={COLORS.textPrimary} />
                    </Picker>
                  </View>
                ) : (
                  <TextInput
                    style={[styles.input, { marginTop: SPACING.xs }]}
                    placeholder={placeholder}
                    value={values[name]}
                    onChangeText={handleChange(name)}
                    onBlur={handleBlur(name)}
                    keyboardType={keyboardType || "default"}
                    placeholderTextColor={COLORS.textTertiary}
                  />
                )}
                {submitCount > 0 && touched[name] && errors[name] && (
                  <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                    {errors[name]}
                  </CustomText>
                )}
              </View>
            ))}
          </View>
        );

      case 3:
        return (
          <View style={{ paddingBottom: SPACING.xxxl }}>
            <CustomTextBold style={styles.header}>
              3. Household Composition
            </CustomTextBold>

            <CustomText style={styles.inputLabel}>Head of Household Name *</CustomText>
            <TextInput
              style={[styles.input, { marginTop: SPACING.xs }]}
              placeholder="First and Last Name"
              value={values.headName || `${values.firstName} ${values.lastName}`.trim()}
              onChangeText={handleChange("headName")}
              onBlur={handleBlur("headName")}
              placeholderTextColor={COLORS.textTertiary}
            />
            {showError("headName") && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.headName}
              </CustomText>
            )}

            <CustomText style={styles.inputLabel}>Date of Birth *</CustomText>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={[styles.input, { marginTop: SPACING.xs }]}
                placeholder="Pick your Birth Date"
                value={values.dob ? new Date(values.dob).toLocaleDateString() : ""}
                editable={false}
                pointerEvents="none"
                placeholderTextColor={COLORS.textTertiary}
              />
            </TouchableOpacity>
            {showError("dob") && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm, fontSize: FONT_SIZE.sm }}>
                {errors.dob}
              </CustomText>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={values.dob ? new Date(values.dob) : new Date("2000-01-01")}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setFieldValue("dob", selectedDate);
                  }
                }}
              />
            )}

            <CustomText style={styles.label}>Gender</CustomText>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.radioGroup}>
              {["Male", "Female", "Transgender", "Other"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.gender === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("gender", option)}
                  style={[styles.checkboxItem, values.gender === option && { borderColor: COLORS.accent, backgroundColor: COLORS.accentSoft }]}
                  color={COLORS.primary}
                />
              ))}
            </ScrollView>
            {submitCount > 0 && errors.gender && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.gender}
              </CustomText>
            )}

            <View style={styles.switchContainer}>
              <Text style={{ fontFamily: "Poppins-Semi", fontSize: FONT_SIZE.md, color: COLORS.textPrimary, flex: 1 }}>
                Is this household member permanently disabled?
              </Text>
              <Switch
                value={values.disabled || false}
                onValueChange={(val) => setFieldValue("disabled", val)}
                trackColor={{ false: COLORS.gray300, true: COLORS.accentLight }}
                thumbColor={values.disabled ? COLORS.accent : COLORS.white}
              />
            </View>

            <CustomText style={styles.label}>
              Will a 2nd person be living in your home?
            </CustomText>
            <View style={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.secondPerson === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("secondPerson", option)}
                  style={[styles.checkboxItem, values.secondPerson === option && { borderColor: COLORS.accent, backgroundColor: COLORS.accentSoft }]}
                  color={COLORS.primary}
                />
              ))}
            </View>
            {submitCount > 0 && errors.secondPerson && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.secondPerson}
              </CustomText>
            )}

            <CustomText style={styles.label}>
              Does your household live or work in New Jersey?
            </CustomText>
            <View style={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.njResident === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("njResident", option)}
                  style={[styles.checkboxItem, values.njResident === option && { borderColor: COLORS.accent, backgroundColor: COLORS.accentSoft }]}
                  color={COLORS.primary}
                />
              ))}
            </View>
            {submitCount > 0 && errors.njResident && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.njResident}
              </CustomText>
            )}

            <CustomText style={styles.inputLabel}>Combined gross annual income (All Members) *</CustomText>
            <View style={styles.amountInputContainer}>
              <Text style={styles.dollarIcon}>$</Text>
              <TextInput
                style={[styles.input, { flex: 1, marginTop: 0, borderWidth: 0, backgroundColor: 'transparent', paddingHorizontal: 0 }]}
                placeholder="e.g. 50000"
                value={values.grossIncome}
                onChangeText={handleChange("grossIncome")}
                onBlur={handleBlur("grossIncome")}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
            <CustomText style={[styles.notice, { marginTop: SPACING.sm }]}>
              Gross income BEFORE tax of all household members.
            </CustomText>
            {showError("grossIncome") && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.xs }}>
                {errors.grossIncome}
              </CustomText>
            )}

            <CustomText style={[styles.inputLabel, { marginTop: SPACING.lg }]}>Monthly rent payments *</CustomText>
            <View style={styles.amountInputContainer}>
              <Text style={styles.dollarIcon}>$</Text>
              <TextInput
                style={[styles.input, { flex: 1, marginTop: 0, borderWidth: 0, backgroundColor: 'transparent', paddingHorizontal: 0 }]}
                placeholder="e.g. 1500"
                value={values.monthlyRent}
                onChangeText={handleChange("monthlyRent")}
                onBlur={handleBlur("monthlyRent")}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
            {showError("monthlyRent") && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.monthlyRent}
              </CustomText>
            )}

            <CustomText style={styles.label}>Are you a veteran?</CustomText>
            <View style={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.veteran === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("veteran", option)}
                  style={[styles.checkboxItem, values.veteran === option && { borderColor: COLORS.accent, backgroundColor: COLORS.accentSoft }]}
                  color={COLORS.primary}
                />
              ))}
            </View>
            {submitCount > 0 && errors.veteran && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.veteran}
              </CustomText>
            )}

            <CustomText style={styles.label}>
              Do you currently have a Section 8 housing choice voucher?
            </CustomText>
            <View style={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.section8 === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("section8", option)}
                  style={[styles.checkboxItem, values.section8 === option && { borderColor: COLORS.accent, backgroundColor: COLORS.accentSoft }]}
                  color={COLORS.primary}
                />
              ))}
            </View>
            {submitCount > 0 && errors.section8 && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.section8}
              </CustomText>
            )}

            <CustomText style={styles.label}>
              Will you receive rental assistance from other sources including
              family members outside of the household? *
            </CustomText>
            <View style={styles.radioGroup}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.rentalAssistance === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("rentalAssistance", option)}
                  style={[styles.checkboxItem, values.rentalAssistance === option && { borderColor: COLORS.accent, backgroundColor: COLORS.accentSoft }]}
                  color={COLORS.primary}
                />
              ))}
            </View>
            {submitCount > 0 && errors.rentalAssistance && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.rentalAssistance}
              </CustomText>
            )}
          </View>
        );

      case 4:
        return (
          <View>
            <CustomTextBold style={styles.header}>
              4. Additional Information
            </CustomTextBold>

            <CustomText style={styles.label}>Total Household Size:</CustomText>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {["1", "2", "3", "4", "5+"].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.checkboxItem,
                    {
                      paddingHorizontal: SPACING.xl,
                      paddingVertical: SPACING.md,
                      margin: SPACING.xs,
                      borderColor: values.householdSize === size ? COLORS.accent : COLORS.border,
                      backgroundColor: values.householdSize === size ? COLORS.accentSoft : COLORS.surface,
                    }
                  ]}
                  onPress={() => setFieldValue("householdSize", size)}
                >
                  <Text style={{
                    fontFamily: values.householdSize === size ? "Poppins-Bold" : "Poppins-Regular",
                    color: values.householdSize === size ? COLORS.accent : COLORS.textPrimary
                  }}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {submitCount > 0 && errors.householdSize && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.householdSize}
              </CustomText>
            )}

            <View style={styles.switchContainer}>
              <Text style={{ fontFamily: "Poppins-Semi", fontSize: FONT_SIZE.md, color: COLORS.textPrimary, flex: 1 }}>
                Barrier Free / ADA Accessible Home:
              </Text>
              <Switch
                value={values.adaAccessible || false}
                onValueChange={(val) => setFieldValue("adaAccessible", val)}
                trackColor={{ false: COLORS.gray300, true: COLORS.accentLight }}
                thumbColor={values.adaAccessible ? COLORS.accent : COLORS.white}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={{ fontFamily: "Poppins-Semi", fontSize: FONT_SIZE.md, color: COLORS.textPrimary, flex: 1 }}>
                Currently living in substandard/overcrowded housing:
              </Text>
              <Switch
                value={values.substandardHousing || false}
                onValueChange={(val) => setFieldValue("substandardHousing", val)}
                trackColor={{ false: COLORS.gray300, true: COLORS.accentLight }}
                thumbColor={values.substandardHousing ? COLORS.accent : COLORS.white}
              />
            </View>

            <View style={{ marginVertical: SPACING.md }}>
              <View style={[styles.switchContainer, { marginVertical: 0 }]}>
                <Text style={{ fontFamily: "Poppins-Semi", fontSize: FONT_SIZE.md, color: COLORS.textPrimary, flex: 1 }}>
                  Are any household members Veterans?
                </Text>
                <Switch
                  value={values.householdVeteran || false}
                  onValueChange={(val) => setFieldValue("householdVeteran", val)}
                  trackColor={{ false: COLORS.gray300, true: COLORS.accentLight }}
                  thumbColor={values.householdVeteran ? COLORS.accent : COLORS.white}
                />
              </View>
              <Text style={styles.stepText}>
                There are currently no units in our portfolio that provide a
                veterans preference. We are collecting this information in the
                event that a preference becomes available in the future.
              </Text>
            </View>

            <View style={{ marginVertical: SPACING.md }}>
              <View style={[styles.switchContainer, { marginVertical: 0 }]}>
                <Text style={{ fontFamily: "Poppins-Semi", fontSize: FONT_SIZE.md, color: COLORS.textPrimary, flex: 1 }}>
                  Would you like to be contacted for studio apartments? *
                </Text>
                <Switch
                  value={values.studioContact || false}
                  onValueChange={(val) => setFieldValue("studioContact", val)}
                  trackColor={{ false: COLORS.gray300, true: COLORS.accentLight }}
                  thumbColor={values.studioContact ? COLORS.accent : COLORS.white}
                />
              </View>
              <Text style={styles.stepText}>
                All applicants will be considered for the one bedroom
                apartments. If you answer no, you will ONLY be contacted about
                one bedroom apartments.
              </Text>
            </View>
          </View>
        );

      case 5:
        return (
          <View>
            <CustomTextBold style={styles.header}>5. Signature</CustomTextBold>

            <CustomText style={styles.inputLabel}>Electronic Signature *</CustomText>
            <TextInput
              style={[styles.input, { marginTop: SPACING.xs }]}
              placeholder="Type your full name"
              value={values.eSignature}
              onChangeText={handleChange("eSignature")}
              onBlur={handleBlur("eSignature")}
              placeholderTextColor={COLORS.textTertiary}
            />
            <CustomText style={[styles.notice, { marginTop: SPACING.md }]}>
              I certify that the information provided herein is true and
              complete and that any misrepresentation of income or household
              size reported herein shall be cause for program disqualification.
              I also understand that this information is to be used only for
              determining my preliminary eligibility for referral to an
              affordable housing unit and does not obligate me in any way.
            </CustomText>
            {showError("eSignature") && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.eSignature}
              </CustomText>
            )}

            <CustomText style={[styles.inputLabel, { marginTop: SPACING.lg }]}>Signature Date *</CustomText>
            <View>
              <TextInput
                style={[styles.input, { marginTop: SPACING.xs, backgroundColor: COLORS.background }]}
                value={values.signatureDate ? new Date(values.signatureDate).toLocaleDateString() : new Date().toLocaleDateString()}
                editable={false}
                placeholderTextColor={COLORS.textTertiary}
              />
            </View>
            <CustomText style={[styles.notice, { marginTop: SPACING.sm }]}>
              Once we come to your name on the waiting list, you will be asked
              to verify your household composition and income, among other
              factors. All information will be verified.
            </CustomText>
            {showError("signatureDate") && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.signatureDate}
              </CustomText>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={values.signatureDate ? new Date(values.signatureDate) : new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setFieldValue("signatureDate", selectedDate);
                  }
                }}
              />
            )}

            <CustomText style={styles.label}>How did you hear about US?</CustomText>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {["Social Media", "Friend", "Website", "Email", "Other"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.hearAbout === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("hearAbout", option)}
                  style={[styles.checkboxItem, values.hearAbout === option && { borderColor: COLORS.accent, backgroundColor: COLORS.accentSoft }]}
                  color={COLORS.primary}
                />
              ))}
            </View>
            {submitCount > 0 && errors.hearAbout && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.hearAbout}
              </CustomText>
            )}

            <View style={[styles.switchContainer, { marginTop: SPACING.xl }]}>
              <View style={{ flex: 1 }}>
                <CustomText style={{ fontFamily: "Poppins-Semi" }}>
                  I certify the above information is correct and agree to the terms. *
                </CustomText>
              </View>
              <Switch
                value={values.agreeTerms}
                onValueChange={(val) => setFieldValue("agreeTerms", val)}
                trackColor={{ false: COLORS.gray300, true: COLORS.success }}
                thumbColor={COLORS.white}
              />
            </View>
            {submitCount > 0 && errors.agreeTerms && (
              <CustomText style={{ color: COLORS.error, marginTop: SPACING.sm }}>
                {errors.agreeTerms}
              </CustomText>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  const totalSteps = 5;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[step - 1]}
      validateOnMount={false}       // FIX 1: Do NOT validate on mount
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={async (values, { setSubmitting }) => {
        if (step === validationSchemas.length) {
          const formatBool = (val) => (val === true || val === "Yes" ? "Yes" : "No");
          const cleanNum = (val) => {
            if (typeof val === "number") return val;
            if (!val) return 0;
            return Number(val.toString().replace(/[^0-9.]/g, "")) || 0;
          };

          const finalValues = {
            // --- STRICT BACKEND REQUIREMENTS (27 FIELDS) ---
            // 1-5
            property: values.property_id || values.property || "",
            salutation: values.salutation,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            // 6-10
            phone: values.phone,
            address1: values.address1,
            city2: values.city,
            state2: values.state,
            headName: values.headName || `${values.firstName} ${values.lastName}`.trim(),
            // 11-15
            dob: values.dob ? new Date(values.dob).toISOString().split("T")[0] : "",
            gender: values.gender,
            secondPerson: formatBool(values.secondPerson),
            njResident: formatBool(values.njResident),
            grossIncome: cleanNum(values.grossIncome),
            // 16-20
            monthlyRent: cleanNum(values.monthlyRent),
            veteran: values.veteran === "Yes", // Use the Step 3 radio selection
            section8: formatBool(values.section8),
            rentalAssistance: formatBool(values.rentalAssistance),
            income: cleanNum(values.grossIncome),
            // 21-25
            rent: cleanNum(values.monthlyRent),
            householdSize: values.householdSize,
            eSignature: values.eSignature,
            signatureDate: values.signatureDate ? new Date(values.signatureDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            hearAbout: values.hearAbout,
            // 26-27 (CRITICAL MISSING FIELDS)
            monthlyAmount: cleanNum(values.monthlyRent),
            yearlyAmount: cleanNum(values.grossIncome),

            // --- Snake Case Aliases (For legacy/extra safety) ---
            user_id: user?._id || user?.id || "",
            userId: user?._id || user?.id || "",
            first_name: values.firstName,
            last_name: values.lastName,
            middle_name: values.middleName || "",
            extension: values.extension || "",
            suffix: values.suffix || "",
            address_line_1: values.address1,
            address_line_2: values.address2 || "",
            city: values.city, // Keep original city for consistency
            state: values.state, // Keep original state for consistency
            zip_code: values.zipCode,
            zipCode: values.zipCode,
            combined_gross_income: cleanNum(values.grossIncome),
            monthly_rent_payment: cleanNum(values.monthlyRent),
            annual_income: cleanNum(values.grossIncome),
            monthly_rent: cleanNum(values.monthlyRent),
            disabled: formatBool(values.disabled),
            adaAccessible: formatBool(values.adaAccessible),
            substandardHousing: formatBool(values.substandardHousing),
            householdVeteran: formatBool(values.householdVeteran),
            studioContact: formatBool(values.studioContact),
            full_name: `${values.firstName} ${values.lastName}`.trim(),
            signature_date: values.signatureDate
              ? new Date(values.signatureDate).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],
            application_date: new Date().toISOString().split("T")[0],
            application_type: "pre-application",
            property_id: values.property_id || values.property || "",
            propertyId: values.propertyId || values.property || "",
            phone_number: values.phone,
            email_address: values.email,
            hear_about: values.hearAbout,
            terms_accepted: values.agreeTerms ? "Yes" : "No",

            second_person: formatBool(values.secondPerson),
            nj_resident: formatBool(values.njResident),
            section_8: formatBool(values.section8),
            rental_assistance: formatBool(values.rentalAssistance),
            household_size: values.householdSize,
            e_signature: values.eSignature,
            signature_date_string: values.signatureDate ? new Date(values.signatureDate).toLocaleDateString() : new Date().toLocaleDateString(),
            
            // String versions of financials
            income_string: values.grossIncome.toString(),
            rent_string: values.monthlyRent.toString(),
            gross_income: values.grossIncome,
          };

          console.log("--- SENDING PAYLOAD ---");
          console.log(JSON.stringify(finalValues, null, 2));

          await submitContactQuery(finalValues, navigation, setSubmitting);
        } else {
          setStep(step + 1);
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        submitCount,
        isValid,
      }) => {
        // Sync headName from firstName + lastName
        useEffect(() => {
          if (!values.headName && (values.firstName || values.lastName)) {
            setFieldValue("headName", `${values.firstName} ${values.lastName}`.trim());
          }
        }, [values.firstName, values.lastName]);

        // LOGGING: Show all validation errors in console for debugging
        useEffect(() => {
          if (Object.keys(errors).length > 0) {
            console.log("--- FORM VALIDATION ERRORS ---");
            console.log(JSON.stringify(errors, null, 2));
          }
        }, [errors]);

        return (
          <>
            <ProgressBar currentStep={step} totalSteps={totalSteps} />
            <ScrollView
              style={styles.container}
              contentContainerStyle={{ paddingBottom: 150 }}
            >
              {renderStep({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                submitCount,  // FIX 3: Pass submitCount to renderStep
              })}
            </ScrollView>

            <View style={styles.buttonRow}>
              {step > 1 ? (
                <TouchableOpacity
                  onPress={() => setStep(step - 1)}
                  style={[styles.navButton, { backgroundColor: COLORS.surface, borderColor: COLORS.border, borderWidth: 1 }]}
                >
                  <Text style={[styles.navButtonText, { color: COLORS.textPrimary }]}>Back</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ width: 120 }} />
              )}

              {/* FIX 4: Removed stale errors check + Alert. Just call handleSubmit */}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                disabled={isSubmitting || !isValid}
                style={[
                  styles.navButton,
                  { backgroundColor: (isSubmitting || !isValid) ? COLORS.gray300 : COLORS.primary }
                ]}
              >
                <CustomText style={[styles.navButtonText, { color: (isSubmitting || !isValid) ? COLORS.textSecondary : COLORS.white }]}>
                  {isSubmitting ? "Submitting..." : step === validationSchemas.length ? "Submit" : "Next"}
                </CustomText>
              </TouchableOpacity>
            </View>

            {/* Only show error count after user has tried to submit */}
            {Object.keys(errors).length > 0 && (
              <View style={{ paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, alignItems: "center" }}>
                <CustomText style={{ color: COLORS.error, fontSize: FONT_SIZE.md, textAlign: 'center', fontWeight: 'bold' }}>
                  Required Fields Missing:
                </CustomText>
                {Object.keys(errors).map((key) => (
                  <CustomText key={key} style={{ color: COLORS.error, fontSize: FONT_SIZE.sm }}>
                    • {errors[key]}
                  </CustomText>
                ))}
              </View>
            )}
          </>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  header: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: "Poppins-Bold",
    color: COLORS.textPrimary,
    marginVertical: SPACING.md,
  },
  notice: {
    marginBottom: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.md,
    fontFamily: "Poppins-Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    fontSize: FONT_SIZE.md,
    backgroundColor: COLORS.surface,
    marginTop: SPACING.lg,
    color: COLORS.textPrimary,
  },
  progress: {
    height: 10,
    marginBottom: SPACING.xl,
    borderRadius: BORDER_RADIUS.pill,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  label: {
    fontSize: FONT_SIZE.lg,
    fontFamily: "Poppins-Semi",
    color: COLORS.textPrimary,
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
  },
  inputLabel: {
    fontSize: FONT_SIZE.md,
    fontFamily: "Poppins-Semi",
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    marginLeft: 4,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxItem: {
    backgroundColor: COLORS.surface,
    marginVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingLeft: SPACING.sm,
  },
  // FIX 6: Added flexDirection: "row" which was missing — caused Switch to overlap text
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SPACING.md,
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.success,
    borderRadius: BORDER_RADIUS.pill,
  },
  stepText: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  activePlan: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.successLight,
  },
  inactivePlan: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  planCard: {
    borderWidth: 1,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  navButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.pill,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.small,
  },
  navButtonText: {
    fontSize: FONT_SIZE.md,
    fontFamily: "Poppins-Bold",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  dollarIcon: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.textSecondary,
    fontFamily: "Poppins-Semi",
    marginRight: SPACING.xs,
  },
});

export default ContactQueryform;