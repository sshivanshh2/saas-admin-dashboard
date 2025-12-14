const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Clear existing users first
  await prisma.user.deleteMany()
  console.log('Cleared existing users')

  // Create users
  const users = [
    {
    id: 1,
    name: 'Aiden Thompson',
    email: 'aiden.thompson@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: new Date('2024-12-05')
  },
  {
    id: 2,
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    role: 'user',
    status: 'active',
      lastLogin: new Date('2024-12-06')
  },
  {
    id: 3,
    name: 'Harpreet Singh',
    email: 'harpreet.singh@example.com',
    role: 'user',
    status: 'active',
      lastLogin: new Date('2024-12-04')
  },
  {
    id: 4,
    name: 'Wei Chen',
    email: 'wei.chen@example.com',
    role: 'user',
    status: 'inactive',
      lastLogin: new Date('2024-11-20')
  },
  {
    id: 5,
    name: 'Arjun Patel',
    email: 'arjun.patel@example.com',
    role: 'user',
    status: 'active',
      lastLogin: new Date('2024-12-06')
  },
  {
    id: 6,
    name: 'Mei Lin',
    email: 'mei.lin@example.com',
    role: 'user',
    status: 'active',
      lastLogin: new Date('2024-12-05')
  },
  {
    id: 7,
    name: 'Gurpreet Kaur',
    email: 'gurpreet.kaur@example.com',
    role: 'user',
    status: 'active',
      lastLogin: new Date('2024-12-03')
  },
  {
    id: 8,
    name: 'Jason McLeod',
    email: 'jason.mcleod@example.com',
    role: 'user',
    status: 'inactive',
      lastLogin: new Date('2024-10-15')
  },
  {
    id: 9,
    name: 'Liang Zhao',
    email: 'liang.zhao@example.com',
    role: 'user',
    status: 'active',
      lastLogin: new Date('2024-12-06')
  },
  {
    id: 10,
    name: 'Shivansh Sharma',
    email: 'shivansh.sharma@example.com',
    role: 'admin',
    status: 'active',
      lastLogin: new Date('2024-12-06')
  }
  ]


  for (const user of users) {
    await prisma.user.create({
      data: user
    })
    console.log(`Created user: ${user.name}`)
  }

  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })