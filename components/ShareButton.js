import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Share } from "react-native"

const ShareButton = props => {
    const onShare = async () => {
        const result = await Share.share({
            message: props.name + " (" + props.unique_name+")"+" habe ich mit BirdID entdeckt. Hier findest Du mehr Informationen zu dieser Vogelart: " + "https://de.wikipedia.org/wiki/" + props.unique_name.replace(" ", "_"),
        });
    };

    return (
        <TouchableOpacity onPress={() => { onShare() }}>
            <View style={styles.shareView}>
                <Image style={styles.microIcon} source={require("../icons/prediction-screen/icons8-upload-100.png")} />
                <Text allowFontScaling={false} style={styles.shareViewText}>Teilen</Text>
            </View>
        </TouchableOpacity>);
};

const styles = StyleSheet.create({
    shareView: {
        flexDirection: "row",
        marginRight: 25
    },
    shareViewText: {
        fontSize: 20,
        fontFamily: "Manrope_500Medium",
        marginLeft: 8
    },
    microIcon: {
        width: 25,
        height: 25
    },
});

export default ShareButton;