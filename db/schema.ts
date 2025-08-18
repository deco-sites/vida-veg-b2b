import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contact = sqliteTable("contact", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  city: text("city").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
});
