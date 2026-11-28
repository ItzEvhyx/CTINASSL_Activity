const router = require('express').Router();
const User = require('../model/userModel');
 
// Create a new user
router.post('/', async (req, res) => {
    try {
        const { email, name, password } = req.body || {};
 
        const missing = [];
        if (!email) missing.push('email');
        if (!name) missing.push('name');
        if (!password) missing.push('password');
        if (missing.length > 0) {
            return res.status(400).json({
                message: 'Missing required fields',
                missing
            });
        }
 
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists', success: false });
        }
 
        const newUser = new User({ email, name, password });
 
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Read all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Read a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body || {};
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (email !== undefined) updates.email = email;
        if (password !== undefined) updates.password = password;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { returnDocument: 'after', runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

module.exports = router;