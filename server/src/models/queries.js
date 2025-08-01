const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

async function get_all_users() {
    const result = await prisma.user.findMany()
    console.log(result);
}

get_all_users()

async function create_user(user) {
    await prisma.user.create({
        data: user
    })
}

module.exports = {
    get_all_users,
    create_user
}