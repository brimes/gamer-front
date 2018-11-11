
import i18next from 'i18next';
import Api from './Api';

export default class UserApi extends Api {
    constructor() {
        super();
        this.endpoint = "api";
    }

    async get() {
        this.query = "query {\n" +
            "  users {\n" +
            "    id\n" +
            "    name\n" +
            "    email\n" +
            "    uid\n" +
            "    emailVerified\n" +
            "    photoUrl\n" +
            "    phoneNumber\n" +
            "    role\n" +
            "    singInProvider\n" +
            "    created_at\n" +
            "  }\n" +
            "}";
        this.variables = {}
        const result = await this.send();
        if (result.data == null) {
            return Promise.reject(result.errors[0].message);
        }
        return result.data.users;
    }

    async delete(id) {
        this.query = "mutation deteleUser($id: String!) {\n" +
            "  deleteUser(id: $id)\n" +
            "}";
        this.variables = {
            id: id
        }
        const result = await this.send();
        if (result.data == null || result.data.deleteUser == null) {
            return Promise.reject(result.errors[0].message);
        }
        return result.data.deleteUser;
    }
}
