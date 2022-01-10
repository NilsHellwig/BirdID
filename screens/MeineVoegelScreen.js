import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image } from "react-native";
import BirdListElement from "../components/BirdListElement";
import { deleteAllBookmarks, deleteAllHistory, deleteBookmark, deleteHistory } from "../database/database";
const completeBirdData = require("../data/bird_data.json");
import * as bookmarkActions from "../store/BookmarkActions";
import * as historyActions from "../store/HistoryActions";
import HistoryListElement from "../components/HistoryListElement";

const MeineVoegelScreen = props => {
    const dispatch = useDispatch();
    const bookmarks = useSelector(state => state.BookmarkReducer.bookmarks);
    const history = useSelector(state => state.HistoryReducer.history);
    const [bookmarkTabSelected, setBookmarkTabSelected] = useState(false);

    useEffect(() => {
        props.navigation.setParams({ askForTotalDeletion: askForTotalDeletion });
    }, [])

    const leftTabSelected = () => {
        props.navigation.setParams({ bookmarkTabSelected: false });
        setBookmarkTabSelected(false);
    }

    const rightTabSelected = () => {
        props.navigation.setParams({ bookmarkTabSelected: true });
        setBookmarkTabSelected(true);
    }

    const askForTotalDeletion = (bookmarkTabSelected) => {
        const selectedTopTab = bookmarkTabSelected ? "Lesezeichen" : "letzten Beobachtungen";
        Alert.alert(
            "Löschen",
            "Willst Du alle " + selectedTopTab + " aus der Liste Ihrer Beobachtungen löschen?",
            [
                {
                    text: "Löschen",
                    onPress: () => {
                        if (bookmarkTabSelected) {
                            deleteAllBookmarks();
                            dispatch(bookmarkActions.getAllBookmarks());
                        } else {
                            deleteAllHistory();
                            dispatch(historyActions.getHistory());
                        }
                    },
                    style: "destructive",
                },
                { text: "Behalten", onPress: () => { } }
            ],
            { cancelable: false }
        );
    }

    const askForBookmarkDeletion = (name, species_name) => {
        Alert.alert(
            "Löschen von " + name,
            "Willst Du " + name + " aus der Liste Ihrer Lesezeichenliste löschen?",
            [
                {
                    text: "Löschen",
                    onPress: () => {
                        deleteBookmark(species_name);
                        dispatch(bookmarkActions.getAllBookmarks());
                    },
                    style: "destructive",
                },
                { text: "Behalten", onPress: () => { } }
            ],
            { cancelable: false }
        );
    }

    const askForHistoryDeletion = (imageUri, species_name) => {
        Alert.alert(
            "Löschen von " + completeBirdData[species_name]["name"],
            "Willst Du " + completeBirdData[species_name]["name"] + " aus der Liste Deiner Beobachtungen löschen?",
            [
                {
                    text: "Löschen",
                    onPress: () => {
                        // Die Uri von einem Eintrag dient der eindeutigen identifizierung. Anhand dieser kann der Eintrag bei "Letzte Beobachtungen" gelöscht werden.
                        deleteHistory(imageUri);
                        dispatch(historyActions.getHistory());
                    },
                    style: "destructive",
                },
                { text: "Behalten", onPress: () => { } }
            ],
            { cancelable: false }
        );
    }

    return (
        <View>
            <View>
                <View style={styles.topBarStyle}>
                    <TouchableOpacity onPress={leftTabSelected} style={[styles.left, !bookmarkTabSelected ? styles.tabSelected : styles.tabNotSelected]}>
                        <View>
                            <Text allowFontScaling={false} style={styles.leftText}>Letzte Beobachtungen</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={rightTabSelected} style={[styles.right, bookmarkTabSelected ? styles.tabSelected : styles.tabNotSelected]}>
                        <View>
                            <Text allowFontScaling={false} style={styles.rightText}>Lesezeichen</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View></View>
            </View>
            <View>
                {!bookmarkTabSelected ?
                    <View style={styles.list}>
                        <FlatList style={styles.listScrollView} contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false} data={
                            history.sort((a, b) => (a.date > b.date ? 1 : -1)).reverse()
                        } keyExtractor={item => {
                            return item.id.toString()
                        }} renderItem={itemData => {
                            return (
                                <View>
                                    <View>
                                        <HistoryListElement margin={{ marginTop: 20 }} path={{ uri: itemData.item["imageUri"] }} onSelect={() => {
                                            props.navigation.navigate("PredictionsScreen", {
                                                data: itemData.item,
                                                uri: itemData.item["imageUri"],
                                            });
                                        }} title={completeBirdData[itemData.item["top1"]]["name"]}
                                            description={itemData.item["top1"]}
                                            date={itemData.item["date"]}
                                            onLongPress={() => {
                                                askForHistoryDeletion(itemData.item["imageUri"], itemData.item["top1"]);
                                            }} />
                                    </View>
                                </View>
                            )
                        }
                        } />
                    </View> : <View style={styles.list}>
                        <FlatList style={styles.listScrollView} contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false} data={bookmarks} keyExtractor={item => {
                            return item.id.toString()
                        }} renderItem={itemData => {
                            return (
                                <View>
                                    <BirdListElement margin={{ marginTop: 20 }} path={{ uri: completeBirdData[itemData.item["species_name"]]["img_url"] }} onLongPress={() => {
                                        askForBookmarkDeletion(completeBirdData[itemData.item["species_name"]]["name"], itemData.item["species_name"]);
                                    }} onSelect={() => {
                                        props.navigation.navigate("BirdDetailScreen", {
                                            key: itemData.item["species_name"],
                                            name: completeBirdData[itemData.item["species_name"]]["name"],
                                            bild_url: completeBirdData[itemData.item["species_name"]]["img_url"]
                                        });
                                    }} title={completeBirdData[itemData.item["species_name"]]["name"]} description={itemData.item["species_name"]} />
                                </View>
                            )
                        }
                        } />
                    </View>
                }
            </View>
        </View>
    )
}

function fontSizeAdapterTopBar() {
    let width = Dimensions.get('window').width;
    if (width > 500) {
        return 14;
    } else if (width > 400) {
        return 13;
    } else if (width > 250) {
        return 12;
    } else {
        return 11;
    }
}

const styles = StyleSheet.create({
    topBarStyle: {
        flexDirection: "row",
        marginTop: 15,
    },
    tabSelected: {
        backgroundColor: "white",
    },
    tabNotSelected: {
        backgroundColor: "#dddddd"
    },
    left: {
        flex: 1,
        margin: 10,
        marginLeft: 20,
        padding: 10,
        borderRadius: 100,
    },
    right: {
        flex: 1,
        margin: 10,
        marginRight: 20,
        padding: 10,
        borderRadius: 100,
    },
    leftText: {
        textAlign: "center",
        fontSize: fontSizeAdapterTopBar(),
        fontFamily: "Manrope_700Bold",
    },
    rightText: {
        textAlign: "center",
        fontSize: fontSizeAdapterTopBar(),
        fontFamily: "Manrope_700Bold",
    },
    list: {
        marginHorizontal: 20,
        marginTop: 10
    },
    listScrollView: {
        minHeight: "100%"
    },
    microIcon: {
        width: 30,
        height: 30
    },
});

MeineVoegelScreen.navigationOptions = navData => {
    return {
        headerTitle: "Meine Vögel"
    }
}

MeineVoegelScreen.navigationOptions = navigationData => {
    const bookmarkTabSelected = navigationData.navigation.getParam("bookmarkTabSelected");
    const askForTotalDeletion = navigationData.navigation.getParam("askForTotalDeletion");
    return {
        headerTitle: "Meine Vögel",
        // Source: https://icons8.com/icon/set/bin/ios
        headerRight: () => <TouchableOpacity onPress={() => {
            askForTotalDeletion(bookmarkTabSelected);
        }}>
            <View style={{ marginRight: 15, marginBottom: 10 }}>
                <Image style={styles.microIcon} source={require("../icons/meine-voegel/icons8-full-trash-100.png")} />
            </View>
        </TouchableOpacity>
    };
};

export default MeineVoegelScreen;