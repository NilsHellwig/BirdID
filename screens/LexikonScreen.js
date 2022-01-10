import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import SearchBar from "../components/SearchBar";
import BirdListElement from "../components/BirdListElement";
const completeBirdData = require("../data/bird_data.json");

const LexikonScreen = props => {
    const [birdList, setBirdList] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const birdListData = []
        for (const [key, value] of Object.entries(completeBirdData)) {
            birdListData.push({
                name: completeBirdData[key]["name"],
                key: key,
                bild_url: completeBirdData[key]["img_url"]
            });
        }
        setBirdList(birdListData)
    }, [])

    const queryInputHandler = (enteredQuery) => {
        setQuery(enteredQuery)
    };

    const checkIfQueried = (item) => {
        if (query.length == 0) {
            return true
        }
        try {
            if (item.name.toLowerCase().includes(query.toLowerCase()) || item.key.toLowerCase().includes(query.toLowerCase())) {
                return true
            } else {
                return false
            }
        } catch {
            return false
        }

    }


    return (
        <View style={styles.view}>
            <Text allowFontScaling={false} style={styles.title}>Diese Vogelarten können mit BirdID identifiziert werden.</Text>
            <SearchBar margin={{ marginTop: 0 }} queryInputHandler={queryInputHandler} query={query} />
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.list}
                contentContainerStyle={{ paddingBottom: 200 }}
                data={birdList}
                keyExtractor={item => item["key"]}
                renderItem={itemData => {
                    {
                        if (checkIfQueried(itemData.item) == true) {
                            return <BirdListElement margin={{ marginTop: 20 }} path={{ uri: itemData.item["bild_url"] }} onSelect={() => {
                                props.navigation.navigate("BirdDetailScreen", {
                                    key: itemData.item["key"],
                                    name: itemData.item["name"],
                                    bild_url: itemData.item["bild_url"]
                                });
                            }} title={itemData.item["name"]} description={itemData.item["key"]} />
                        } else {
                            return <></>
                        }
                    }
                }
                } />
        </View>)
}

LexikonScreen.navigationOptions = navData => {
    return {
        headerTitle: "Vogel - Lexikon"
    }

}

function fontSizeAdapterTitle() {
    let width = Dimensions.get('window').width;
    if (width > 400) {
        return 18;
    } else if (width > 250) {
        return 16;
    } else {
        return 14;
    }
}

const styles = StyleSheet.create({
    view: {
        padding: 20,
    },
    list: {
        marginTop: 20
    },
    title: {
        fontFamily: "Manrope_300Light",
        fontSize: fontSizeAdapterTitle(),
        color: "black",
        marginBottom: 20,
        textAlign: "center"
    }
});


export default LexikonScreen;