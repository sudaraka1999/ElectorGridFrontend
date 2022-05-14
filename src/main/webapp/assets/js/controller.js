$(document).ready(function (){

   //load table data on page load
   loadUsers();

   /**
    * save or update user details when save button clicked
    */
   $('.btn-save').on('click', function (){

      let from_data = {};
      from_data.userID = $("#txtUserId").val()
      from_data.name = $("#txtName").val()
      from_data.phone = $("#txtContact").val()
      from_data.email = $("#txtEmail").val()
      from_data.password = $("#txtPassword").val()

      //identifying request type based on button text
      const reqType = $('.btn-save').text() === 'Save' ? 'POST' : 'PUT'

      $.ajax({
         type: reqType,
         url: "webapi/users/user",
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         data: JSON.stringify(from_data),
         success: function (data) {

            resetForm()

            //reload table
            loadUsers()

            alert("User details saved successfully");
         },
         error: function (e) {
            alert("Something went wrong while saving data!");
         }
      });


   })

   /**
    * load user details when edit button clicked
    */
   $('#tblUsers').on('click', '.btn-edit' ,function (){

      const id = $(this).attr('id')

      $.ajax({
         type: 'GET',
         url: `webapi/users/user/${id}`,
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         success: function (data) {
            if(data){
               $("#txtName").val(data.name);
               $("#txtEmail").val(data.email);
               $("#txtPassword").val(data.password);
               $("#txtContact").val(data.phone);
               $("#txtUserId").val(data.userID);

               //change button text
               $('.btn-save').text('Update')

               //reload table
               loadUsers()

            }else {
               alert("User details not found!")
            }
         },
         error: function (e) {
            alert("Something went wrong while retrieving data!");
         }
      });
   })

   /**
    * delete selected user details when delete button clicked
    */
   $('#tblUsers').on('click', '.btn-delete' ,function (){

      const id = $(this).attr('id')

      $.ajax({
         type: 'DELETE',
         url: `webapi/users/user/${id}`,
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         success: function (data) {
            alert("User details deleted successfully")

            //clear form
            resetForm()

            //reload table
            loadUsers()

         },
         error: function (e) {
            alert("Something went wrong while deleting data!");
         }
      });
   })

   //clear form
   function  resetForm(){
      $("#txtName").val(null);
      $("#txtEmail").val(null);
      $("#txtPassword").val(null);
      $("#txtContact").val(null);
      $("#txtUserId").val(null);

      //change button text
      $('.btn-save').text('Save')

   }

   /**
    * populate table data
    */
   function loadUsers(){
      $.ajax({
         type: 'GET',
         url: "webapi/users",
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         success: function (data) {
            $('tbody#tblUsersBody').empty()
            if (data !== null){

               const users = data

               //loop through data list and populate table body
               for(i in users){
                  $('tbody#tblUsersBody').append(
                      `<tr>
                           <td>${users[i].name}</td>
                           <td>${users[i].email}</td>
                           <td>${users[i].phone}</td>
                           <td>
                             <span class="badge bg-warning text-dark btn-edit" id="${users[i].userID}" style="cursor: pointer;">Edit</span>
                             <span class="badge bg-danger btn-delete" id="${users[i].userID}" style="cursor: pointer;">Delete</span>
                           </td>
                       </tr>`
                  )
               }

            }else{
               `<tr>
                  <td colspan="4">Data Not found</td>                  
               </tr>`
            }
         },
         error: function (e) {
            alert("Something went wrong while loading table data!");
         }
      });
   }

});