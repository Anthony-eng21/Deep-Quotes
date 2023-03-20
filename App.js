import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function App() {
  const [quote, setQuote] = useState("Loading...");

  const [author, setAuthor] = useState("Loading...");

  const [isLoading, setIsLoading] = useState(false);

  const randomQuote = () => {
    setIsLoading(true);
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        //the content is what we get from the response body here so just the quote for this field in the json
        // console.log(result.content);
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      });
  };

  //automatically fetch the above API data as soon as we mount
  useEffect(() => {
    randomQuote();
  }, []);

  const tweetNow = () => {
    const url = "https://twitter.com/intent/tweet?text=" + quote;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.mainContentContainer}>
        <Text style={styles.quoteODText}>Deep Quotes</Text>
        <FontAwesome5
          name="quote-left"
          style={{ fontSize: 15, marginBottom: -13 }}
          color="#333"
        />
        <Text style={styles.quoteTxt}>{quote}</Text>
        <FontAwesome5
          name="quote-right"
          style={{ fontSize: 15, textAlign: "right", marginTop: -23 }}
          color="#333"
        />
        <Text style={styles.authorName}>__{author}</Text>
        <TouchableOpacity onPress={randomQuote} style={styles.getQuoteBtn}>
          <Text style={styles.getQuoteBtnTxt}>
            {isLoading ? "Loading..." : "New Quote"}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={tweetNow} style={styles.volumeIconBtn}>
            <FontAwesome name="twitter" size={22} color="#1D9BF0" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#666",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContentContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  quoteODText: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 23,
    color: "#333",
    marginBottom: 20,
  },
  quoteTxt: {
    color: "#333",
    textAlign: "center",
    fontWeight: 300,
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: 1.2,
    marginBottom: 17,
    paddingHorizontal: 30,
  },
  getQuoteBtn: {
    backgroundColor: "#666",
    padding: 20,
    borderRadius: 26,
    marginVertical: 20,
  },
  getQuoteBtnTxt: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  authorName: {
    textAlign: "right",
    fontWeight: 200,
    fontStyle: "italic",
    fontSize: 16,
    color: "#333",
    marginTop: 15,
  },
  volumeIconBtn: {
    borderWidth: 2,
    borderColor: "#1D9BF0",
    borderRadius: 50,
    padding: 15,
  },
});
