// schema.ts

import { 
  pgTable, 
  uuid, 
  varchar, 
  text, 
  timestamp, 
  jsonb, 
  boolean,
  integer
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// AI Models Table
export const aiModels = pgTable('ai_models', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 255 }).notNull(),
  logoUrl: varchar('logo_url', { length: 255 }),
  websiteUrl: varchar('website_url', { length: 255 }),
  
  features: jsonb('features').$type<{
    name: string;
    description: string;
    isAvailable: boolean;
  }[]>(),
  
  pricing: jsonb('pricing').$type<{
    type: 'free' | 'paid' | 'freemium';
    startingPrice?: number;
    currency?: string;
    billingPeriod?: string;
    features?: string[];
  }>(),
  
  pros: jsonb('pros').$type<string[]>(),
  cons: jsonb('cons').$type<string[]>(),
  
  categories: jsonb('categories').$type<string[]>(),
  tags: jsonb('tags').$type<string[]>(),
  
  guideUrl: varchar('guide_url', { length: 255 }),
  tutorialVideoId: varchar('tutorial_video_id', { length: 50 }),
  
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Newsletter Issues Table
export const newsletterIssues = pgTable('newsletter_issues', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  
  mailerliteId: varchar('mailerlite_id', { length: 255 }).unique(),
  
  topics: jsonb('topics').$type<string[]>(),
  
  readingTime: integer('reading_time'),
  isPublished: boolean('is_published').default(false),
  
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Podcast Episodes Table
export const podcastEpisodes = pgTable('podcast_episodes', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  
  audioUrl: varchar('audio_url', { length: 255 }).notNull(),
  duration: integer('duration').notNull(), // in seconds
  
  spotifyId: varchar('spotify_id', { length: 255 }).unique(),
  
  showNotes: text('show_notes'),
  transcript: text('transcript'),
  
  topics: jsonb('topics').$type<string[]>(),
  guests: jsonb('guests').$type<{
    name: string;
    title: string;
    avatar?: string;
  }[]>(),
  
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Workshops Table
export const workshops = pgTable('workshops', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  
  details: jsonb('details').$type<{
    duration: number;
    level: 'beginner' | 'intermediate' | 'advanced';
    prerequisites: string[];
    whatYoullLearn: string[];
    agenda: {
      title: string;
      topics: string[];
    }[];
  }>(),
  
  pricing: jsonb('pricing').$type<{
    amount: number;
    currency: string;
    earlyBirdDiscount?: number;
  }>(),
  
  dates: jsonb('dates').$type<{
    start: string;
    end: string;
    timezone: string;
  }[]>(),
  
  capacity: integer('capacity').notNull(),
  registeredCount: integer('registered_count').default(0),
  
  isActive: boolean('is_active').default(true),
  isFullyBooked: boolean('is_fully_booked').default(false),
  
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// YouTube Content Table
export const youtubeContent = pgTable('youtube_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  videoId: varchar('video_id', { length: 50 }).notNull().unique(),
  playlistId: varchar('playlist_id', { length: 50 }).notNull(),
  
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  thumbnailUrl: varchar('thumbnail_url', { length: 255 }).notNull(),
  
  type: varchar('type', { length: 50 }).$type<'guide' | 'project' | 'workshop'>(),
  
  duration: varchar('duration', { length: 10 }), // ISO 8601 duration
  tags: jsonb('tags').$type<string[]>(),
  
  publishedAt: timestamp('published_at').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
});