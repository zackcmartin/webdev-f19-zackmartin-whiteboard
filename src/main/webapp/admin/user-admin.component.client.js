(function () {
    var $usernameFld, $passwordFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld;
    var $userRowTemplate, $tbody;
    var $roleFld, $updateBtn;
    var userService = new AdminUserServiceClient();
    var $user;
    var currentEdit = -1;

    $(main);


    function main() {
        $tbody = $(".wbdv-tbody");
        $form = $(".wbdv-form");
        $userRowTemplate = $(".wbdv-template");
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld")

        $createBtn = $(".wbdv-create");
        $createBtn.click(createUser);

        $updateBtn = $(".wbdv-update");
        $updateBtn.click(updateUser);

        findAllUsers();

    }
    function createUser() {
        const newUsername = $usernameFld.val();
        const newPassword = $passwordFld.val();
        const newFirstName = $firstNameFld.val();
        const newLastName = $lastNameFld.val();
        const role = $roleFld.val();

        const newUser = {
            username: newUsername,
            password: newPassword,
            firstName: newFirstName,
            lastName: newLastName,
            role: role,
            id: (Date.now()) + ''
        }

        userService.createUser(newUser).then(clearForm).then(findAllUsers);
    }


    function findAllUsers() {
        userService.findAllUsers().then(renderUsers);
    }


    function findUserById(userId) {
        userService.findUserById(userId).then(renderUser);
    }


    function deleteUser() {
        const deleteButton = $(event.currentTarget);
        const userIdToDelete = deleteButton.attr("id");

        userService.deleteUser(userIdToDelete).then(findAllUsers);
    }


    function selectUser() {
        const editButton = $(event.currentTarget);
        const userIdToEdit = editButton.attr("id");
        findUserById(userIdToEdit);
        currentEdit = userIdToEdit;
    }


    function updateUser() {
        if (currentEdit != -1) {
            const editedUser = {
                username: $usernameFld.val(),
                password: $passwordFld.val(),
                firstName: $firstNameFld.val(),
                lastName: $lastNameFld.val(),
                role: $roleFld.val()
            }

            userService.updateUser(currentEdit, editedUser).then(clearForm).then(findAllUsers);
        }
    }


    function renderUser(user) {
        $usernameFld.val(user.username);
        $passwordFld.val(user.password);
        $firstNameFld.val(user.firstName);
        $lastNameFld.val(user.lastName)
        $roleFld.val(user.role)

    }

    function clearForm() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("")
        currentEdit = 1;
    }

    function renderUsers(users) {

        $tbody.empty();

        for (var i = 0; i < users.length; i++) {
            $tr = $userRowTemplate.clone();
            $td = $tr.find(".wbdv-username");
            $td.html(users[i].username);
            $td = $tr.find(".wbdv-first-name");
            $td.html(users[i].firstName);
            $td = $tr.find(".wbdv-last-name");
            $td.html(users[i].lastName);
            $td = $tr.find(".wbdv-role");
            $td.html(users[i].role);

            $removeBtn = $tr.find(".wbdv-remove");
            $removeBtn.click(deleteUser);
            $removeBtn.attr("id", users[i].id);

            $editBtn = $tr.find(".wbdv-edit");
            $editBtn.click(selectUser);
            $editBtn.attr("id", users[i].id);


            $tbody.append($tr);
        }
    }
})();
