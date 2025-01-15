class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar }),
    }).then(this._checkResponse);
  }

  // Método para el inicio de sesión
  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkResponse)
      .then((data) => {
        // Guardar el token de autenticación en el localStorage
        localStorage.setItem("token", data.token);
        return data;
      });
  }

  // Nuevo método para el registro de usuario
  signup({ email, password, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then(this._checkResponse)
      .then((data) => {
        // Puede guardar datos de usuario o el token si es necesario
        return data;
      });
  }

  // Método para verificar si el usuario está autenticado (opcional)
  checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      return Promise.reject("No autenticado");
    }

    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

// Creación de una instancia de la API
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_11", // Cambia esta URL si tu backend es diferente
  headers: {
    authorization: "3a44c865-729d-4c44-80ac-3cd541a265c1", // Token de autorización, cambiar si es necesario
    "Content-Type": "application/json",
  },
  groupId: "web_es_11", // Tu ID de grupo si es necesario
});

export default api;
