import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env = await load();

const insertUser = async (user) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  const response = await fetch(`${env.XATA_DATABASE_URL}/data?columns=id`, options);
  return response;
}


const fetchAllUsers = async () => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      columns: ["nama", "email", "password"],
      page: { size: 15 }
    })
  };

  try {
    const response = await fetch(`${env.XATA_DATABASE_URL}/query`, options);
    if (!response.ok) {
      throw new Error(`Failed to get users: ${await response.text()}`); // Throw an error with details
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error for handling in the controller
  }
}

const fetchUserById = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };
    const response = await fetch(`${env.XATA_DATABASE_URL}/data/${id}`, options);
  if (!response.ok) {
    throw new Error(`Failed to get user: ${await response.text()}`);
  }
  return response.json();
}


const updateExistingUser = async (id, updateData) => {
  const options = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  };
    const response = await fetch(`${env.XATA_DATABASE_URL}/data/${id}?columns=id`, options);
  return response;
}



const removeUser = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${env.XATA_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };
    const response = await fetch(`${env.XATA_DATABASE_URL}/data/${id}?columns=id`, options);
  return response;
}


export { insertUser, fetchAllUsers, updateExistingUser, fetchUserById, removeUser };
