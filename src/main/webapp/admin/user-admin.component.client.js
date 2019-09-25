(function () {
    var $usernameFld, $passwordFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld;
    var $userRowTemplate, $tbody;
    var $roleFld
    var userService = new AdminUserServiceClient();
    var $user;

    $(main);

    let users = [
    ]

    function main() { 
        $tbody = $(".wbdv-tbody");
        $userRowTemplate = $(".wbdv-template");
        $usernameFld = $(".wbdv-userNameFld");
        $passwordFld = $(".wbdv-passwordFld");
        $firstNameFld = $(".wbdv-firstNameFld");
        $lastNameFld = $(".wbdv-lastNameFld");
        $roleFld = $(".wbdv-roleFld")
         
        $createBtn = $(".wbdv-create");
        $createBtn.click(createUser);

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

        userService.createUser(newUser).then(findAllUsers);

        // users.push(newUser);

        // renderUsers(users);
     }
    function findAllUsers() { 
        userService.findAllUsers().then(renderUsers);
     }
    function findUserById(userId) { 
        userService.findUserById(userId).then(selectUser);
     }


    function deleteUser() { 
        const deleteButton = $(event.currentTarget);
        const userIdToDelete = deleteButton.attr("id");

        userService.deleteUser(userIdToDelete).then(findAllUsers);
     }


    function selectUser() { }
    function updateUser() { }
    function renderUser(user) { }
    function renderUsers(users) { 

        $tbody.empty();

        for(var i=0; i<users.length; i++){
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
            $editBtn.click(findUserById(users[i].id));
            $editBtn.attr("id", users[i].id);

            console.log(users[i]);


            $tbody.append($tr);
        }
    }
})();
