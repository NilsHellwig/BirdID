import React from "react";
import { StyleSheet, Dimensions, ScrollView, Linking } from "react-native";
import { Image as AutoHeightImage } from 'react-native-element-image';
import { TouchableOpacity } from "react-native-gesture-handler";
import FullScreenImageElement from "../components/FullScreenImageElement";

const win = Dimensions.get('window');

const MoreImagesScreen = props => {
    return (
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
            <FullScreenImageElement url={props.navigation.getParam("more_urls")[0]}/>
            <FullScreenImageElement url={props.navigation.getParam("more_urls")[1]}/>
            <FullScreenImageElement url={props.navigation.getParam("more_urls")[2]}/>
            <FullScreenImageElement url={props.navigation.getParam("more_urls")[3]}/>
            <FullScreenImageElement url={props.navigation.getParam("more_urls")[4]}/>
        </ScrollView>
    )
}

MoreImagesScreen.navigationOptions = navData => {
    return {
        headerTitle: "Mehr Bilder (Flickr)"
    }

}


const styles = StyleSheet.create({
    view: {
        marginHorizontal: 10,
    },
    image: {
        marginTop: 10,
    },
});

export default MoreImagesScreen;