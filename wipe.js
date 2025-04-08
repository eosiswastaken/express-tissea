import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()





async function main() {
  const deleteCategories = prisma.category.deleteMany()
  const deleteStops = prisma.stop.deleteMany()
  const deleteLines = prisma.line.deleteMany()
    const deleteUsers = prisma.user.deleteMany()

    await prisma.$transaction([deleteLines,deleteStops,deleteCategories,deleteUsers])
  }
  

// async function main() {
//     const getProducts = await prisma.product.findMany()
//     console.log(getProducts)
// }

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })