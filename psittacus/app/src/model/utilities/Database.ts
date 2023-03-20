import Dexie from "dexie"
import { Table } from "dexie"

export function getDatabase(): Database {
    return new DexieDatabase()
}

export interface Database {
    cachedLessons(): Table
    customSourceCode(): Table
}

/**
 * JUST keeps track of all of the Dexie tables used 
 * all over the app.
 */
class DexieDatabase implements Database {

    readonly db = new Dexie("psittacus")

    constructor() {
        this.db.version(4).stores({
            cachedLessons: 'id, lesson',
            customSourceCode: 'classname, category, sourceCode'
        })
    }

    cachedLessons(): Table {
        return (this.db as any).cachedLessons
    }

    customSourceCode(): Table {
        return (this.db as any).customSourceCode
    }

}


