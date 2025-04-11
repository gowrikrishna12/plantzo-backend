const bcrypt = require('bcryptjs');

async function verifyPassword(enteredPassword, hashedPasswordFromDatabase) {
  try {
    const passwordMatch = await bcrypt.compare(enteredPassword, hashedPasswordFromDatabase);
    if (passwordMatch) {
      console.log('Passwords match!');
      return true;
    } else {
      console.log('Passwords do not match.');
      return false;
    }
  } catch (err) {
    console.error('bcrypt.compare() error:', err);
    return false; // Or throw an error, depending on your error handling needs
  }
}

// Example usage:
async function testPasswordVerification() {
  const enteredPassword = 'partner@123'; // Replace with the password you want to test
  const hashedPasswordFromDatabase = '$2b$10$NVfYdvAhPZCaFjVVbGy4be5sNeitLKt694.hOobLt61ZNTSr3Mn7i'; // Replace with the hash from your database

  const isMatch = await verifyPassword(enteredPassword, hashedPasswordFromDatabase);
  console.log("Result of password verification: ", isMatch);

  // If you want to use it in a conditional statement:
  if (isMatch) {
    console.log("Access Granted");
  } else {
    console.log("Access Denied");
  }
}

testPasswordVerification();