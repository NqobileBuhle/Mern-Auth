import express from 'express';
const router = express.Router();

// Example POST route for auth
router.post('/auth', (req, res) => {
    // Add your authentication logic here
    res.send(" message:Auth endpoint working");
});
router.get('/', (req, res) => {
    // Add your authentication logic here
    res.send(" message:Get endpoint working");
});
router.delete('/api/users', (req, res) => {
    // Add your authentication logic here
    res.send(" message:Auth endpoint working");
});


export default router;
