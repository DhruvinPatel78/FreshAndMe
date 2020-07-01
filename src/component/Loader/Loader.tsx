import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loader = (props:any) => {
    const size = props.size ? props.size : "large";
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={size} color="#00ff00" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default Loader
