
import i18next from 'i18next';
import Api from './Api';

export default class UserApi extends Api {
    constructor() {
        super();
        this.endpoint = "api";
        this.pagination =  {
            "page": 1,
            "per_page": 15
        }
    }

    setPagination(pagination) {
        if (!pagination) {
            return true;
        }

        this.pagination = {
            page: pagination.page,
            per_page: pagination.rowsPerPage
        };
        return false;
    }

    async get() {
        this.query = "query ($pagination: Pagination) {\n" +
            "  users (pagination: $pagination) {\n" +
            "    total\n" +
            "    per_page\n" +
            "    current_page\n" +
            "    from\n" +
            "    to\n" +
            "    data {\n" +
            "      id\n" +
            "      email\n" +
            "      sign_in_provider\n" +
            "      name\n" +
            "      role\n" +
            "      team\n" +
            "      created_at\n" +
            "      updated_at\n" +
            "    }\n" +
            "  }\n" +
            "}\n"
        ;
        this.variables = {
            "pagination": this.pagination
        }
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
