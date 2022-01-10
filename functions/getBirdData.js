const completeBirdData = require("../data/bird_data.json");

export function getBirdData(key) {
    const scientificClassificationContent = {}
    const informationBoxContent = {}
    for (var k in completeBirdData[key]) {
        if (completeBirdData[key][k].length != 0) {
            if (k == "Familie" || k == "Unterfamilie" || k == "Ordnung" || k == "Unterordnung" || k == "Gattung" || k == "Unterklasse" || k == "Klasse" || k == "Tribus") {
                scientificClassificationContent[k] = completeBirdData[key][k]
            } else if (k == "summary") {
                informationBoxContent["Allgemein"] = completeBirdData[key][k]
            } else if (k != "more_urls" && k != "bild_url" && k != "name" && k != "unique_name" && k != "Weblinks" && k != "Quellen" && k != "Literatur" && k != "Belege" && k != "prob" && k != "image_uri" && k != "img_url") {
                informationBoxContent[k] = completeBirdData[key][k]
            }
        }
    }
    return {
        scientificClassificationContent: scientificClassificationContent,
        informationBoxContent: informationBoxContent
    }
}