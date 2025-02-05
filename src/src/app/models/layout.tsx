import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'השוואת מודלים - בינה בקיצור',
  description: 'השוואה מקיפה בין מודלים של בינה מלאכותית',
};

export default function ModelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 