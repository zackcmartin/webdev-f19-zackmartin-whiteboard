(function () {
    var $usernameFld, $passwordFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld;
    var $userRowTemplate, $tbody;
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
        
        $createBtn = $(".wbdv-create");
        $createBtn.click(createUser);

        findAllUsers();

     }
    function createUser() { 
        const newUsername = $usernameFld.val();
        const newPassword = $passwordFld.val();
        const newFirstName = $firstNameFld.val();
        const newLastName = $lastNameFld.val();

        const newUser = {
            username: newUsername,
            password: newPassword,
            firstName: newFirstName,
            lastName: newLastName,
            id: (Date.now()) + ''
        }


        users.push(newUser);

        renderUsers(users);
     }
    function findAllUsers() { 
        fetch("https://wbdv-generic-server.herokuapp.com/api/zackmartin/users")
        .then(response => response.json())
        .then(renderUsers)
     }
    function findUserById() {  }
    function deleteUser() { 
        const deleteButton = $(event.currentTarget);
        const userIdToDelete = deleteButton.attr("id");

        users = users.filter(function(user) {
            return user.id != userIdToDelete;
        })

        renderUsers(users);
     }
    function selectUser() {  }
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
            
            $removeBtn = $tr.find(".wbdv-remove");
            $removeBtn.click(deleteUser);
            $removeBtn.attr("id", users[i].id);


            $tbody.append($tr);
        }
    }
})();
