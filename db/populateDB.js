const pool = require('./pool.js');

const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        membership_status TEXT NOT NULL,
        admin_status TEXT NOT NULL
    );

    INSERT INTO users (first_name, last_name, username, password, membership_status, admin_status)
    VALUES ('mihir', 'singh', 'mihirsingh', 'Tennis0817*', 'yes', 'yes');
`
const createSessionsTable = `
  CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL,
    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
  );

  CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
`;

const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS "messages" (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO messages (title, text)
    VALUES ('life is crazy', 'hey everyone, just realized that life is crazy');
`

const createUserMessagesTable = `
    CREATE TABLE IF NOT EXISTS "user_messages" (
        user_id INT REFERENCES users(id),
        message_id INT REFERENCES messages(id),
        PRIMARY KEY (user_id, message_id)
    );
`

async function createTables() {
    try {
        await pool.query(createUserTable);
        await pool.query(createSessionsTable);
        await pool.query(createMessagesTable);
        console.log("tables created in database");
    } catch (err) {
        console.log(err);
    }
}

createTables();

