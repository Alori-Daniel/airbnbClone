import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}> Login</Link>
      <Link href={"/(modals)/booking"}> book</Link>
      <Link href={"/listing/123"}>Go to Listing</Link>
    </View>
  );
};

export default index;
