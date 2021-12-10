import { Sequelize } from 'sequelize';

import sequelize from '../db/index.js';

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // createdAt: {
  //   field: 'created_at',
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW
  // },
  // updatedAt: {
  //   field: 'updated_at',
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW,
  // },
});

export default User;
