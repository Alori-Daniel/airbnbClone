import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Listing } from "@/interfaces/listing";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Listings from "./Listings";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  listings: Listing[];
  category: string;
}

const ListingsBottomSheet = forwardRef<BottomSheet, Props>(
  ({ listings, category }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Expose imperative methods to parent via forwarded ref
    React.useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheet);
    const [refresh, setRefresh] = useState(0);

    const snapPoints = useMemo(() => ["10%", "100%"], []);
    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
    }, []);

    const showMap = () => {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.collapse();
      }
      setRefresh(refresh + 1);
    };
    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        enablePanDownToClose={false}
        // onChange={handleSheetChanges}
        handleIndicatorStyle={{ backgroundColor: Colors.grey }}
        style={styles.sheetContainer}
      >
        <View style={{ flex: 1 }}>
          <Listings listings={listings} category={category} refresh={refresh} />
          <View style={styles.absoluteBtn}>
            <TouchableOpacity onPress={showMap} style={styles.btn}>
              <Text style={{ fontFamily: "Tit-sb", color: "#fff" }}>Map</Text>

              <Ionicons name="map" size={20} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    );
  }
);

export default ListingsBottomSheet;

const styles = StyleSheet.create({
  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 30,
    gap: 8,
  },
  sheetContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
