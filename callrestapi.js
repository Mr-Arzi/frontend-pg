var url = "http://localhost:8080/api/users";
//var url = "https://restapi-mrarzi.onrender.com/api/users";

function postUser() {
	const myId = $('#userId').val();
	const myName = $('#name').val();
	const myEmail = $('#email').val();
	const myAge = $('#age').val();
	const myComments = $('#comments').val();
  
	const myuser = {
	  name: myName,
	  email: myEmail,
	  age: myAge,
	  comments: myComments
	};
  
	if (myId) {
	  // UPDATE
	  $.ajax({
		url: `${url}/${myId}`,
		type: 'PUT',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(myuser),
		success: function (data) {
		  alert("Usuario actualizado correctamente.");
		  resetForm();
		  getUsers();
		},
		error: function () {
		  alert("Error al actualizar.");
		}
	  });
	} else {
	  // CREATE
	  $.ajax({
		url: url,
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(myuser),
		success: function (data) {
		  alert("Usuario creado correctamente.");
		  resetForm();
		  getUsers();
		},
		error: function () {
		  alert("Error al crear.");
		}
	  });
	}
  }
  

function getUsers() {
    console.log(url);

    $.getJSON(url, 
	    function(json) {
        console.log(json);

        var arrUsers = json.users;

        var htmlTableUsers = '<table border="1">';

        arrUsers.forEach(function(item) {
            console.log(item);
            htmlTableUsers += `<tr>
  <td>${item.id}</td>
  <td>${item.name}</td>
  <td>${item.email}</td>
  <td>${item.age}</td>
  <td>${item.comments}</td>
  <td>
    <button onclick="editUser(${item.id})">Editar</button>
    <button onclick="deleteUser(${item.id})">Eliminar</button>
  </td>
</tr>`;

        });

        htmlTableUsers += '</table>';

        $('#resultado').html(htmlTableUsers);
    });	
}

function deleteUser(id) {
	if (confirm(`¿Estás seguro de eliminar el usuario con ID ${id}?`)) {
	  $.ajax({
		url: `${url}/${id}`,
		type: 'DELETE',
		success: function (res) {
		  alert(`Usuario ${id} eliminado correctamente.`);
		  getUsers(); // refrescar lista
		},
		error: function (err) {
		  alert('Error al eliminar usuario');
		  console.error(err);
		}
	  });
	}
  }

  function editUser(id) {
	// Buscar datos del usuario desde la lista actual
	$.getJSON(`${url}`, function (res) {
	  const user = res.users.find(u => u.id === id);
	  if (user) {
		$('#name').val(user.name);
		$('#email').val(user.email);
		$('#age').val(user.age);
		$('#comments').val(user.comments);
		$('#userId').val(user.id); // Campo oculto para saber si es update
		$('#submitBtn').text('Actualizar');
	  }
	});
  }

  function resetForm() {
	$('#name').val('');
	$('#email').val('');
	$('#age').val('');
	$('#comments').val('');
	$('#userId').val('');
	$('#submitBtn').text('Guardar');
  }
  

