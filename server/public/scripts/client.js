console.log('JS');
$(document).ready(readyNow);



//----------add click handlers---------
function readyNow() {
    console.log( 'jquery ready' );
    // add todo button
    $('#add-button').on('click', addToDo); 
    getTasks();
// delete button
// task completed button  
    
}// end readyNow

// ----add todo -----
//--function addToDo-- add task to database--ajax/post
function addToDo() {
// get user input and package as object
    let objectToSend= {
        todo: $( '#todo-item' ).val(),
        notes: $( '#notes' ).val()
    }//end objectToSend
    console.log( 'in addToDo' );
    //send to server
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: objectToSend
    }).then(function (response) {
        console.log('back from post with:', response);
        getTasks();
    }).catch(function (err) {
        alert( 'error adding todo')
        console.log(err);
    })
}// End addToDo





// ---------function-renderTasks--------------
// display array of tasks to the dom
// for each task add a new row to table





// --function get tasks-- ajax/get
// refresh will get all tasks from the server and render to the page
function getTasks() {
    // ajax get call to server
    $.ajax({
        type: 'GET',
        url: '/tasks',
    }).then(function (response) {
        console.log('back from GET',response);
    }).catch(function (err) {
        console.log(err);
        alert('error getting tasks, see console for details');
    })// end ajax
    
}// end get tasks



//-----function-Delete tasks---ajax/delete----

// ----function-task completed-- ajax/put