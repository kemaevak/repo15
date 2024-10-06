// Получение пользователей с сервера и их отображение
function fetchUsers() {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => {
        const usersTable = document.getElementById('users-body');
        usersTable.innerHTML = ''; // Очищаем таблицу перед обновлением
        data.forEach(user => {
          usersTable.innerHTML += `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>
                <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Редактировать</button>
                <button onclick="deleteUser(${user.id})">Удалить</button>
              </td>
            </tr>
          `;
        });
      })
      .catch(error => {
        console.error('Ошибка при получении пользователей:', error);
        alert('Ошибка при получении данных.');
      });
  }
  
  // Добавление нового пользователя
  document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    const user = {
      name: name,
      email: email
    };
  
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      fetchUsers(); // Обновляем список пользователей
      document.getElementById('user-form').reset();
    })
    .catch(error => {
      console.error('Ошибка при добавлении пользователя:', error);
      alert('Не удалось добавить пользователя.');
    });
  });
  
  // Редактирование пользователя
  function editUser(id, name, email) {
    const newName = prompt('Введите новое имя', name);
    const newEmail = prompt('Введите новый email', email);
  
    if (newName && newEmail) {
      const updatedUser = {
        name: newName,
        email: newEmail
      };
  
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      })
      .then(response => response.json())
      .then(data => {
        fetchUsers(); // Обновляем список пользователей
      })
      .catch(error => {
        console.error('Ошибка при обновлении пользователя:', error);
        alert('Не удалось обновить пользователя.');
      });
    }
  }
  
  // Удаление пользователя
  function deleteUser(id) {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        fetchUsers(); // Обновляем список пользователей
      })
      .catch(error => {
        console.error('Ошибка при удалении пользователя:', error);
        alert('Не удалось удалить пользователя.');
      });
    }
  }
  
  // При загрузке страницы получаем список пользователей
  window.onload = fetchUsers;
  