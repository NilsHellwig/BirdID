import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database.db');

export const initBookmarkDatabase = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY NOT NULL, species_name TEXT NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const initHistoryDatabase = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY NOT NULL, top1 TEXT NOT NULL, top2 TEXT NOT NULL, top3 TEXT NOT NULL, top4 TEXT NOT NULL, top5 TEXT NOT NULL, prob1 TEXT NOT NULL, prob2 TEXT NOT NULL, prob3 TEXT NOT NULL, prob4 TEXT NOT NULL, prob5 TEXT NOT NULL, imageUri TEXT NOT NULL, date TEXT NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertBookmark = (species_name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO bookmarks (species_name) VALUES (?);',
                [species_name],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const deleteBookmark = (species_name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM bookmarks WHERE species_name = '${species_name}'`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const deleteHistory = (imageUri) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM history WHERE imageUri = '${imageUri}'`,
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const fetchBookmarks = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM bookmarks where id',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const deleteAllBookmarks = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM bookmarks',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const deleteAllHistory = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM history',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const insertHistory = (top1, top2, top3, top4, top5, prob1, prob2, prob3, prob4, prob5, imageUri, date) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO history (top1, top2, top3, top4, top5, prob1, prob2, prob3, prob4, prob5, imageUri, date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);',
                [top1, top2, top3, top4, top5, prob1, prob2, prob3, prob4, prob5, imageUri, date],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const fetchHistory = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM history where id',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}