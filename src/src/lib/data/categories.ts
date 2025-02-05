import {
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  VideoCameraIcon,
  CubeIcon,
  PaintBrushIcon,
} from '@heroicons/react/24/outline';
import { OpenAI } from '@lobehub/icons';

export const categories = [
  { 
    id: 'language',
    name: 'מודל שפה',
    icon: OpenAI,
    subcategories: ['שיחה', 'תרגום', 'סיכום', 'כתיבה']
  },
  {
    id: 'chat',
    name: 'שיחה',
    icon: ChatBubbleBottomCenterTextIcon,
    subcategories: ['צ\'אטבוט', 'עוזר אישי', 'תמיכה']
  },
  {
    id: 'text',
    name: 'טקסט',
    icon: DocumentTextIcon,
    subcategories: ['עריכה', 'תיקון', 'המרה']
  },
  {
    id: 'code',
    name: 'קוד',
    icon: CodeBracketIcon,
    subcategories: ['השלמת קוד', 'דיבאגינג', 'המרת קוד']
  },
  {
    id: 'audio',
    name: 'שמע',
    icon: MusicalNoteIcon,
    subcategories: ['מוזיקה', 'דיבור לטקסט', 'טקסט לדיבור']
  },
  {
    id: 'visual',
    name: 'ויזואלי',
    icon: VideoCameraIcon,
    subcategories: ['עריכת תמונות', 'יצירת תמונות', 'וידאו']
  },
  {
    id: '3d',
    name: 'תלת מימד',
    icon: CubeIcon,
    subcategories: ['מודלים', 'אנימציה', 'משחקים']
  },
  {
    id: 'art',
    name: 'אומנות',
    icon: PaintBrushIcon,
    subcategories: ['ציור', 'עיצוב', 'איור']
  }
];
