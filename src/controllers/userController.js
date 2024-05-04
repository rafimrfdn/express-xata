import User from '../models/user.js';
import { insertUser, fetchAllUsers, updateExistingUser, fetchUserById, removeUser } from '../services/xataService.js';

const createUser = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    const user = new User(nama, email, password);

    const response = await insertUser(user);
    if (response.ok) {
      // res.json({ message: 'User created successfully!', userId: response.id });
      res.redirect("userAll");
    } else {
      console.error('Error creating user:', await response.json());
      res.status(response.status).json({ message: 'An error occurred.' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    return res.render('userAll', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).render('error', { message: 'Internal server error.' });
  }
};

const getUserForUpdate = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await fetchUserById(id);
    if (user) {
      res.render('update-user', { user });
    } else {
      res.status(404).render('error', { message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).render('error', { message: 'Internal server error.' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email } = req.body;
    const updateData = { nama, email };

    const response = await updateExistingUser(id, updateData);
    if (response.ok) {
      // res.send(`Data with id ${id} successfully updated with name: ${nama} and email: ${email}`);
      // res.send(`Data berhasil diedit`);
      res.send(`Data berhasil diedit. <a hx-get="/users/all" hx-target="#mytable" >Reload table</a>`);
    } else {
      console.error('Error updating user:', await response.text());
      res.status(response.status).json({ message: 'An error occurred.' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await removeUser(id);
    if (response.ok) {
      // res.json({ message: 'User deleted successfully!' });
      res.json();
    } else {
      console.error('Error deleting user:', await response.json());
      res.status(response.status).json({ message: 'An error occurred.' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export { createUser, getAllUsers, getUserForUpdate, updateUser, deleteUser };
