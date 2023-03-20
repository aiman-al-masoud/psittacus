import Dexie from "dexie"
import { Table } from "dexie"

/**
 * JUST keeps track of all of the Dexie tables used 
 * all over the app.
 */
export default class Database {

    static instance = null

    constructor() {
        this.db = new Dexie("psittacus")

        this.db.version(4).stores({
            cachedLessons: "id, lesson",
            customSourceCode: "classname, category, sourceCode"
        })
    }

    /**
     * @returns {Database}
     */
    static get() {
        return (Database.instance = Database.instance ?? new Database())
    }

    /**
     * 
     * @returns {Table}
     */
    cachedLessons() {
        return this.db.cachedLessons
    }

    /**
     * 
     * @returns {Table}
     */
    customSourceCode() {
        return this.db.customSourceCode
    }

}


