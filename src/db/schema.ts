import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const posts = pgTable('post', {
  id: serial().primaryKey(),
  title: text(),
  content: text(),
});
