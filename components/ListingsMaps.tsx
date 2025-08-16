import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/styles";
import { Listing } from "@/interfaces/listing";
import { ListingGeo } from "@/interfaces/listingGeo";
import { useRouter } from "expo-router";
import MapView from "@allisonadam81/react-native-super-clusters";

interface Props {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 52.49251658413422,
  longitude: 13.346443606561111,
  latitudeDelta: 0.1, // smaller delta = closer zoom
  longitudeDelta: 0.1,
};

const ListingsMaps = ({ listings }: Props) => {
  const router = useRouter();
  const onMarkerSelected = (item: ListingGeo) => {
    router.push(`/listing/${item.properties.id}`);
  };
  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
        <View style={styles.marker}>
          <Text
            style={{ color: "#000", textAlign: "center", fontFamily: "Tit-sb" }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };
  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        mapType={Platform.OS == "android" ? "none" : "standard"}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="Tit-sb"
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>$ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default ListingsMaps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 6,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Tit-sb",
  },
});
