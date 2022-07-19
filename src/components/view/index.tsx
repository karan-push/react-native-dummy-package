import * as React from "react";
import { View as ViewNative, StyleSheet, Text } from "react-native";

const View = () => {
  return (
    <ViewNative style={styles.container}>
      <Text>Test View for npm package</Text>
    </ViewNative>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default View;
