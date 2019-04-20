import bcrypt from "bcrypt";

const employee = (sequelize, DataTypes) => {
  const Employee = sequelize.define("employee", {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [1,4],
          msg: 'Role out range'
        }
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    underscored: true,
  });

  Employee.associate = models => {
    Employee.belongsTo(models.User)
  }

  Employee.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  Employee.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  Employee.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  return Employee;
};

export default employee;
