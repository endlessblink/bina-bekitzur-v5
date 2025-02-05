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
    icon: 'lni lni-brain',
    logoUrl: 'https://openai.com/favicon.ico',
    websiteUrl: 'https://openai.com',
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
    featured: true,
    tags: ['שפה טבעית', 'כתיבת תוכן', 'תכנות'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'שיחה טבעית',
      'הבנת הקשר',
      'זיכרון שיחה',
      'יצירת תוכן',
      'תמיכה בשפות רבות'
    ],
    technology: {
      language: 'GPT-4',
      framework: 'Transformer',
      specialties: ['NLP', 'Few-shot learning', 'Zero-shot learning']
    },
    rating: {
      overall: 4.8,
      features: 4.9,
      technology: 5.0,
      pricing: 4.5
    }
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'מודל השפה הפופולרי ביותר של OpenAI, מיועד לשיחות ומשימות טקסטואליות',
    shortDescription: 'המודל הפופולרי ביותר של OpenAI',
    icon: 'lni lni-brain',
    logoUrl: 'https://chat.openai.com/favicon.ico',
    websiteUrl: 'https://chat.openai.com',
    advantages: [
      'קל לשימוש',
      'זמין לכולם',
      'יכולות מגוונות',
      'עדכונים תכופים',
    ],
    disadvantages: [
      'מוגבל בהקשר',
      'לא תמיד מדויק',
      'תלוי בזמינות השירות',
      'מוגבל בשפות מסוימות',
    ],
    hasAPI: true,
    pricing: {
      type: 'freemium',
    },
    categories: ['language', 'chat', 'text'],
    subcategories: ['chatbots', 'text_generation'],
    featured: true,
    tags: ['שפה טבעית', 'כתיבת תוכן'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'שיחה טבעית',
      'הבנת הקשר',
      'זיכרון שיחה',
      'יצירת תוכן',
      'תמיכה בשפות רבות'
    ],
    technology: {
      language: 'GPT-4',
      framework: 'Transformer',
      specialties: ['NLP', 'Few-shot learning', 'Zero-shot learning']
    },
    rating: {
      overall: 4.8,
      features: 4.9,
      technology: 5.0,
      pricing: 4.5
    }
  },
  {
    id: 'claude',
    name: 'Claude',
    slug: 'claude',
    description: 'מודל השפה של Anthropic, ידוע ביכולות הניתוח והדיוק שלו',
    shortDescription: 'מודל השפה המדויק של Anthropic',
    icon: 'lni lni-brain',
    logoUrl: 'https://claude.ai/favicon.ico',
    websiteUrl: 'https://claude.ai',
    advantages: [
      'דיוק גבוה',
      'יכולות ניתוח מעמיקות',
      'הקשר ארוך במיוחד',
      'תמיכה במגוון משימות',
    ],
    disadvantages: [
      'זמינות מוגבלת',
      'מהירות עיבוד',
      'מחיר גבוה',
      'הגבלות שימוש',
    ],
    hasAPI: true,
    pricing: {
      type: 'freemium',
    },
    categories: ['language', 'chat', 'text'],
    subcategories: ['chatbots', 'text_generation', 'analysis'],
    featured: true,
    tags: ['שפה טבעית', 'כתיבת תוכן', 'ניתוח'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'הבנה מעמיקה',
      'אתיקה מובנית',
      'יכולת הסבר',
      'עיבוד טקסט ארוך',
      'דיוק גבוה'
    ],
    technology: {
      language: 'Claude 2',
      framework: 'Constitutional AI',
      specialties: ['Safety', 'Long-context', 'Reasoning']
    },
    rating: {
      overall: 4.7,
      features: 4.8,
      technology: 4.9,
      pricing: 4.4
    }
  },
  {
    id: 'gemini',
    name: 'Gemini',
    slug: 'gemini',
    description: 'מודל השפה החדש של Google, משלב יכולות טקסט וראייה',
    shortDescription: 'מודל השפה המתקדם של Google',
    icon: 'lni lni-brain',
    logoUrl: 'https://gemini.google.com/favicon.ico',
    websiteUrl: 'https://gemini.google.com',
    advantages: [
      'יכולות מולטימודליות',
      'אינטגרציה עם שירותי Google',
      'מהירות עיבוד',
      'דיוק גבוה',
    ],
    disadvantages: [
      'זמין חלקית',
      'תלוי בחשבון Google',
      'הגבלות שימוש',
      'חדש יחסית',
    ],
    hasAPI: true,
    pricing: {
      type: 'freemium',
    },
    categories: ['language', 'chat', 'text', 'visual'],
    subcategories: ['chatbots', 'text_generation', 'image_analysis'],
    featured: true,
    tags: ['שפה טבעית', 'כתיבת תוכן', 'ניתוח תמונות'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'יכולות מולטימודליות',
      'אינטגרציה עם שירותי Google',
      'מהירות עיבוד',
      'דיוק גבוה',
      'תמיכה בשפות רבות'
    ],
    technology: {
      language: 'Gemini',
      framework: 'Multimodal',
      specialties: ['Multimodal', 'Google services integration', 'Speed']
    },
    rating: {
      overall: 4.6,
      features: 4.7,
      technology: 4.8,
      pricing: 4.3
    }
  },
  {
    id: 'mistral',
    name: 'Mistral',
    slug: 'mistral',
    description: 'מודל שפה חדשני עם יכולות מרשימות ביחס לגודלו',
    shortDescription: 'מודל שפה חדשני ויעיל',
    icon: 'lni lni-brain',
    logoUrl: 'https://mistral.ai/favicon.ico',
    websiteUrl: 'https://mistral.ai',
    advantages: [
      'ביצועים מעולים',
      'יעילות גבוהה',
      'קוד פתוח',
      'גמישות בשימוש',
    ],
    disadvantages: [
      'חדש יחסית',
      'תמיכה מוגבלת',
      'פחות מוכר',
      'דורש ידע טכני',
    ],
    hasAPI: true,
    pricing: {
      type: 'freemium',
    },
    categories: ['language', 'chat', 'text'],
    subcategories: ['chatbots', 'text_generation'],
    featured: false,
    tags: ['שפה טבעית', 'כתיבת תוכן', 'קוד פתוח'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'ביצועים מעולים',
      'יעילות גבוהה',
      'קוד פתוח',
      'גמישות בשימוש',
      'תמיכה בשפות רבות'
    ],
    technology: {
      language: 'Mistral',
      framework: 'Efficient',
      specialties: ['Efficiency', 'Open source', 'Flexibility']
    },
    rating: {
      overall: 4.5,
      features: 4.6,
      technology: 4.7,
      pricing: 4.4
    }
  },
  {
    id: 'llama',
    name: 'Llama',
    slug: 'llama',
    description: 'מודל השפה הפתוח של Meta, מאפשר שימוש מקומי וגמיש',
    shortDescription: 'מודל השפה הפתוח של Meta',
    icon: 'lni lni-brain',
    logoUrl: 'https://ai.meta.com/favicon.ico',
    websiteUrl: 'https://ai.meta.com/llama',
    advantages: [
      'קוד פתוח',
      'שימוש מקומי',
      'גמישות מלאה',
      'ביצועים טובים',
    ],
    disadvantages: [
      'דורש משאבי מחשוב',
      'התקנה מורכבת',
      'ידע טכני נדרש',
      'תמיכה מוגבלת',
    ],
    hasAPI: false,
    pricing: {
      type: 'free',
    },
    categories: ['language', 'chat', 'text'],
    subcategories: ['chatbots', 'text_generation'],
    featured: false,
    tags: ['שפה טבעית', 'כתיבת תוכן', 'קוד פתוח'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'קוד פתוח',
      'שימוש מקומי',
      'גמישות מלאה',
      'ביצועים טובים',
      'תמיכה בשפות רבות'
    ],
    technology: {
      language: 'Llama',
      framework: 'Open source',
      specialties: ['Open source', 'Local deployment', 'Flexibility']
    },
    rating: {
      overall: 4.5,
      features: 4.6,
      technology: 4.7,
      pricing: 4.9
    }
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description: 'מודל ליצירת תמונות מטקסט, פתוח וגמיש לשימוש',
    shortDescription: 'יצירת תמונות מטקסט בקוד פתוח',
    icon: 'lni lni-paint-bucket',
    logoUrl: 'https://stability.ai/favicon.ico',
    websiteUrl: 'https://stability.ai',
    advantages: [
      'קוד פתוח',
      'גמישות מלאה',
      'שימוש מקומי אפשרי',
      'קהילה פעילה',
    ],
    disadvantages: [
      'דורש משאבי מחשוב',
      'התקנה מורכבת',
      'איכות לא אחידה',
      'ידע טכני נדרש',
    ],
    hasAPI: true,
    pricing: {
      type: 'freemium',
    },
    categories: ['visual', 'art'],
    subcategories: ['image_generation', 'text_to_image'],
    featured: true,
    tags: ['יצירת תמונות', 'אומנות דיגיטלית', 'קוד פתוח'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'יצירת תמונות מטקסט',
      'מודלים מותאמים אישית',
      'קוד פתוח',
      'ריצה מקומית',
      'קהילה פעילה'
    ],
    technology: {
      language: 'SD XL',
      framework: 'Latent Diffusion',
      specialties: ['Open source', 'Custom models', 'Local deployment']
    },
    rating: {
      overall: 4.5,
      features: 4.6,
      technology: 4.8,
      pricing: 4.9
    }
  },
  {
    id: 'dalle',
    name: 'DALL·E',
    slug: 'dalle',
    description: 'מודל ליצירת תמונות מטקסט של OpenAI, ידוע באיכות התוצאות',
    shortDescription: 'יצירת תמונות מטקסט של OpenAI',
    icon: 'lni lni-paint-bucket',
    logoUrl: 'https://openai.com/favicon.ico',
    websiteUrl: 'https://openai.com/dall-e',
    advantages: [
      'איכות תמונה גבוהה',
      'קל לשימוש',
      'אינטגרציה עם ChatGPT',
      'תוצאות מהירות',
    ],
    disadvantages: [
      'מחיר גבוה',
      'הגבלות תוכן',
      'פחות גמיש',
      'זכויות יוצרים',
    ],
    hasAPI: true,
    pricing: {
      type: 'paid',
    },
    categories: ['visual', 'art'],
    subcategories: ['image_generation', 'text_to_image'],
    featured: true,
    tags: ['יצירת תמונות', 'אומנות דיגיטלית'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'יצירת תמונות מטקסט',
      'עריכת תמונות',
      'וריאציות',
      'סגנונות מרובים',
      'רזולוציה גבוהה'
    ],
    technology: {
      language: 'DALL-E 3',
      framework: 'Diffusion',
      specialties: ['Image generation', 'Style transfer', 'Inpainting']
    },
    rating: {
      overall: 4.6,
      features: 4.7,
      technology: 4.8,
      pricing: 4.3
    }
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'כלי ליצירת תמונות אומנותיות באיכות גבוהה',
    shortDescription: 'יצירת תמונות מקצועיות',
    icon: 'lni lni-paint-bucket',
    logoUrl: 'https://www.midjourney.com/favicon.ico',
    websiteUrl: 'https://www.midjourney.com',
    advantages: [
      'איכות אומנותית גבוהה',
      'סגנונות ייחודיים',
      'ממשק דיסקורד',
      'קהילה יצירתית',
      'עדכונים תכופים',
    ],
    disadvantages: [
      'מחיר גבוה',
      'זמינות בדיסקורד בלבד',
      'הגבלות שימוש',
      'זכויות יוצרים',
    ],
    hasAPI: false,
    pricing: {
      type: 'paid',
    },
    categories: ['visual', 'art'],
    subcategories: ['image_generation', 'text_to_image'],
    featured: true,
    tags: ['יצירת תמונות', 'אומנות דיגיטלית'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'איכות אומנותית גבוהה',
      'סגנונות ייחודיים',
      'ממשק דיסקורד',
      'קהילה יצירתית',
      'עדכונים תכופים'
    ],
    technology: {
      language: 'V6',
      framework: 'Custom Diffusion',
      specialties: ['Artistic style', 'Composition', 'Detail']
    },
    rating: {
      overall: 4.7,
      features: 4.8,
      technology: 4.7,
      pricing: 4.2
    }
  },
  {
    id: 'musicgen',
    name: 'MusicGen',
    slug: 'musicgen',
    description: 'מודל ליצירת מוזיקה מתיאור טקסטואלי',
    shortDescription: 'יצירת מוזיקה מקורית',
    icon: 'lni lni-music',
    logoUrl: 'https://huggingface.co/favicon.ico',
    websiteUrl: 'https://huggingface.co/spaces/facebook/MusicGen',
    advantages: [
      'יצירת מוזיקה מקורית',
      'מגוון סגנונות',
      'קוד פתוח',
      'חינמי לשימוש',
    ],
    disadvantages: [
      'איכות לא אחידה',
      'הגבלות אורך',
      'דורש ידע מוזיקלי',
      'מגבלות טכניות',
    ],
    hasAPI: true,
    pricing: {
      type: 'free',
    },
    categories: ['audio'],
    subcategories: ['music_generation', 'text_to_music'],
    featured: false,
    tags: ['מוזיקה', 'אודיו', 'קוד פתוח'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'יצירת מוזיקה מקורית',
      'מגוון סגנונות',
      'קוד פתוח',
      'חינמי לשימוש',
      'תמיכה בשפות רבות'
    ],
    technology: {
      language: 'MusicGen',
      framework: 'Open source',
      specialties: ['Music generation', 'Text-to-music', 'Open source']
    },
    rating: {
      overall: 4.5,
      features: 4.6,
      technology: 4.7,
      pricing: 4.9
    }
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    slug: 'heygen',
    description: 'פלטפורמה ליצירת סרטוני וידאו עם דוברים וירטואליים',
    shortDescription: 'יצירת סרטוני וידאו עם דוברים וירטואליים',
    icon: 'lni lni-video',
    logoUrl: 'https://assets-global.website-files.com/63fdcbe48aa020c0a5493507/63fdcbe48aa020889549350e_favicon.png',
    websiteUrl: 'https://www.heygen.com',
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
    featured: true,
    tags: ['שפה טבעית', 'ניתוח טקסט', 'מחקר'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'איכות וידאו גבוהה',
      'מגוון דוברים וירטואליים',
      'תמיכה בשפות רבות',
      'ממשק ידידותי',
      'תמיכה בסגנונות מגוונים'
    ],
    technology: {
      language: 'HeyGen',
      framework: 'Virtual speakers',
      specialties: ['Video generation', 'Virtual speakers', 'Multilingual support']
    },
    rating: {
      overall: 4.6,
      features: 4.7,
      technology: 4.6,
      pricing: 4.2
    }
  },
  {
    id: 'mubert',
    name: 'Mubert',
    slug: 'mubert',
    description: 'פלטפורמה ליצירת מוזיקה באמצעות AI',
    shortDescription: 'יצירת מוזיקה מקורית',
    icon: 'lni lni-music',
    logoUrl: 'https://mubert.com/favicon.ico',
    websiteUrl: 'https://mubert.com',
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
    featured: true,
    tags: ['יצירת מוזיקה', 'אומנות', 'עיצוב'],
    createdAt: '2024-02-05T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
    features: [
      'יצירת מוזיקה מקורית',
      'מגוון סגנונות',
      'ממשק פשוט לשימוש',
      'אפשרויות ייצוא מגוונות',
      'תמיכה בשפות רבות'
    ],
    technology: {
      language: 'Mubert',
      framework: 'Music generation',
      specialties: ['Music generation', 'Multilingual support', 'Simple interface']
    },
    rating: {
      overall: 4.5,
      features: 4.6,
      technology: 4.5,
      pricing: 4.3
    }
  },
];