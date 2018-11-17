'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        index: true
      },
      recieverId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        index: true
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING(153)
      },
      status: {
        allowNull: true,
        defaultValue: 'pending',
        type: Sequelize.ENUM(['pending', 'sent'])
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      }
    })
    await Promise.all(['senderId', 'recieverId']
      .map(id => queryInterface.addConstraint(
        'public.Sms',
        [id],
        {
          type: 'FOREIGN KEY',
          name: `sms_${id}_fkey`,
          references: {
            table: 'Contacts',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      )))
    await queryInterface.sequelize
      .query(`COMMENT ON TABLE "Sms" IS E'@name ShortMessages';`)
  },
  down: queryInterface => queryInterface.dropTable('Sms')
}
