const db = require('../db/db');

class ContactRepository {
    async Email(email){
        try {
            const rows = await db.query(
              `SELECT * FROM users WHERE email = $1`,
              [email]
            );
            if (rows.rows.length > 0) {
              return true
            } else {   
              return false;
            }
          } catch (err) {
            console.error(err);
            throw err; 
          }
    };
    async Register({email, password}){
      try {
        const { rows } = await db.query(
          `
          INSERT INTO users(email, password)
          VALUES ($1, $2)
          RETURNING *
          `,
          [email, password]
        );
        return rows;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
}

module.exports = new ContactRepository();