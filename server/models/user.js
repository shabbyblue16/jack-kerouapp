import { Sequelize } from 'sequelize';

import sequelize from '../db/index.js';

const Rider = sequelize.define('riders', {
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
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.POINT,
  }
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

const Driver = sequelize.define('drivers', {
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
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.POINT,
  },
  car: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  license: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.DECIMAL,
  }
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

export default { Rider, Driver };
