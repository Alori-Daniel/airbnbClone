import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/airbnb-listings.json";
import ListingsMaps from "@/components/ListingsMaps";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";

const index = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingsData as any, []);
  // console.log("Items", items);
  const listingRef = useRef<BottomSheet>(null);
  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, marginTop: 220 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />

      <ListingsMaps listings={listingsDataGeo} />
      <ListingsBottomSheet
        ref={listingRef}
        listings={items}
        category={category}
      />
    </GestureHandlerRootView>
  );
};

export default index;
