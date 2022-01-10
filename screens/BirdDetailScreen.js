import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import BirdTitle from "../components/BirdTitle";
import BookmarkButton from "../components/BookmarkButton";
import ShareButton from "../components/ShareButton";
import SpeciesNameTitle from "../components/SpeciesNameTitle";
import ImageGalleryPreviewCard from "../components/ImageGalleryPreviewCard";
import ScientificClassificationElement from "../components/ScientificClassificationElement";
import InformationBox from "../components/InformationBox";
import { getBirdData } from "../functions/getBirdData";
const completeBirdData = require("../data/bird_data.json");


const BirdDetailScreen = props => {
    const scientificClassificationContent = getBirdData(props.navigation.getParam("key")).scientificClassificationContent;
    const informationBoxContent = getBirdData(props.navigation.getParam("key")).informationBoxContent;

    // Der Titel von jeder Informationsbox soll eine andere, zufällige Farbe haben.
    const getRandomColor = () => {
        const colors = ["#F72585", "#560BAD", "#4361EE", "#4CC9F0"];
        const random = Math.floor(Math.random() * colors.length);
        return colors[random]
    }

    return (
        <ScrollView style={styles.view} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
            <View style={styles.subHeader}>
                <View>
                    <BirdTitle title={props.navigation.getParam("name")} display_arrow={false} />
                    <SpeciesNameTitle title={props.navigation.getParam("key")} />
                    <View style={styles.interactionButtons}>
                        <ShareButton unique_name={props.navigation.getParam("key")} name={props.navigation.getParam("name")}/>
                        <BookmarkButton artenName={props.navigation.getParam("key")} />
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <ImageGalleryPreviewCard source={{ uri: props.navigation.getParam("bild_url") }} onPress={() => {
                    props.navigation.navigate("MoreImagesScreen", {
                        more_urls: completeBirdData[props.navigation.getParam("key")]["more_urls"]
                    });
                }} />
                <View style={styles.scientificClassification}>
                    {Object.entries(scientificClassificationContent).map(([key, subject], i) => (
                        <ScientificClassificationElement key={i} key_text={key} value_text={subject} />
                    ))}
                </View>
                <View style={styles.informationBoxes}>
                    {Object.entries(informationBoxContent).map(([key, subject], i) => (
                        <InformationBox key={i} title={key} text={subject} color={getRandomColor()} />
                    ))}
                </View>
                <Text allowFontScaling={false} style={styles.sourceText}>Quelle: https://de.wikipedia.org/wiki/{props.navigation.getParam("key").replace(" ", "_")}</Text>
            </View>
        </ScrollView >
    )
}

BirdDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam("name")
    }

}

const styles = StyleSheet.create({
    view: {
        marginHorizontal: 10,
    },
    subHeader: {
        marginTop: 20,
        flexDirection: "row",
        marginHorizontal: "3%",
    },
    content: {
        marginHorizontal: "5%"
    },
    interactionButtons: {
        flexDirection: "row",
        marginTop: 20,
        marginHorizontal: "5%",
    },
    scientificClassification: {
        marginTop: 40,
    },
    informationBoxes: {
        marginTop: 30
    },
    sourceText: {
        textAlign: "center",
        marginTop: 10,
        fontFamily: "Manrope_400Regular"
    },
});

export default BirdDetailScreen;