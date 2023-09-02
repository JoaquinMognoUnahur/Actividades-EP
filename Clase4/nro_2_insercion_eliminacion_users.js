//2) inserción y eliminación de un registro. 

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
  lastName: Sequelize.STRING
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

    // Eliminar el usuario con id 10
    Cars.destroy({
      where: {
        id: 10
      }
    })
    .then(() => {
      console.log("Registro eliminado");
    })
    .catch(err => {
      console.error("Error al eliminar el registro:", err);
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();
