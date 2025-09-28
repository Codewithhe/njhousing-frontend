import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

const sampleMessages = [
  {
    id: 1,
    text: "How is the property condition?",
    sender: "user",
    time: "10:30 AM",
  },
  {
    id: 2,
    text: "It's in great shape, recently renovated!",
    sender: "agent",
    time: "10:31 AM",
  },
  {
    id: 3,
    text: "Thanks! Can you send images?",
    sender: "user",
    time: "10:32 AM",
  },
  {
    id: 4,
    text: "Sure! Sending them now.",
    sender: "agent",
    time: "10:33 AM",
  },
];

const LiveChat = () => {
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");

  // Function to send a message
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, message]);
      setNewMessage(""); // Clear input after sending
    }
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === "user";

    return (
      <View
        style={{
          flexDirection: isUser ? "row" : "row-reverse",
          alignItems: "flex-end",
          marginHorizontal: 10,
          marginBottom: 10,
          margin: 20,
        }}
      >
        {/* Message Bubble */}
        <View style={isUser ? styles.leftBubble : styles.rightBubble}>
          <Text style={isUser ? styles.leftText : styles.rightText}>
            {item.text}
          </Text>
        </View>

        {/* Timestamp Beside Bubble */}
        <Text style={styles.timestampSide}>{item.time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />

      {/* Text Input and Send Button */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.sendButton, { marginRight: 10 }]}
        >
          {/* <AntDesign name="pluscircleo" size={24} color="white" /> */}
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          {/* <MaterialCommunityIcons name="send" size={24} color="white" /> */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LiveChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  timestampSide: {
    fontSize: 12,
    color: "gray",
    marginHorizontal: 5,
    maxWidth: 60,
    flexShrink: 1,
  },
  leftBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 10,
    shadowRadius: 20,
    shadowColor: "lightgrey",
    maxWidth: "75%",
    flexShrink: 1,
  },
  rightBubble: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#917afd",
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "lightgrey",
    alignSelf: "flex-end",
    maxWidth: "75%",
    flexShrink: 1,
  },
  leftText: {
    marginLeft: 10,
    flexShrink: 1,
  },
  rightText: {
    marginRight: 10,
    flexShrink: 1,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: "#f4f4f4",
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    padding: 10,
  },
});
