const loadUserDetails = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const parent = document.getElementById("user-details");
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${data.id}</th>
            <td>${data.username}</td>
            <td>${data.first_name}</td>
            <td>${data.last_name}</td>
            <td>${data.email}</td>
        `;
        parent.appendChild(row);
    });
};

loadUserDetails();
