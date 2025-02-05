const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    // Test database connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connected successfully');

    // Create a test category
    console.log('Creating test category...');
    const category = await prisma.category.create({
      data: {
        name: 'Test Category',
      },
    });
    console.log('Test category created:', category);

    console.log('Test completed successfully');
  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 