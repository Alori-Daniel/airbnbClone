import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const profile = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      <Button title="Log out" onPress={() => signOut()} />

      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
};

export default profile;
