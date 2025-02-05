import { AIModel, Category, Tag } from '../types/models';

export const categories: Category[] = [
  { 
    id: 'language',
    name: 'מודל שפה',
    slug: 'language',
  },
  {
    id: 'chat',
    name: 'שיחה',
    slug: 'chat',
  },
  {
    id: 'text',
    name: 'טקסט',
    slug: 'text',
  },
  {
    id: 'code',
    name: 'קוד',
    slug: 'code',
  },
  {
    id: 'audio',
    name: 'שמע',
    slug: 'audio',
  },
  {
    id: 'visual',
    name: 'ויזואלי',
    slug: 'visual',
  },
  {
    id: '3d',
    name: 'תלת מימד',
    slug: '3d',
  },
  {
    id: 'art',
    name: 'אומנות',
    slug: 'art',
  }
];

export const tags: Tag[] = [
  { id: 'tag_01', name: 'שפה טבעית' },
  { id: 'tag_02', name: 'כתיבת תוכן' },
  { id: 'tag_03', name: 'תכנות' },
  { id: 'tag_04', name: 'ניתוח טקסט' },
  { id: 'tag_05', name: 'מחקר' },
  { id: 'tag_06', name: 'יצירת תמונות' },
  { id: 'tag_07', name: 'עיצוב' },
  { id: 'tag_08', name: 'אומנות' },
  { id: 'tag_09', name: 'אומנות דיגיטלית' },
];

export const models: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    slug: 'gpt-4',
    description: 'מודל השפה המתקדם ביותר של OpenAI, בעל יכולות מתקדמות בכתיבה, ניתוח וקידוד',
    shortDescription: 'המודל המתקדם ביותר של OpenAI',
    advantages: [
      'יכולת שפה מתקדמת',
      'תמיכה בהקשר ארוך',
      'הבנה עמוקה של תוכן',
      'יכולות קידוד מתקדמות',
    ],
    disadvantages: [
      'עלות גבוהה',
      'זמני תגובה איטיים',
      'הגבלות על תוכן',
      'נדרש חשבון מאושר',
    ],
    hasAPI: true,
    pricing: {
      type: 'paid',
    },
    categories: ['language', 'chat', 'text', 'code'],
    subcategories: ['text_to_speech', 'chatbots', 'text_generation', 'code_generation'],
    tags: ['שפה טבעית', 'כתיבת תוכן', 'תכנות'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    slug: 'heygen',
    description: 'פלטפורמה ליצירת סרטוני וידאו עם דוברים וירטואליים',
    shortDescription: 'יצירת סרטוני וידאו עם דוברים וירטואליים',
    advantages: [
      'איכות וידאו גבוהה',
      'מגוון דוברים וירטואליים',
      'תמיכה בשפות רבות',
      'ממשק ידידותי',
    ],
    disadvantages: [
      'מחיר גבוה',
      'הגבלות על אורך הסרטונים',
      'אפשרויות התאמה מוגבלות',
    ],
    hasAPI: true,
    pricing: {
      type: 'paid',
    },
    categories: ['audio', 'visual'],
    subcategories: ['video', 'lip_sync'],
    tags: ['שפה טבעית', 'ניתוח טקסט', 'מחקר'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'כלי מתקדם ליצירת תמונות באיכות גבוהה',
    shortDescription: 'יצירת תמונות מקצועיות',
    advantages: [
      'איכות תמונה גבוהה',
      'תמיכה בסגנונות מגוונים',
      'קהילה פעילה',
      'עדכונים תכופים',
    ],
    disadvantages: [
      'מחיר גבוה',
      'זמן עיבוד ארוך',
      'ממשק דיסקורד בלבד',
      'אין API רשמי',
    ],
    hasAPI: false,
    pricing: {
      type: 'paid',
    },
    categories: ['visual', 'art'],
    subcategories: ['image', 'art_generation'],
    tags: ['יצירת תמונות', 'אומנות דיגיטלית', 'עיצוב'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
  },
  {
    id: 'mubert',
    name: 'Mubert',
    slug: 'mubert',
    description: 'פלטפורמה ליצירת מוזיקה באמצעות AI',
    shortDescription: 'יצירת מוזיקה מקורית',
    advantages: [
      'יצירת מוזיקה מקורית',
      'מגוון סגנונות',
      'ממשק פשוט לשימוש',
      'אפשרויות ייצוא מגוונות',
    ],
    disadvantages: [
      'מחיר גבוה',
      'הגבלות על אורך היצירות',
      'איכות לא אחידה',
    ],
    hasAPI: true,
    pricing: {
      type: 'freemium',
    },
    categories: ['audio', 'art'],
    subcategories: ['music', 'art_generation'],
    tags: ['יצירת מוזיקה', 'אומנות', 'עיצוב'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
  },
];