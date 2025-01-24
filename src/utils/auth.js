const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// Guardar el token en localStorage
const saveToken = (token) => {
  localStorage.setItem("jwt", token);
};

// Obtener el token desde localStorage
const getToken = () => {
  return localStorage.getItem("jwt");
};

// Eliminar el token de localStorage
export const removeToken = () => {
  localStorage.removeItem("jwt");
};

// Función para registrar un usuario
export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((errorData) => {
          throw new Error(errorData.message || "Error al registrarse");
        });
      }
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        saveToken(data.token);
      }
      return data;
    })
    .catch((err) => {
      console.error("Error en signup:", err);
      throw err;
    });
};

// Función para iniciar sesión
export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al iniciar sesión");
      }
      return res.json();
    })
    .then((data) => {
      if (data.token) {
        saveToken(data.token);
      }
      return data;
    });
};

// Verificar el token actual
export const checkToken = () => {
  const token = getToken();
  if (!token) {
    throw new Error("No hay token disponible");
  }

  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Token inválido");
    }
    return res.json();
  });
};
