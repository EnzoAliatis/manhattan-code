"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const employee = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employee", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: {
          args: [5, 32],
          msg: "The name is too short or too long"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 42]
      }
    },
    role: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [2, 3],
      validate: {
        notEmpty: true
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    underscored: true
  });

  Employee.associate = models => {
    Employee.belongsTo(models.User);
  };

  Employee.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return await _bcrypt.default.hash(this.password, saltRounds);
  };

  Employee.prototype.validatePassword = async function (password) {
    return await _bcrypt.default.compare(password, this.password);
  };

  Employee.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });
  return Employee;
};

var _default = employee;
exports.default = _default;