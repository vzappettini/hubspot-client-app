document.addEventListener("DOMContentLoaded", () => {
  let token = "";

  function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
      token = "mock-token";
      document.getElementById("auth").style.display = "none";
      document.getElementById("main").style.display = "block";
      obtenerContactos();
    } else {
      alert("Usuario/Contraseña incorrectos");
    }
  }

  document.getElementById("login-btn").addEventListener("click", login);

  document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      firstname: document.getElementById("nombre").value,
      lastname: document.getElementById("apellido").value,
      email: document.getElementById("email").value,
    };

    const res = await fetch("/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Contacto creado");
      obtenerContactos();
    } else {
      alert("Error al crear contacto");
    }
  });

  async function obtenerContactos() {
    const res = await fetch("/contacts");
    const contactos = await res.json();

    renderTabla(contactos);
  }

  async function eliminarContacto(id) {
    const res = await fetch(`/contacts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Contacto eliminado");
      obtenerContactos();
    } else {
      alert("Error al eliminar");
    }
  }

  async function buscarPorEmail() {
    const email = document.getElementById("busqueda-email").value.trim();

    if (!email) {
      alert("Por favor, ingresá un email o parte de él");
      return;
    }

    try {
      const res = await fetch(`/contacts/search?q=${email}`);
      if (!res.ok) throw new Error("Error al buscar los contactos");

      const contacts = await res.json();

      if (!contacts.length) {
        alert("No se encontraron contactos");
        return;
      }

      renderTabla(contacts);
    } catch (error) {
      alert(error.message);
    }
  }

  function renderTabla(contactos) {
    const tbody = document.querySelector("#tabla-contactos tbody");
    tbody.innerHTML = "";
  
    contactos.forEach((c) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${c.properties.firstname || ""}</td>
        <td>${c.properties.lastname || ""}</td>
        <td>${c.properties.email || ""}</td>
      `;
  
      const btnTd = document.createElement("td");
  
      // Botón Editar
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.classList.add("editar-btn");
      btnEditar.addEventListener("click", () => abrirModalEditar(c.id));
      btnTd.appendChild(btnEditar);
  
      // Botón Eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.addEventListener("click", () => eliminarContacto(c.id));
      btnTd.appendChild(btnEliminar);
  
      tr.appendChild(btnTd);
      tbody.appendChild(tr);
    });
  }
  async function abrirModalEditar(id) {
    try {
      const res = await fetch(`/contacts/${id}`);
      if (!res.ok) throw new Error("No se pudo obtener el contacto");
  
      const data = await res.json();
  
      // Llenar inputs del modal
      document.getElementById("editar-id").value = data.id;
      document.getElementById("editar-nombre").value = data.properties.firstname || "";
      document.getElementById("editar-apellido").value = data.properties.lastname || "";
      document.getElementById("editar-email").value = data.properties.email || "";
  
      // Mostrar modal
      document.getElementById("modal-editar").style.display = "block";
    } catch (err) {
      alert("Error al cargar contacto para editar");
      console.error(err);
    }
  }
document.getElementById("form-editar").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("editar-id").value;
  const firstname = document.getElementById("editar-nombre").value;
  const lastname = document.getElementById("editar-apellido").value;
  const email = document.getElementById("editar-email").value;

  try {
    const res = await fetch(`/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, email }),
    });

    if (!res.ok) throw new Error("No se pudo actualizar el contacto");

    cerrarModal();
    obtenerContactos();
  } catch (err) {
    alert("Error al actualizar contacto");
    console.error(err);
  }
});

function cerrarModal() {
  document.getElementById("modal-editar").style.display = "none";
  document.getElementById("form-editar").reset();
}
  document.getElementById("buscar-btn").addEventListener("click", buscarPorEmail);
  document.getElementById("mostrar-todos-btn").addEventListener("click", obtenerContactos);
});
