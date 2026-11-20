const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());

let registrations = [
    {
        id: 501,
        participantName: "Riya Sharma",
        eventName: "Tech Fest",
        department: "CSE",
        ticketCount: 2,
        paymentStatus: "Paid"
    },
    {
        id: 502,
        participantName: "Arjun Mehta",
        eventName: "Code Sprint",
        department: "IT",
        ticketCount: 1,
        paymentStatus: "Pending"
    },
    {
        id: 503,
        participantName: "Neha Verma",
        eventName: "Tech Fest",
        department: "ECE",
        ticketCount: 3,
        paymentStatus: "Paid"
    }
];


function validateRegistration(data) {
    const { participantName, eventName, department, ticketCount, paymentStatus } = data;

    if (!participantName || typeof participantName !== 'string' || participantName.trim() === '') {
        return "participantName is required and must be a non-empty string.";
    }
    if (!eventName || typeof eventName !== 'string' || eventName.trim() === '') {
        return "eventName is required and must be a non-empty string.";
    }
    if (!department || typeof department !== 'string' || department.trim() === '') {
        return "department is required and must be a non-empty string.";
    }
    if (typeof ticketCount !== 'number' || !Number.isInteger(ticketCount) || ticketCount <= 0) {
        return "ticketCount must be a positive integer.";
    }
    if (paymentStatus !== 'Paid' && paymentStatus !== 'Pending') {
        return "paymentStatus must be either 'Paid' or 'Pending'.";
    }

    return null; 
}


app.get('/api/registrations', (req, res) => {
    res.status(200).json(registrations);
});


app.get('/api/registrations/filter', (req, res) => {
    const { department } = req.query;
    
    if (!department) {
        return res.status(400).json({ message: "Department query parameter is required." });
    }

    const filteredRecords = registrations.filter(
        reg => reg.department.toLowerCase() === department.toLowerCase()
    );

    res.status(200).json(filteredRecords);
});


app.get('/api/registrations/pending', (req, res) => {
    const pendingRecords = registrations.filter(reg => reg.paymentStatus === 'Pending');
    res.status(200).json(pendingRecords);
});


app.get('/api/registrations/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const record = registrations.find(reg => reg.id === id);

    if (!record) {
        return res.status(404).json({ message: `Registration with ID ${id} not found.` });
    }

    res.status(200).json(record);
});


app.post('/api/registrations', (req, res) => {
    const validationError = validateRegistration(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    
    const newId = registrations.length > 0 
        ? Math.max(...registrations.map(r => r.id)) + 1 
        : 501;

    const newRecord = {
        id: newId,
        participantName: req.body.participantName.trim(),
        eventName: req.body.eventName.trim(),
        department: req.body.department.trim(),
        ticketCount: req.body.ticketCount,
        paymentStatus: req.body.paymentStatus
    };

    registrations.push(newRecord);
    res.status(201).json(newRecord);
});


app.put('/api/registrations/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = registrations.findIndex(reg => reg.id === id);

    if (index === -1) {
        return res.status(404).json({ message: `Registration with ID ${id} not found.` });
    }

    const validationError = validateRegistration(req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const updatedRecord = {
        id: id,
        participantName: req.body.participantName.trim(),
        eventName: req.body.eventName.trim(),
        department: req.body.department.trim(),
        ticketCount: req.body.ticketCount,
        paymentStatus: req.body.paymentStatus
    };

    registrations[index] = updatedRecord;
    res.status(200).json(updatedRecord);
});


app.delete('/api/registrations/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = registrations.findIndex(reg => reg.id === id);

    if (index === -1) {
        return res.status(404).json({ message: `Registration with ID ${id} not found.` });
    }

    registrations.splice(index, 1);
    res.status(200).json({ message: `Registration with ID ${id} deleted successfully.` });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
