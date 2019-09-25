function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    var self = this;

    function createUser(user, callback) {
        return fetch("https://wbdv-generic-server.herokuapp.com/api/zackmartin/users", {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    function findAllUsers(callback) {
        return fetch("https://wbdv-generic-server.herokuapp.com/api/zackmartin/users")
            .then(response => response.json())
    }

    function findUserById(userId, callback) {
        return fetch("https://wbdv-generic-server.herokuapp.com/api/zackmartin/users/" + userId)
            .then(response => response.json())
    }

    function updateUser(userId, user, callback) {
        return fetch("https://wbdv-generic-server.herokuapp.com/api/zackmartin/users/" + userId, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    function deleteUser(userId, callback) {
        return fetch("https://wbdv-generic-server.herokuapp.com/api/zackmartin/users/" + userId, {
            method: 'delete'
        })
    }
}
