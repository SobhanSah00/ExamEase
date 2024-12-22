const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle form submission
app.post('/submit-form', upload.fields([{ name: 'resume' }, { name: 'photo' }]), (req, res) => {
    const formData = req.body;
    const files = req.files;
    console.log('Form Data:', formData);
    console.log('Uploaded Files:', files);
    res.send('Form submitted successfully!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
