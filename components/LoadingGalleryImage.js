import React from "react";
import { View, ActivityIndicator, StyleSheet  } from "react-native"

// Source: https://stackoverflow.com/questions/35265751/image-preloading-in-react-native

const LoadingGalleryImage = props => {
    return (<View style={styles.container}>
        <ActivityIndicator size="small" color="#444444" />
    </View>);
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", 
        height:"100%",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    }
});

export default LoadingGalleryImage;