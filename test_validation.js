const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api/auth/register';

async function testValidation() {
    console.log('--- Starting Validation Tests ---');

    // Test 1: Invalid Name (contains numbers)
    console.log('\nTest 1: Invalid Name (User123)');
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'User123', email: 'valid@example.com', password: 'password123' })
        });
        const data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(`Response: ${JSON.stringify(data)}`);
        if (res.status === 400 && data.message === 'Name should only contain letters.') {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }
    } catch (err) {
        console.error('Error:', err);
    }

    // Test 2: Invalid Email
    console.log('\nTest 2: Invalid Email (invalid-email)');
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Valid Name', email: 'invalid-email', password: 'password123' })
        });
        const data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(`Response: ${JSON.stringify(data)}`);
        if (res.status === 400 && data.message === 'Please enter a valid email address.') {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }
    } catch (err) {
        console.error('Error:', err);
    }

    // Test 3: Invalid Password (too short)
    console.log('\nTest 3: Invalid Password (123456)');
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Valid Name', email: 'valid2@example.com', password: '123456' })
        });
        const data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(`Response: ${JSON.stringify(data)}`);
        if (res.status === 400 && data.message === 'Password must be more than 6 characters.') {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }
    } catch (err) {
        console.error('Error:', err);
    }

    // Test 4: Valid Registration
    console.log('\nTest 4: Valid Registration');
    const validEmail = `testuser_${Date.now()}@example.com`;
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Valid Name', email: validEmail, password: 'password123' })
        });
        const data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(`Response: ${JSON.stringify(data)}`);
        if (res.status === 201) {
            console.log('PASS');
        } else {
            console.log('FAIL');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

testValidation();
