// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = `https://notes-api.dicoding.dev/v1`;

const API = {
  Login: `${BASE_URL}/login`,
  Register: `${BASE_URL}/register`,
  Notes: `${BASE_URL}/notes`,
}

export async function loginUser(data) {
  try {
    const response = await axios.post(API.Login, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function registerUser (data) {
  try {
    const response = await axios.post(API.Register, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getActiveNotes(Token) {
  try {
    const response = await axios.get(API.Notes, {
      headers: {
        Authorization: `Bearer ${Token}`,
      }
    });
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getArchivedNotes(Token) {
  try {
    const response = await axios.get(API.Notes + '/archived', {
      headers: {
        Authorization: `Bearer ${Token}`,
      }
    });
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function addUserNote(data) {
  const bodyData = {title: data.title, body: data.body}
  try {
    const response = await axios.post(API.Notes, bodyData, {
      headers: {
        Authorization: `Bearer ${data.Token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteUserNote(Token, id) {
  try {
    const response = await axios.delete(API.Notes + '/' + id, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function archiveUserNote(Token, id) {
  try {
    const response = await axios.post(`${API.Notes}/${id}/archive`,null, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function unarchiveUserNote(Token, id) {
  try {
    const response = await axios.post(`${API.Notes}/${id}/unarchive`,null, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getNoteDetail(Token, id) {
  try {
    const response = await axios.get(API.Notes + `/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      }
    });
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
}
