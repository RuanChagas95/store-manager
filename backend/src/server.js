const app = require('./app');
const connection = require('./db/connection');

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await connection.execute('SELECT 1');
    console.log('MySQL connected successfully');
  } catch (err) {
    console.log(err);
    console.error('MySQL connection failed');
  }
  console.log(`Backend do Store Manager escutando na porta ${PORT}`);
});
