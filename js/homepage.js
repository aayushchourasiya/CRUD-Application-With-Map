var usersP = document.getElementById("usersP");
var table = document.getElementById("table")
var allUsers = ""
var allUsersObj = []
if(localStorage.getItem("UsersMap")!==null && localStorage.getItem("UsersMap")!=="[]"){

    //usersP.innerHTML = "All Users:"
    allUsers = localStorage.getItem("UsersMap")//getting key from local storage
    allUsersObj = JSON.parse(allUsers)//parsing it to json object and storing in array
    var table= document.getElementById("table")
    
    //using map
    var myArr = allUsersObj.map(mainFunction)

    function mainFunction(item, index){
            var buttonRow = "<td><input type='button' value = 'Edit' id = 'editbutton" + index +"'data-bs-toggle = 'modal' data-bs-target = '#staticBackdrop' onclick='passValue(this.id)' class = 'btn btn-warning'</td>"
            var deleteRow = "<td><input type='button' value = 'Delete' id = 'deletebutton" + index + "'onclick='deleteFunction(this.id)' class = 'btn btn-dark'</td>"
            return "<tr><td>" + item.fname + "</td><td>" + item.lname + "</td>"+ buttonRow + "</td>" + "<td>" + deleteRow + "</td></tr>"
    }
    console.log(myArr)

    myArr.map(obj => {

        return table.innerHTML = table.innerHTML + obj
    })

}
else{
    usersP.innerHTML = "No Users in Database. Please Sign Up first!"
}

function editFunction(){
    var buttonId = this.id
    var i = buttonId.split("n").pop()
    //setting this in local storage for retrieving index of element on another page
    localStorage.setItem("EditItems" , i)
    //opening new window for editing
    var openWindow = window.open("editdetails.html","","width=400,height=400")
}
//passing clicked_id in function because passing this.id to get id in attribute
function deleteFunction(clicked_id){
    //deleting the row from the array
    var buttonId = clicked_id
    var i = buttonId.split("n").pop()//spliting string into array from letter n and the using pop
    //to, which will delete the last part of array, but here we will store the last part of array
    //in our variable i which means the number will will act as index
    
    //Using perviously declared array allUsersObj here
    allUsersObj.splice(i,1)
    //deleting the previous values from local storage
    localStorage.removeItem("UsersMap")
    //saving updated values in local storage
    localStorage.setItem("UsersMap" , JSON.stringify(allUsersObj))
    //reloading page
    location.reload()
}

//function for getting value of id
var buttonIdpassValue//making global to use it in editData() function
//passing clicked_id in function because passing this.id to get id in attribute
function passValue(clicked_id){
    buttonIdpassValue = clicked_id
    var i = buttonIdpassValue.split("n").pop()//spliting string into array from letter n and the using pop
    //to, which will delete the last part of array, but here we will store the last part of array
    //in our variable i which means the number will will act as index
    
    //showing this value in the email field of bootstrap modal
    var emailEditField = document.getElementById("emailEdit")
    var fnameEditField = document.getElementById("fnameEdit")
    var lnameEditField = document.getElementById("lnameEdit")
    
    var getEmailId = allUsersObj[i].email
    var getfName = allUsersObj[i].fname
    var getlName = allUsersObj[i].lname

    emailEditField.value = getEmailId
    fnameEditField.value = getfName
    lnameEditField.value = getlName
}

//code for editing details
//function for edit details
function editData(){
    var userDataJson = allUsersObj
    
    var userDataPosition = buttonIdpassValue.split("n").pop()//same as used in passValue() function

    var emailOfUser = document.getElementById("emailEdit").value; 
    var editfname = document.getElementById("fnameEdit")
    var editlname = document.getElementById("lnameEdit")
    var editpass = document.getElementById("passwordEdit")
    
    //deleting the values present at the index, which we want to edit
    //this will show null in array at that position
    delete userDataJson[userDataPosition]

    //storing new values with old email to this variable
    var updatedDetails = {"email":emailOfUser , "password":editpass.value , "fname":editfname.value , "lname":editlname.value}

    //storing the new values in array at the same position, in which we deleted in line 14, it will replace null
    userDataJson[userDataPosition] = updatedDetails
    
    //removing this to save it again with new array values
    localStorage.removeItem("UsersMap")

    //saving it again with new values
    localStorage.setItem("UsersMap" , JSON.stringify(userDataJson))

}