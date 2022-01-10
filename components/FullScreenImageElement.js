import React, { useState } from "react";
import { StyleSheet, Linking, Dimensions } from "react-native";
import { Image as AutoHeightImage } from 'react-native-element-image';
import { TouchableOpacity } from "react-native-gesture-handler";
import LoadingGalleryImage from "../components/LoadingGalleryImage";

const win = Dimensions.get('window');

const FullScreenImageElement = props => {
    const [loading, setLoading] = useState(false);
    return (<TouchableOpacity onPress={() => Linking.openURL(props.url)}>
        <AutoHeightImage style={styles.image} width={win.width - 20} source={{ uri: props.url }}
            onLoadStart={() => {
                setLoading(true);
            }}
            onLoadEnd={() => {
                setLoading(false);
            }} />
            {loading && <LoadingGalleryImage/>}
    </TouchableOpacity>);
};


const styles = StyleSheet.create({
    view: {
        marginHorizontal: 10,
    },
    image: {
        marginTop: 10,
    },
});

export default FullScreenImageElement;