const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanup() {
  try {
    // Delete all data in reverse order of dependencies
    console.log('Cleaning up database...');
    
    // Delete all tags
    await prisma.tag.deleteMany();
    console.log('Tags deleted');
    
    // Delete all models
    await prisma.aIModel.deleteMany();
    console.log('Models deleted');
    
    // Delete all categories
    await prisma.category.deleteMany();
    console.log('Categories deleted');
    
    console.log('Database cleanup completed');
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanup(); 