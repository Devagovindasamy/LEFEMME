import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("lefemme_products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  copyStatus: text("copy_status").notNull().default("demo"),
  priceCents: integer("price_cents").notNull(),
  priceIsDemo: boolean("price_is_demo").notNull().default(true),
  colors: jsonb("colors").notNull(),
  images: jsonb("images").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  charmNote: text("charm_note"),
});

export const bloomClubSignups = pgTable("lefemme_bloom_club_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("demo"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const demoOrders = pgTable("lefemme_demo_orders", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  items: jsonb("items").notNull(),
  subtotalCents: integer("subtotal_cents").notNull(),
  status: text("status").notNull().default("demo_placed"),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contactMessages = pgTable("lefemme_contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  isDemo: boolean("is_demo").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
