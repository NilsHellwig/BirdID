import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import BirdTitle from "../components/BirdTitle";
import BlackLine from "../components/BlackLine";
import BookmarkButton from "../components/BookmarkButton";
import CertainityElement from "../components/CertainityElement";
import ImageGalleryPreviewCard from "../components/ImageGalleryPreviewCard";
import InformationBox from "../components/InformationBox";
import ScientificClassificationElement from "../components/ScientificClassificationElement";
import SelectorElement from "../components/SelectorElement";
import ShareButton from "../components/ShareButton";
import SpeciesNameTitle from "../components/SpeciesNameTitle";
import { Image as AutoHeightImage } from 'react-native-element-image';
import RankingTitle from "../components/RankingTitle";
const completeBirdData = require("../data/bird_data.json");
import { getBirdData } from "../functions/getBirdData";

const PredictionsScreen = props => {
    const [currentBirdData, setCurrentBirdData] = useState({});
    const [currentTopIndex, setCurrentTopIndex] = useState(1);

    const scientificClassificationContent = getBirdData(props.navigation.getParam("data")["top" + currentTopIndex]).scientificClassificationContent;
    const informationBoxContent = getBirdData(props.navigation.getParam("data")["top" + currentTopIndex]).informationBoxContent;

    const getRandomColor = () => {
        const colors = ["#F72585", "#560BAD", "#4361EE", "#4CC9F0"];
        const random = Math.floor(Math.random() * colors.length);
        return colors[random]
    }

    useEffect(() => {
        const data = completeBirdData[props.navigation.getParam("data")["top" + currentTopIndex]];
        data["prob"] = props.navigation.getParam("data")["prob" + currentTopIndex];
        data["image_uri"] = props.navigation.getParam("uri");
        setCurrentBirdData(data);
    }, [currentTopIndex])

    // Quellen: https://icons8.com/icon/set/arrow/ios / https://icons8.com/icon/set/upload/ios / https://icons8.com/icon/set/photos/ios
    return (
        <View style={styles.view}>
            <View style={styles.header}>
                <RankingTitle />
                <View style={styles.selector}>
                    <SelectorElement selected={currentTopIndex == 1 ? true : false} title={"1."} onSelect={() => { setCurrentTopIndex(1) }} />
                    <SelectorElement selected={currentTopIndex == 2 ? true : false} title={"2."} onSelect={() => { setCurrentTopIndex(2) }} />
                    <SelectorElement selected={currentTopIndex == 3 ? true : false} title={"3."} onSelect={() => { setCurrentTopIndex(3) }} />
                    <SelectorElement selected={currentTopIndex == 4 ? true : false} title={"4."} onSelect={() => { setCurrentTopIndex(4) }} />
                    <SelectorElement selected={currentTopIndex == 5 ? true : false} title={"5."} onSelect={() => { setCurrentTopIndex(5) }} />
                </View>
                <View style={styles.subHeader}>
                    <View>
                        <BirdTitle title={currentBirdData["name"]} display_arrow={true} onPress={() => {
                            props.navigation.navigate("BirdDetailScreen", {
                                key: currentBirdData["unique_name"],
                                name: currentBirdData["name"],
                                bild_url: currentBirdData["img_url"]
                            });
                        }} />
                        <SpeciesNameTitle title={currentBirdData["unique_name"]} />
                        <CertainityElement certainty={currentBirdData["prob"]} />
                        <View style={styles.interactionButtons}>
                            <ShareButton unique_name={currentBirdData["unique_name"]} name={currentBirdData["name"]} />
                            <BookmarkButton artenName={currentBirdData["unique_name"]} />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("PhotographySingleView", { uri: currentBirdData["image_uri"] });
                    }} style={styles.userShotView}>
                        <View>
                            <AutoHeightImage style={styles.userShot} height={75} source={{ uri: currentBirdData["image_uri"] }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <BlackLine />
            </View>
            <ScrollView style={styles.descriptionView} contentContainerStyle={{ paddingBottom: 320 }} showsVerticalScrollIndicator={false}>
                <ImageGalleryPreviewCard source={{ uri: currentBirdData["img_url"] }} onPress={() => {
                    props.navigation.navigate("MoreImagesScreen", {
                        more_urls: completeBirdData[currentBirdData["unique_name"]]["more_urls"]
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
                <Text allowFontScaling={false} style={styles.sourceText}>{"Quelle: https://de.wikipedia.org/wiki/" + currentBirdData["unique_name"]}</Text>
            </ScrollView>
        </View>
    )
}

PredictionsScreen.navigationOptions = navigationData => {
    return {
        headerTitle: "Beobachtung",
        // Source: https://icons8.com/icon/set/close/ios
        headerRight: () => <TouchableOpacity onPress={() => { navigationData.navigation.pop() }}>
            <View style={{ marginRight: 15, marginBottom: 10 }}>
                <Image style={styles.microIcon} source={require("../icons/prediction-screen/icons8-close-100.png")} />
            </View>
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    subHeader: {
        flexDirection: "row",
        marginHorizontal: "2%",
    },
    view: {
        marginTop: 30,
    },
    header: {
        width: "100%"
    },
    selector: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "center",
        marginTop: 5
    },
    interactionButtons: {
        flexDirection: "row",
        marginTop: 20,
        marginHorizontal: "5%",
    },
    scientificClassification: {
        marginTop: 40,
    },
    descriptionView: {
        height: "100%",
        marginHorizontal: "5%",
    },
    informationBoxes: {
        marginTop: 30
    },
    userShot: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        width: 100,
        height: 100,
        marginHorizontal: "5%",
    },
    userShotView: {
        justifyContent: "center",
        transform: [{ rotate: '9deg' }],
        alignItems: "flex-end",
        flex: 1,
        marginRight: 10
    },
    sourceText: {
        textAlign: "center",
        marginTop: 10,
        fontFamily: "Manrope_400Regular"
    },
    microIcon: {
        width: 25,
        height: 25
    },
});

export default PredictionsScreen;