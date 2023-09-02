const Sequelize = require('sequelize');
const sequelize = new Sequelize('prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb'
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

(async () => {
  try {
    await sequelize.sync();

    // Array de objetos para los registros a insertar
    const registrosAInsertar = [
      { firstName: 'Joaquin', lastName: 'Mogno' },
      { firstName: 'Lionel', lastName: 'Messi' },
      { firstName: 'Sergio', lastName: 'Aguero' },
    ];

    // Insertar registros
    const inserciones = registrosAInsertar.map(async registro => {
      return await Cars.create(registro);
    });

    // Esperar a que todas las inserciones se completen
    await Promise.all(inserciones);

    console.log("Registros insertados exitosamente.");

    // Eliminar los dos primeros registros
    await Cars.destroy({
      where: {
        lastName: ['Messi', 'Aguero'] 
      }
    });

    console.log("Los registros con apellido Messi y Aguero han sido eliminados.");

  } catch (error) {
    console.error("Error:", error);
  }
})();