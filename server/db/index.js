import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('kerouapp', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    timestamps: false
  }
});

export default sequelize;
