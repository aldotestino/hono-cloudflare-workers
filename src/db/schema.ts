import { char, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const posts = pgTable('post', {
  id: serial('id').primaryKey(),
  userId: char('user_id', { length: 32 }).notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const insertPostSchema = createInsertSchema(posts, {
  title: schema => schema.title.min(1).max(100),
  content: schema => schema.content.min(1).max(1000),
}).pick({ title: true, content: true });
