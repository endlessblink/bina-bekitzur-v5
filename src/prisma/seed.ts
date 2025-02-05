import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

async function cleanup() {
  console.log('Cleaning up database...');
  await prisma.tag.deleteMany();
  await prisma.aIModel.deleteMany();
  await prisma.category.deleteMany();
  console.log('Database cleaned');
}

async function main() {
  try {
    console.log('Starting database seeding...');
    
    // Clean up existing data first
    await cleanup();
    
    // Create categories
    console.log('Creating categories...');
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'יצירת תמונות',
          slug: 'image-generation',
          description: 'כלים ליצירת תמונות באמצעות בינה מלאכותית',
        },
      }),
      prisma.category.create({
        data: {
          name: 'יצירת וידאו',
          slug: 'video-generation',
          description: 'כלים ליצירת סרטוני וידאו באמצעות בינה מלאכותית',
        },
      }),
      prisma.category.create({
        data: {
          name: 'יצירה מהירה',
          slug: 'quick-generation',
          description: 'כלים מהירים ליצירת תוכן באמצעות בינה מלאכותית',
        },
      }),
    ]);
    console.log('Categories created');

    // Create models with their associated categories and tags
    console.log('Creating AI models...');
    const models = [
      {
        name: 'GPT-4',
        slug: 'gpt-4',
        description: 'מודל השפה החזק ביותר של OpenAI',
        shortDescription: 'המודל המתקדם ביותר של OpenAI',
        logoUrl: '/images/models/gpt-4.png',
        websiteUrl: 'https://openai.com/gpt-4',
        advantages: ['יכולות שפה מתקדמות', 'הבנה עמוקה של הקשר', 'יכולת פתרון בעיות מורכבות'],
        disadvantages: ['עלות גבוהה', 'מהירות עיבוד איטית יחסית'],
        pricing: { type: 'paid', startingPrice: 0.03, currency: 'USD' },
        hasAPI: true,
        categories: {
          connect: [{ slug: 'quick-generation' }],
        },
        tags: {
          create: [
            { name: 'שפה טבעית' },
            { name: 'כתיבת תוכן' },
            { name: 'תכנות' },
          ],
        },
      },
      {
        name: 'Claude 2',
        slug: 'claude-2',
        description: 'מודל השפה המתקדם של Anthropic',
        shortDescription: 'מודל שפה חזק עם יכולות מגוונות',
        logoUrl: '/images/models/claude-2.png',
        websiteUrl: 'https://www.anthropic.com/claude',
        advantages: ['הקשר ארוך במיוחד', 'יכולות אנליטיות מתקדמות', 'מחיר תחרותי'],
        disadvantages: ['פחות נפוץ מ-GPT-4', 'זמינות מוגבלת'],
        pricing: { type: 'paid', startingPrice: 0.02, currency: 'USD' },
        hasAPI: true,
        categories: {
          connect: [{ slug: 'quick-generation' }],
        },
        tags: {
          create: [
            { name: 'שפה טבעית' },
            { name: 'ניתוח טקסט' },
            { name: 'מחקר' },
          ],
        },
      },
      {
        name: 'DALL-E 3',
        slug: 'dall-e-3',
        description: 'מודל יצירת התמונות המתקדם של OpenAI',
        shortDescription: 'יצירת תמונות איכותיות בקלות',
        logoUrl: '/images/models/dall-e-3.png',
        websiteUrl: 'https://openai.com/dall-e-3',
        advantages: ['איכות תמונה גבוהה', 'הבנת הוראות מורכבות', 'מגוון סגנונות'],
        disadvantages: ['מחיר גבוה', 'הגבלות על תוכן'],
        pricing: { type: 'paid', startingPrice: 0.04, currency: 'USD' },
        hasAPI: true,
        categories: {
          connect: [{ slug: 'image-generation' }],
        },
        tags: {
          create: [
            { name: 'יצירת תמונות' },
            { name: 'עיצוב' },
            { name: 'אומנות' },
          ],
        },
      },
      {
        name: 'Midjourney',
        slug: 'midjourney',
        description: 'כלי יצירת תמונות מתקדם עם דגש על אומנות',
        shortDescription: 'יצירת אומנות דיגיטלית מרהיבה',
        logoUrl: '/images/models/midjourney.png',
        websiteUrl: 'https://www.midjourney.com',
        advantages: ['איכות אומנותית גבוהה', 'קהילה פעילה', 'עדכונים תכופים'],
        disadvantages: ['זמין רק דרך Discord', 'עקומת למידה תלולה'],
        pricing: { type: 'paid', startingPrice: 10, currency: 'USD' },
        hasAPI: false,
        categories: {
          connect: [{ slug: 'image-generation' }],
        },
        tags: {
          create: [
            { name: 'יצירת תמונות' },
            { name: 'אומנות דיגיטלית' },
            { name: 'עיצוב' },
          ],
        },
      },
    ];

    for (const modelData of models) {
      try {
        console.log(`Creating model: ${modelData.name}`);
        await prisma.aIModel.create({
          data: modelData,
        });
        console.log(`Successfully created model: ${modelData.name}`);
      } catch (error) {
        console.error(`Error creating model ${modelData.name}:`, error);
        throw error;
      }
    }
    console.log('AI models created');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('Error in seed script:', error);
    process.exit(1);
  }); 