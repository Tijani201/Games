module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Games', [
      {
        title: 'Pes 2020',
        genres: 'sport',
        rating: 9,
        likes: 1000,
        year: 2020,
        description:
          'Pro Evolution Soccer known in Japan as Winning Eleven is a series of association football As with the FIFA series PES allows players to perform their own unique goal celebrations',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'NFS',
        genres: 'adventure',
        rating: 6,
        likes: 2000,
        year: 2016,
        description:
          'Need for Speed (NFS) is a racing video game franchise published by Electronic Arts and ... CS1 maint: numeric names: authors list · CS1 maint: archived copy as title · Articles with short',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Call of duty',
        genres: 'action',
        rating: 2,
        likes: 700,
        year: 2000,
        description:
          'Call of Duty is a first-person shooter video game franchise published by Activision. Starting out ... "Travel Overview". Call of Duty®',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'mtk',
        genres: 'action',
        rating: 10,
        likes: 5000,
        year: 1960,
        description:
          'Mortal Kombat is an American media franchise centered on a series of video games, originally ... Mortal Kombat: Deception and Mortal Kombat: Armageddon feature "Konquest", a free-',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'God Of War',
        genres: 'action',
        rating: 44,
        likes: 5040,
        year: 1890,
        description: 'God of war is an actiong game which is very intresting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'nba',
        genres: 'sport',
        rating: 4,
        likes: 200,
        year: 1999,
        description:
          'The National Basketball Association (NBA) is an American mens professional basketball league. It is composed of 30 teams and is one of the four major',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {})
  }
}
