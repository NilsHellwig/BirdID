import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import GradientButton from "../components/GradientButton"
import WhiteCard from "../components/WhiteCard";
import * as ImagePicker from "expo-image-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import { insertHistory } from "../database/database";
import * as FileSystem from "expo-file-system"
import { useSelector, useDispatch } from "react-redux";
import * as bookmarkActions from "../store/BookmarkActions";
import * as historyActions from "../store/HistoryActions";
const completeBirdData = require("../data/bird_data.json");
import * as SecureStore from 'expo-secure-store';
import { fetchServerIp } from "../functions/fetchServerIp";

const HomeScreen = props => {
    const bookmarks = useSelector(state => state.BookmarkReducer.bookmarks);
    const history = useSelector(state => state.HistoryReducer.history);
    const [birdDataOfTheDay, setBirdDataOfTheDay] = useState({});

    // Um Fehler zu vermeiden, wird zunächst eine default URL gesetzt für ein Bild.
    const [timestamp, setTimestamp] = useState("");
    const dispatch = useDispatch();

    // Zur Initialisierung der Card auf dem Home-Screen müssen Daten zu dem Vogel des Tages gesammelt werden.
    const getBirdOfTheDayData = async () => {
        const ip = await fetchServerIp();
        fetch(ip + "get_vdt", {
            method: "GET",
        }).then(async (res) => {
            res.json().then(async (data) => {
                setBirdDataOfTheDay(data);
                setTimestamp(data["timestamp"]);
            });
        });
    }

    useEffect(() => {
        dispatch(bookmarkActions.getAllBookmarks());
        dispatch(historyActions.getHistory());
        getBirdOfTheDayData();
    }, [dispatch]);

    const [shotImage, setShotImage] = useState();
    const [pickedImage, setPickedImage] = useState();
    const [spinning, setSpinning] = useState(false);

    // Um Bilder aus der Foto-Mediathek zu laden, müssend benötigte Permissions abgefragt werden.
    const verifyPermissionLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status == "granted") {
            return true;
        } else {
            Alert.alert("Insufficient permissions!", "You need to grant library permissions to use this app.", [{ text: "Okay" }]);
            return false;
        }
    }

    // Um auch Fotos mit der Kamera machen zu können, müssen benötigte Permissions abgefragt werden.
    const verifyPermissionCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status == "granted") {
            return true;
        } else {
            Alert.alert("Insufficient permissions!", "You need to grant camera permissions to use this app.", [{ text: "Okay" }]);
            return false;
        }
    };

    const AsyncAlert = async () => new Promise((resolve) => {
        Alert.alert(
            "Datenspende",
            "Damit die Bestimmung einer Vogelart noch besser funktioniert, kannst Du gerne Deine Bestimmungen teilen. Achtung! Durch das Aktivieren dieser Funktion werden Deine Schnappschüsse auf einem Server gespeichert. Die Bilddaten gelangen nicht an Dritte.",
            [
                {
                    text: "Erlauben",
                    onPress: async () => {
                        await SecureStore.setItemAsync("request_datenspende", "true");
                        await SecureStore.setItemAsync("datenspende", "true");
                        resolve("YES");
                    }
                },
                {
                    text: "Nicht erlauben",
                    onPress: async () => {
                        await SecureStore.setItemAsync("request_datenspende", "true");
                        await SecureStore.setItemAsync("datenspende", "false");
                        resolve("YES");
                    },
                    style: "destructive",
                }
            ],
            { cancelable: false }
        );
    });

    const requestDatenspende = async (image, ip) => {
        async function checkIfDatenspendeRequested() {
            let result = await SecureStore.getItemAsync("request_datenspende");
            if (result == null) {
                await AsyncAlert();
            }
        }
        await checkIfDatenspendeRequested();
    }


    const takeImageHandler = async () => {
        // await SecureStore.deleteItemAsync("request_datenspende");
        await requestDatenspende();
        const hasPermission = await verifyPermissionCamera();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });
        setSpinning(true)
        if (!image.cancelled) {
            setShotImage(image.uri);
            handleImageUpload(image);
        } else {
            setSpinning(false);
        }

    };

    const pickImage = async () => {
        const rd = await requestDatenspende();
        const hasPermission = await verifyPermissionLibrary();
        if (!hasPermission) {
            return;
        }
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
        });
        setSpinning(true)
        if (!image.cancelled) {
            setPickedImage(image.uri);
            handleImageUpload(image);
        } else {
            setSpinning(false);
        }

    };

    // Falls der Nutzer die "Datenspende" Funktion aktiviert hat, wird das gewählte Bild auf dem Server der App gespeichert.
    const handleDatenspende = async (image, ip) => {
        var enableDatenspende = await SecureStore.getItemAsync("datenspende");
        if (enableDatenspende == "true") {
            fetch(ip + "datenspende", {
                method: "POST",
                body: image
            });
        }
    }

    const saveBirdToDatabase = async (newPath, data, image) => {
        await FileSystem.moveAsync({
            from: image.uri,
            to: newPath
        });

        const date = new Date().toLocaleDateString("de-DE") + " " + new Date().toLocaleTimeString("de-DE", {
            hour12: false,
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });

        await insertHistory(data["top1"], data["top2"], data["top3"], data["top4"], data["top5"], data["prob1"], data["prob2"], data["prob3"], data["prob4"], data["prob5"], newPath, date);
        dispatch(historyActions.getHistory());
    }

    const handleImageUpload = async (image) => {
        const ip = await fetchServerIp();
        handleDatenspende(image, ip);
        fetch(ip + "classify", {
            method: "POST",
            body: image
        }).then(async (res) => {
            res.json().then(async (data) => {
                setSpinning(false);
                // Falls kein Foto von einem Vogel gefunden wurde auf dem Bild, wird ein entsprechender Bildschirm angezeigt.
                if (!data["isBird"]) {
                    props.navigation.navigate("NoBirdFoundScreen", {
                        data: data,
                        uri: image.uri
                    });
                    // Wenn ein Vogel gefunden wurde, werden alle Vorhersagen auf dem PredictionsScreen angezeigt.
                    // Vorher wird die Anfrage jedoch noch in der SQLite Datenbank auf dem Gerät gesichert.
                } else {
                    const fileName = image.uri.split("/").pop();
                    const newPath = FileSystem.documentDirectory + fileName;
                    saveBirdToDatabase(newPath, data, image);
                    props.navigation.navigate("PredictionsScreen", {
                        data: data,
                        uri: newPath
                    });
                }

            });
            // Falls die Anfrage nicht funktioniert hat, liegt dies möglicherweise an einem Fehler am Server.
            // Daher wird dem Nutzer empfohlen, sich über einen Fehlerbericht zu informieren.
        }).catch((error) => {
            Alert.alert(
                "Warnung",
                "Es gab ein Problem bei Deiner Anfrage. Bitte informiere Dich unter Mehr > Fehler Melden über einen Fehlerbericht!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setSpinning(false);
                        }
                    }
                ]
            );
        });
    }

    const showBirdOfTheDay = async () => {
        const ip = await fetchServerIp();
        fetch(ip + "get_vdt", {
            method: "GET",
        }).then(async (res) => {
            res.json().then(async (data) => {
                props.navigation.navigate("BirdDetailScreen", {
                    key: data["species_name"],
                    name: completeBirdData[data["species_name"]]["name"],
                    bild_url: completeBirdData[data["species_name"]]["img_url"],
                });
            });
        });
    }

    if (spinning) {
        return (<Spinner
            visible={spinning}
            textContent={"Vogelart wird identifiziert..."}
            textStyle={styles.spinnerStyle}
        />)
    }

    return (
        // Quellen: https://icons8.com/icon/set/camera/ios 
        // https://icons8.com/icon/set/albums/ios 
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
            <GradientButton path={require("../icons/home/icons8-camera-100.png")} onSelect={takeImageHandler} text="Vogel bestimmen" color_start="#7209B7" color_end="#F72585" />
            <GradientButton path={require("../icons/home/icons8-albums-100.png")} onSelect={pickImage} text="Vogel aus Fotoalbum" color_start="#3A0CA3" color_end="#4CC9F0" />
            <WhiteCard margin={{ marginTop: 20 }} path={require("../icons/home/tipps.png")} onSelect={() => {
                props.navigation.navigate("TippsScreen");
            }} title="Tipps für BirdID" description="Wie bestimme ich die Vogelart am besten?" imageStyle={{ borderWidth: 0, borderColor: "black", }} />
            <WhiteCard margin={{ marginTop: 20 }} path={require("../icons/home/bird.png")} onSelect={() => {
                showBirdOfTheDay();
            }} title="Vogel des Tages" timestamp={timestamp} description={birdDataOfTheDay["species_name"]} imageStyle={{ borderWidth: 0, borderColor: "black", }} />
            <WhiteCard margin={{ marginTop: 20 }} path={require("../icons/home/NN.png")} onSelect={() => {
                props.navigation.navigate("WhatIsBirdIDScreen");
            }} title="Wie funktioniert BirdID?" description="Künstliche Intelligenz zur Vogelbestimmung" />
        </ScrollView>
    )
}

HomeScreen.navigationOptions = navData => {
    return {
        headerTitle: "Home"
    }
}

const styles = StyleSheet.create({
    view: {
        padding: 20,
    },
    spinnerStyle: {
        fontFamily: "Manrope_400Regular",
        color: "white"
    }
});

export default HomeScreen;