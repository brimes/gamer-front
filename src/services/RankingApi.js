
import i18next from 'i18next';
import Api from './Api';

export default class RankingApi extends Api {
    constructor() {
        super();
        this.endpoint = "api";
    }

    async get() {
        this.query = "query {\n" +
            "  ranking {\n" +
            "    id\n" +
            "    position\n" +
            "    name\n" +
            "    score\n" +
            "    email\n" +
            "    avatar\n" +
            "    team\n" +
            "  }\n" +
            "}" ;
        this.variables = {}
        const result = await this.send();
        if (result.data == null || result.data.ranking == null) {
            return Promise.reject(result.errors[0].message);
        }
        return result.data.ranking;
    }
}
