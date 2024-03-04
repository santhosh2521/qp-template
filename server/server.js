import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';

const app = express();

// Global variable to store course coordinator details
let courseCoordinatorDetails = null;
let teachercomparator = null;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'maths_el',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error: ', err);
  } else {
    console.log('Connected to the database');
  }
});

// Endpoint to handle data from the client and update the database
app.post('/create-template', (req, res) => {
  const { academicyear, subject, semester, department, ext } = courseCoordinatorDetails;

  // Assuming req.body is an array of objects representing rows of data
  const templateData = req.body;

  const dbName = `${academicyear}_${subject}_${semester}_${department}_${ext}`;

  const dbForCoordinator = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: dbName,
  });

  dbForCoordinator.connect((err) => {
    if (err) {
      console.error('Database connection error: ', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    const createTableSql = `
      CREATE TABLE IF NOT EXISTS templates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        questionNumber TEXT,
        subpart TEXT,
        maxMarks TEXT,
        coNumber TEXT,
        btNumber TEXT
      )
    `;

    dbForCoordinator.query(createTableSql, (err) => {
      if (err) {
        console.error('Error creating table:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      // Use a loop to insert each row of data
      const insertSql = 'INSERT INTO templates (questionNumber, subpart, maxMarks, coNumber, btNumber) VALUES ?';
      const values = templateData.map((row) => [
        row.questionNumber,
        row.subpart,
        row.maxMarks,
        row.coNumber,
        row.btNumber,
      ]);

      dbForCoordinator.query(insertSql, [values], (err) => {
        if (err) {
          console.error('Error inserting data into the table:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        res.json({ success: true, message: 'Template created successfully' });
      });
    });
  });
});

app.post('/tdatabase', (req, res) => {
  // Store course coordinator details in the global variable
  teachercomparator = req.body;
  console.log(teachercomparator)
});

app.get('/template-data', (req, res) => {
  // Assuming you have a table named 'templates' in the database
  const { academicyear, subject, semester, department, ext } = teachercomparator;

  const dbForteacher= `${academicyear}_${subject}_${semester}_${department}_${ext}`;

  const dbteach = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: dbForteacher,
  });

  const sql = 'SELECT * FROM templates';

  dbteach.query(sql, (err, data) => {
    if (err) {
      console.error('Error fetching template data:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    res.json(data);
  });
});


app.post('/update-obtained-marks', (req, res) => {

  const { academicyear, subject, semester, department, ext } = teachercomparator;

  const dbForteacher= `${academicyear}_${subject}_${semester}_${department}_${ext}`;

  const dbteach = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: dbForteacher,
  });
  const { obtainedMarks } = req.body;

  // Assuming you have a table named 'templates' in the database
  const createColumnSql = `
    ALTER TABLE templates
    ADD COLUMN IF NOT EXISTS obtainedMarks INT
  `;

  // Create the 'obtainedMarks' column if it doesn't exist
  dbteach.query(createColumnSql, (err) => {
    if (err) {
      console.error('Error creating column:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    // Update the 'obtainedMarks' column with the obtained marks
    Object.entries(obtainedMarks).forEach(([questionNumber, marks]) => {
      const updateMarksSql = `
        UPDATE templates
        SET obtainedMarks = ?
        WHERE id = ?
      `;

      dbteach.query(updateMarksSql, [marks, questionNumber], (err) => {
        if (err) {
          console.error('Error updating obtained marks:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }
      });
    });

    res.json({ success: true, message: 'Obtained marks updated successfully' });
  });
});




// Endpoint to handle data from the client and create a new database
app.post('/create-database', (req, res) => {
  // Store course coordinator details in the global variable
  courseCoordinatorDetails = req.body;

  const { academicyear, subject, semester, department, ext } = req.body;
  const dbName = `${academicyear}_${subject}_${semester}_${department}_${ext}`;

  // Check if the database already exists
  db.query(`SHOW DATABASES LIKE '${dbName}'`, (error, results) => {
    if (error) {
      console.error('Database query error: ', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    } else if (results.length === 0) {
      // Database does not exist, create it
      db.query(`CREATE DATABASE ${dbName}`, (creationError) => {
        if (creationError) {
          console.error('Database creation error: ', creationError);
          return res.status(500).json({ success: false, message: 'Database creation error' });
        } else {
          console.log('Database created successfully');
          return res.json({ success: true, message: 'Database created successfully' });
        }
      });
    } else {
      console.log('Database already exists');
      return res.status(400).json({ success: false, message: 'Database already exists' });
    }
  });
});

// ...


// ...

app.post('/login', async (req, res) => {
  const sql = 'SELECT * FROM signup WHERE email = ?';
  db.query(sql, [req.body.email], (err, data) => {
    console.log(data);
    if (err) return res.json({ Error: "Login error in server" });
    if (data.length > 0) {
      console.log("password entered", req.body.password)
      console.log("password in db", data[0].password)
      if (req.body.password != data[0].password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      if (req.body.password == data[0].password) {
        // Include the role in the login response
        res.json({
          success: true,
          message: 'Login successful',
          redirect: '/home',
          role: data[0].role,
        });
      } else {
        return res.json({ Error: "Login error in server" });
      }

    }
    else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// Define your API endpoints for handling signup, login, etc.
app.post('/signup', (req, res) => {
  const { fname, lname, email, dob, phoneno, password, role } = req.body;

  // Check if the email is already registered
  db.query('SELECT * FROM signup WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Database query error: ', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      // Email is already registered
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    // If email is not registered, proceed with user registration
    db.query('INSERT INTO signup (fname, lname, email, dob, phoneno, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fname, lname, email, dob, phoneno, password, role], (error) => {
        if (error) {
          console.error('Database query error: ', error);
          return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // User registration successful
        res.json({ success: true, message: 'User signed up successfully' });
      });
  });
});

// Start the server
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
