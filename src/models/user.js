import bcrypt from 'bcrypt'


const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [5, 32],
          msg: 'The name is too short or too long'
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
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, 
      validate: {
        notEmpty: true
      }
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },{
    underscored: true,
  })

  User.associate = models => {
    User.hasMany(models.Employee, {
      onDelete: 'CASCADE',
    })
  }

  User.prototype.generatePasswordHash = async function () {
    const saltRounds = 10
    return await bcrypt.hash(this.password, saltRounds)
  }

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
  }

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash()
  })

  return User
}

export default user