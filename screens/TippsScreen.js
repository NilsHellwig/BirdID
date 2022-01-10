import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Image as AutoHeightImage } from 'react-native-element-image';
import BlackLine from "../components/BlackLine"
import TippTitleElement from "../components/TippTitleElement";
const win = Dimensions.get('window');

const TippsScreen = props => {

    return (
        <View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <View>
                    <AutoHeightImage width={win.width} source={require("../data/preview.jpg")} />
                    <View style={{ marginTop: -25 }}>
                        <BlackLine />
                    </View>
                </View>
                <View style={styles.scrollView}>
                    <TippTitleElement title="1. Hochladen & Fotografieren." image={require("../icons/tipps-icons/icons8-camera-100.png")} />
                    <Text allowFontScaling={false} style={styles.text}>Es gibt sowohl die Möglichkeit, ein Bild von einem Vogel hochzuladen, als auch ein neues Bild aufzunehmen. Dafür gibt es auf dem "Home"-Tab jeweils einen Button.</Text>
                    <View style={styles.imgView}>
                        <AutoHeightImage style={styles.resizingStyle} width={win.width * 0.75} source={require("../data/upload.png")} />
                    </View>
                    <TippTitleElement title="2. Der perfekte Schnappschuss." image={require("../icons/tipps-icons/icons8-shoot-image-100.png")} />
                    <Text allowFontScaling={false} style={styles.text}>Es ist wichtig, den Vogel so nahe wie möglich zu fotografieren. Viele Smartphones verfügen über optischen Zoom. Dadurch ist es noch einfacher, eine möglichst hochauflösende, nahe Aufnahme von einem Vogel aufzunehmen.</Text>
                    <View style={styles.imgView}>
                        <AutoHeightImage style={styles.resizingStyle} width={win.width * 0.5} source={require("../data/camera.png")} />
                    </View>
                    <TippTitleElement title="3. Zuschneiden." image={require("../icons/tipps-icons/icons8-resize-100.png")} />
                    <Text allowFontScaling={false} style={styles.text}>Die Bestimmung funktioniert besser, wenn der Vogel auf dem Foto möglichst formatfüllend abgebildet ist. Es ist daher zu empfehlen, das Bild von einem Vogel passend zuzuschneiden.</Text>
                    <View style={styles.imgView}>
                        <AutoHeightImage style={styles.resizingStyle} width={win.width * 0.5} source={require("../data/resizing-tipps.png")} />
                    </View>
                    <TippTitleElement title="4. Ranking." image={require("../icons/tipps-icons/icons8-collection-100.png")} />
                    <Text allowFontScaling={false} style={styles.text}>Diese Funktion ermöglicht es Ihnen, die wahrscheinlichsten Vogelarten zu betrachten. Dabei werden die fünf wahrscheinlichsten Arten angezeigt.</Text>
                    <View style={styles.imgView}>
                        <AutoHeightImage style={styles.resizingStyle} width={win.width * 0.5} source={require("../data/ranking.png")} />
                    </View>
                    <TippTitleElement title="5. Schatten & Gegenlicht vermeiden." image={require("../icons/tipps-icons/icons8-shadow-100.png")} />
                    <Text allowFontScaling={false} style={styles.text}>Versuche, Schatten und Gegenlicht zu vermeiden. Dadurch könnten wichtige Details auf dem Bild nicht mehr erkennbar sein.</Text>
                </View>

            </ScrollView>
        </View>

    )
}

TippsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Tipps für BirdID",
    }

}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
        marginHorizontal: 20
    },
    resizingStyle: {
        marginTop: 20,
    },
    imgView: {
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        marginTop: 20,
        fontFamily: "Manrope_300Light",
        textAlign: "justify",
        lineHeight: 30,
    }
});

export default TippsScreen;