import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
} from "react-native";
import { Checkbox } from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import { submitContactQuery } from "../utils/apicalls/submitQuery";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "./common/Progressbar";
import CustomText from "./common/Text";

const validationSchemas = [
  Yup.object().shape({
    property: Yup.string().required("Property Location is required"),
  }),
  Yup.object().shape({
    salutation: Yup.string().required("Salutation is required"),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    suffix: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone must be digits only")
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),
    extension: Yup.string(),
    address1: Yup.string().required("Address Line 1 is required"),
    address2: Yup.string(),
    city2: Yup.string().required("City is required"),
    state2: Yup.string().required("State is required"),
  }),
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
  Yup.object().shape({
    income: Yup.number()
      .typeError("Annual Income must be a number")
      .required("Annual Income is required")
      .min(0, "Income cannot be negative"),
    rent: Yup.number()
      .typeError("Monthly Rent must be a number")
      .required("Monthly Rent is required")
      .min(0, "Rent cannot be negative"),
    householdSize: Yup.string()
      .oneOf(["1", "2", "3", "4", "5+"], "Invalid Household Size")
      .required("Total Household Size is required"),
    adaAccessible: Yup.boolean(),
    substandardHousing: Yup.boolean(),
    veteran: Yup.boolean(),
    studioContact: Yup.boolean(),
  }),
  Yup.object().shape({
    eSignature: Yup.string().required("Signature is required"),
    signatureDate: Yup.date()
      .max(new Date(), "Signature date cannot be in the future")
      .required("Signature date is required"),
    hearAbout: Yup.string()
      .oneOf(
        ["Social Media", "Friend", "Website", "Email", "Other"],
        "Select an option"
      )
      .required("Please select how you heard about COAH PRO"),
  }),

  Yup.object()
    .shape({
      monthly: Yup.boolean(),
      yearly: Yup.boolean(),
      monthlyAmount: Yup.number().min(0),
      yearlyAmount: Yup.number().min(0),
    })
    .test(
      "select-plan",
      "Please select either Monthly or Yearly plan",
      (values) => values.monthly || values.yearly
    ),
];

function ContactQueryform() {
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
    city2: "",
    state2: "",
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
    income: "",
    rent: "",
    householdSize: "",
    adaAccessible: false,
    substandardHousing: false,
    studioContact: false,
    eSignature: "",
    signatureDate: null,
    hearAbout: "",
    monthly: false,
    monthlyAmount: 0,
    yearly: false,
    yearlyAmount: 0,
  };

  const renderStep = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  }) => {
    switch (step) {
      case 1:
        return (
          <View>
            <CustomText
              style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}
            >
              Pre-Application
            </CustomText>
            <CustomText style={{ marginTop: 10 }}>
              Before you begin, please ensure you have all your household and
              income details ready...
            </CustomText>
            <TextInput
              style={[styles.input]}
              placeholder="Property Location"
              value={values.property}
              onChangeText={handleChange("property")}
              onBlur={handleBlur("property")}
            />
            {touched.property && errors.property && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.property}
              </CustomText>
            )}
          </View>
        );

      case 2:
        return (
          <View>
            <CustomText style={{ fontWeight: "bold", fontSize: 18 }}>
              1. Head of Household Information
            </CustomText>
            {[
              { name: "salutation", placeholder: "Salutation (Mr./Ms./Dr.)" },
              { name: "firstName", placeholder: "First Name" },
              { name: "middleName", placeholder: "Middle Name (optional)" },
              { name: "lastName", placeholder: "Last Name" },
              {
                name: "suffix",
                placeholder: "Suffix (e.g., Jr., Sr.) (optional)",
              },
              {
                name: "email",
                placeholder: "Email",
                keyboardType: "email-address",
              },
              {
                name: "phone",
                placeholder: "Phone",
                keyboardType: "phone-pad",
              },
              { name: "extension", placeholder: "Extension (optional)" },
              { name: "address1", placeholder: "Address Line 1" },
              { name: "address2", placeholder: "Address Line 2 (optional)" },
              { name: "city2", placeholder: "City" },
              { name: "state2", placeholder: "State" },
            ].map(({ name, placeholder, keyboardType }) => (
              <View key={name}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 10,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    backgroundColor: "#f9f9f9",
                    marginTop: 20,
                  }}
                  placeholder={placeholder}
                  value={values[name]}
                  onChangeText={handleChange(name)}
                  onBlur={handleBlur(name)}
                  keyboardType={keyboardType || "default"}
                />
                {touched[name] && errors[name] && (
                  <CustomText style={{ color: "red", marginTop: 10 }}>
                    {errors[name]}
                  </CustomText>
                )}
              </View>
            ))}
          </View>
        );

      case 3:
        return (
          <ScrollView contentContainerStyle={{ marginBottom: 200 }}>
            <CustomText style={{ fontWeight: "bold", fontSize: 18 }}>
              3. Household Composition
            </CustomText>

            <TextInput
              style={styles.input}
              placeholder="Head of Household Name (First and Last Name)"
              value={values.headName}
              onChangeText={handleChange("headName")}
              onBlur={handleBlur("headName")}
            />
            {touched.headName && errors.headName && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.headName}
              </CustomText>
            )}

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={
                  values.dob ? new Date(values.dob).toLocaleDateString() : ""
                }
                editable={false}
                pointerEvents="none" // ensures TextInput doesn’t take over tap
              />
            </TouchableOpacity>

            {touched.dob && errors.dob && (
              <CustomText style={{ color: "red", marginTop: 10, fontSize: 12 }}>
                {errors.dob}
              </CustomText>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={
                  values.dob ? new Date(values.dob) : new Date("2000-01-01")
                }
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

            <CustomText style={{ marginTop: 10, fontWeight: "bold" }}>
              Gender
            </CustomText>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {["Male", "Female", "Transgender", "Other"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.gender === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("gender", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </ScrollView>
            {touched.gender && errors.gender && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.gender}
              </CustomText>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text>Is this household member permanently disabled?</Text>
              <Switch
                value={values.disabled || false}
                onValueChange={(val) => setFieldValue("disabled", val)}
                style={{ marginLeft: 10 }}
              />
            </View>

            <CustomText style={{ fontWeight: "bold" }}>
              Will a 2nd person be living in your home?
            </CustomText>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={
                    values.secondPerson === option ? "checked" : "unchecked"
                  }
                  onPress={() => setFieldValue("secondPerson", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.secondPerson && errors.secondPerson && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.secondPerson}
              </CustomText>
            )}

            <CustomText style={{ fontWeight: "bold" }}>
              Does your household live or work in New Jersey?
            </CustomText>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={
                    values.njResident === option ? "checked" : "unchecked"
                  }
                  onPress={() => setFieldValue("njResident", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.njResident && errors.njResident && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.njResident}
              </CustomText>
            )}

            <TextInput
              style={styles.input}
              placeholder="What is the combined gross annual income for all Household Members?"
              value={values.grossIncome}
              onChangeText={handleChange("grossIncome")}
              onBlur={handleBlur("grossIncome")}
              keyboardType="numeric"
            />
            <CustomText style={{ fontWeight: "bold" }}>
              Please include the gross BEFORE tax income of all household
              members. Income includes gross wages, salaries, tips, commissions,
              overtime, alimony, child support, pensions, social security,
              unemployment, and disability benefits.
            </CustomText>
            {touched.grossIncome && errors.grossIncome && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.grossIncome}
              </CustomText>
            )}

            <TextInput
              style={styles.input}
              placeholder="Monthly rent payments (USD)"
              value={values.monthlyRent}
              onChangeText={handleChange("monthlyRent")}
              onBlur={handleBlur("monthlyRent")}
              keyboardType="numeric"
            />
            {touched.monthlyRent && errors.monthlyRent && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.monthlyRent}
              </CustomText>
            )}

            <CustomText style={{ fontWeight: "bold" }}>
              Are you a veteran?
            </CustomText>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.veteran === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("veteran", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.veteran && errors.veteran && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.veteran}
              </CustomText>
            )}

            <CustomText style={{ fontWeight: "bold" }}>
              Do you currently have a Section 8 housing choice voucher?
            </CustomText>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.section8 === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("section8", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.section8 && errors.section8 && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.section8}
              </CustomText>
            )}

            <CustomText style={{ fontWeight: "bold" }}>
              Will you receive rental assistance from other sources including
              family members outside of the household? *
            </CustomText>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={
                    values.rentalAssistance === option ? "checked" : "unchecked"
                  }
                  onPress={() => setFieldValue("rentalAssistance", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.rentalAssistance && errors.rentalAssistance && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.rentalAssistance}
              </CustomText>
            )}
          </ScrollView>
        );

      case 4:
        return (
          <View>
            <CustomText style={{ fontWeight: "bold", fontSize: 18 }}>
              4. Additional Information
            </CustomText>

            <TextInput
              style={styles.input}
              placeholder="Annual Income"
              keyboardType="numeric"
              value={values.income}
              onChangeText={handleChange("income")}
              onBlur={handleBlur("income")}
            />
            {touched.income && errors.income && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.income}
              </CustomText>
            )}

            <TextInput
              style={styles.input}
              placeholder="Monthly Rent"
              keyboardType="numeric"
              value={values.rent}
              onChangeText={handleChange("rent")}
              onBlur={handleBlur("rent")}
            />
            {touched.rent && errors.rent && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.rent}
              </CustomText>
            )}

            <CustomText style={{ fontWeight: "bold" }}>
              Total Household Size:
            </CustomText>
            <View style={{ flexDirection: "row" }}>
              {["1", "2", "3", "4", "5+"].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor:
                      values.householdSize === size ? "#007AFF" : "white",
                  }}
                  onPress={() => setFieldValue("householdSize", size)}
                >
                  <Text
                    style={{
                      color: values.householdSize === size ? "white" : "black",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {touched.householdSize && errors.householdSize && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.householdSize}
              </CustomText>
            )}

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Barrier Free / ADA Accessible Home:</Text>
              <Switch
                value={values.adaAccessible || false}
                onValueChange={(val) => setFieldValue("adaAccessible", val)}
                style={{ marginLeft: 10 }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Currently living in substandard/overcrowded housing:</Text>
              <Switch
                value={values.substandardHousing || false}
                onValueChange={(val) => setFieldValue("substandard")}
                style={{ marginLeft: 10 }}
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <Text>Are any household members Veterans? :</Text>
              <Switch
                value={values.veteran || false}
                onValueChange={(val) => setFieldValue("veteran", val)}
                style={{ marginLeft: 10 }}
              />
              <Text>
                There are currently no units in our portfolio that provide a
                veterans preference. We are collecting this information in the
                event that a preference becomes available in the future.
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text>
                Would you like to be contacted for studio apartments? *
              </Text>
              <Switch
                value={values.studioContact || false}
                onValueChange={(val) => setFieldValue("studioContact", val)}
                style={{ marginLeft: 10 }}
              />
              <Text>
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
            <CustomText style={{ fontWeight: "bold", fontSize: 18 }}>
              5. Signature
            </CustomText>

            <TextInput
              style={styles.input}
              placeholder="Electronic Signature"
              value={values.eSignature}
              onChangeText={handleChange("eSignature")}
              onBlur={handleBlur("eSignature")}
            />
            <CustomText style={{ fontWeight: "bold", fontSize: 18 }}>
              I certify that the information provided herein is true and
              complete and that any misrepresentation of income or household
              size reported herein shall be cause for program disqualification.
              I also understand that this information is to be used only for
              determining my preliminary eligibility for referral to an
              affordable housing unit and does not obligate me in any way.{" "}
            </CustomText>

            {touched.eSignature && errors.eSignature && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.eSignature}
              </CustomText>
            )}

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={styles.input}
                placeholder="Signature Date"
                value={
                  values.signatureDate
                    ? new Date(values.signatureDate).toLocaleDateString()
                    : ""
                }
                editable={false}
                pointerEvents="none" // optional but useful
              />
            </TouchableOpacity>

            <CustomText style={{ fontWeight: "bold", fontSize: 18 }}>
              Once we come to your name on the waiting list, you will be asked
              to verify your household composition and income, among other
              factors. All information will be verified.{" "}
            </CustomText>
            {touched.signatureDate && errors.signatureDate && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.signatureDate}
              </CustomText>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={
                  values.signatureDate
                    ? new Date(values.signatureDate)
                    : new Date()
                }
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

            <CustomText style={{ marginTop: 10, fontWeight: "bold" }}>
              How did you hear about US?
            </CustomText>
            {["Social Media", "Friend", "Website", "Email", "Other"].map(
              (option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.hearAbout === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("hearAbout", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              )
            )}
            {touched.hearAbout && errors.hearAbout && (
              <CustomText style={{ color: "red", marginTop: 10 }}>
                {errors.hearAbout}
              </CustomText>
            )}
          </View>
        );

      case 6:
        return (
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Choose Your Plan
            </Text>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: values.monthly ? "#4CAF50" : "#ccc",
                backgroundColor: values.monthly ? "#e8f5e9" : "#fff",
                padding: 15,
                borderRadius: 8,
                marginBottom: 10,
              }}
              onPress={() => {
                setFieldValue("monthly", true);
                setFieldValue("monthlyAmount", 29);
                setFieldValue("yearly", false);
                setFieldValue("yearlyAmount", 0);
                submitContactQuery(values);
                navigation.navigate("Payment", {
                  name: "Premium Monthly",
                  amount: 2900,
                });
              }}
            >
              <CustomText style={{ fontSize: 16 }}>$29 / Month</CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: values.yearly ? "#4CAF50" : "#ccc",
                backgroundColor: values.yearly ? "#e8f5e9" : "#fff",
                padding: 15,
                borderRadius: 8,
              }}
              onPress={() => {
                setFieldValue("monthly", false);
                setFieldValue("monthlyAmount", 0);
                setFieldValue("yearly", true);
                setFieldValue("yearlyAmount", 299);
                submitContactQuery(values);
                navigation.navigate("Payment", {
                  name: "Premium Yearly",
                  amount: 29900,
                });
              }}
            >
              <CustomText style={{ fontSize: 16 }}>$299 / Year</CustomText>
            </TouchableOpacity>

            {touched.monthly === false &&
              touched.yearly === false &&
              errors.monthly && (
                <CustomText
                  style={{ color: "red", marginTop: 10, marginTop: 10 }}
                >
                  {errors.monthly}
                </CustomText>
              )}
          </View>
        );
      default:
        return null;
    }
  };

  const totalSteps = 6;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[step - 1]}
      onSubmit={(values) => {
        if (step === validationSchemas.length) {
          submitContactQuery(values);
        } else {
          setStep(step + 1);
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
      }) => (
        <>
          <ScrollView style={{ padding: 20, backgroundColor: "white" }}>
            {renderStep({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            {step > 1 && (
              <TouchableOpacity
                onPress={() => setStep(step - 1)}
                style={{
                  padding: 10,
                  backgroundColor: "#ccc",
                  borderRadius: 5,
                  minWidth: 100,
                  alignItems: "center",
                }}
              >
                <Text>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                padding: 10,
                backgroundColor: "#007AFF",
                borderRadius: 5,
                minWidth: 100,
                alignItems: "center",
              }}
            >
              <CustomText style={{ color: "white" }}>
                {step === validationSchemas.length ? "Submit" : "Next"}
              </CustomText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notice: {
    marginBottom: 15,
    fontStyle: "italic",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  progress: {
    height: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginTop: 20,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxItem: {
    backgroundColor: "#f9f9f9",
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 8,
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    width: "0%", // Default width
  },
  stepText: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default ContactQueryform;
