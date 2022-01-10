import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, ActivityIndicator } from "react-native"
import { Image as AutoHeightImage } from 'react-native-element-image';
import LoadingGalleryImage from "../components/LoadingGalleryImage";

const ImageGalleryPreviewCard = props => {
    const [loading, setLoading] = useState(false);

    return (<View>
        <View style={styles.imageCard}>
            <AutoHeightImage style={styles.imageCardImage} height={250} source={props.source}
                onLoadStart={() => {
                    setLoading(true);
                }}
                onLoadEnd={() => {
                    setLoading(false);
                }} />
            {loading && <LoadingGalleryImage/>}
        </View>
        <TouchableOpacity style={styles.moreImagesTouchable} activeOpacity={0.7} onPress={props.onPress}>
            <View style={styles.moreImagesView}>
                <Text allowFontScaling={false} style={styles.moreImagesText}>Mehr Bilder</Text>
                <Image style={{ ...styles.microIcon, ...{ marginLeft: 10 } }} source={require("../icons/prediction-screen/icons8-photo-gallery-100.png")} />
            </View>
        </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
    imageCard: {
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 20,
        marginTop: 20,
        overflow: "hidden",
    },
    imageCardImage: {
        overflow: "hidden",
    },
    moreImagesView: {
        alignSelf: "flex-end",
        marginRight: 12,
        backgroundColor: "white",
        paddingHorizontal: 10,
        borderRadius: 20,
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5
    },
    moreImagesText: {
        color: "black",
        fontSize: 22,
        fontFamily: "Manrope_400Regular"
    },
    moreImagesTouchable: {
        marginTop: -50
    },
    microIcon: {
        width: 25,
        height: 25
    },
});

export default ImageGalleryPreviewCard;