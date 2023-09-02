const Sequelize = require('sequelize');
const sequelize = new Sequelize('prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



class Cars extends Sequelize.Model {}
Cars.init({
  firstName: Sequelize.STRING,
  lastName:Sequelize.STRING
}, { sequelize, modelName: 'users' });

// Inserción de un registro (un usuario llamado Joaquin Mogno)
(async () => {
  try {
    await sequelize.sync();
    const joaquin = await Cars.create({
      firstName: 'Joaquin',
      lastName: 'Mogno'
    });
    console.log(joaquin.toJSON());

    // Actualización del registro (el usuario pasa a llamarse Lionel Messi)
    const [updatedRowsCount] = await Cars.update({ firstName: 'Lionel', lastName: 'Messi' }, {
      where: {
        firstName: 'Joaquin', // Condición para el firstName
        lastName: 'Mogno' // Condición para el lastName
      }
    });

    if (updatedRowsCount > 0) {
      console.log("Done");
    } else {
      console.log("No se encontraron registros para actualizar.");
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
