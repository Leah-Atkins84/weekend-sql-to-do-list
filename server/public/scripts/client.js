
console.log('JS');
$(document).ready(readyNow);

//----------add click handlers---------
function readyNow() {
    console.log( 'jquery ready' );
    getTasks();
    // add todo button
    $('#add-button').on('click', addToDo); 
    // task completed button  
    $('#taskOut').on('click', '.btn-comp', taskCompleted)
    // delete button
    $('#taskOut').on('click', '.btn-delete', deleteTasks)
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
    $( '#todo-item' ).val('');
    $( '#notes' ).val('');
}// End addToDo





// ---------function-renderTasks--------------
// display array of tasks to the dom
function renderTasks(taskList) {
    //let el =$('#taskOut');
    $('#taskOut').empty();
    for (let i=0; i<taskList.length; i++){
        let task= taskList[i];
        if (task.completed === false){
        //for each todo, append a new row to table
            $('#taskOut').append(`
            <tr data-id=${task.id}>
                <td>${task.todo}</td>
                <td>${task.notes}</td>
                <td>Not Complete
                    <button class="btn-comp">Complete</button>
                </td>
                <td>
                    <button class="btn-delete">Delete</button>
                </td>
            </tr>
            `)
      } else if(task.completed === true){
            $('#taskOut').append(`
            <tr class= "completed-task" data-id=${task.id}>
                <td>${task.todo}</td>
                <td>${task.notes}</td>
                <td >🌈 Completed! 🦄</td>
                <td>
                    <button class="btn-delete">Delete</button>
                </td>
            </tr>
            `)
      }
    }
}// end renderTasks




// --function get tasks-- ajax/get
// refresh will get all tasks from the server and render to the page
function getTasks() {
    // ajax get call to server
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('back from GET',response);
        renderTasks(response);
    }).catch(function (err) {
        console.log(err);
        alert('error getting tasks, see console for details');
    })// end ajax
    
}// end get tasks

// ----function-task completed-- ajax/put
function taskCompleted() {
    console.log('In taskCompleted');
    let id = $(this).closest('tr').data().id
    console.log(id);
    $.ajax({
        type: 'PUT',
        url: `/tasks/${ id }`
    }).then(function (response) {
        console.log('tasks completing', response);
        getTasks();
    }).catch(function (err) {
        alert('put issue')
        console.log(err);
    })
}


//-----function-Delete tasks---ajax/delete----
function deleteTasks() {
    console.log('clicked delete');
    let id = $(this).closest('tr').data().id;
    $.ajax({
      method: 'DELETE',
      url: `/tasks/${id}`
    })
    .then(function (response) {
      console.log('Deleted it', response);
      getTasks();
    }).catch(function (error) {
      console.log('Error deleting', error);
      
    })
  
  }
