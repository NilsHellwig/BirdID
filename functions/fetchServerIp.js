// Da sich prinzipiell die IP des Servers mal ändern kann, wird die IP zum Server zunächst aus von einem Webserver der Universität Regensburg gefetcht. 
// Auf https://homepages.ur.de/~hen58277/birdid_ip wird die IP zum Server mit dem bereitgestellten Modell gespeichert.
export const fetchServerIp = async () => {
    let url = "https://homepages.ur.de/~hen58277/birdid_ip";
    response = await (await fetch(url)).json();
    return response.ip
}