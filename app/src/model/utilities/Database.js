import Dexie from "dexie"
import { Table } from "dexie"

/**
 * Database ...
 */
export default class Database {

    static instance = null

    constructor() {

        this.db = new Dexie("psittacus")

        this.db.version(1).stores({
            cachedLessons: "id, lesson"
        })
    }

    /**
     * @returns {Database}
     */
    static get(){
        return ( Database.instance = Database.instance ?? new Database() )
    }

    /**
     * 
     * @returns {Table}
     */
    cachedLessons() {
        return this.db.cachedLessons
    }

}

