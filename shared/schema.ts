import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
});

export const quizResponses = pgTable("quiz_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  
  // Hair Assessment
  hairHealthScore: integer("hair_health_score").default(0),
  hairFall: text("hair_fall"),
  hairFallDuration: text("hair_fall_duration"),
  scalpIssues: text("scalp_issues"),
  scalpIssueFrequency: text("scalp_issue_frequency"),
  greyingConcerns: text("greying_concerns"),
  scalpImageUrl: text("scalp_image_url"),
  
  // Skin Assessment  
  skinHealthScore: integer("skin_health_score").default(0),
  skinConcern: text("skin_concern"),
  skinType: text("skin_type"),
  skinConditions: text("skin_conditions"),
  dermatologistConsult: text("dermatologist_consult"),
  skinTexture: text("skin_texture"),
  faceImageUrl: text("face_image_url"),
  
  // Body Assessment
  bodyHealthScore: integer("body_health_score").default(0),
  physicalDiscomfort: text("physical_discomfort"),
  discomfortLocation: text("discomfort_location"),
  energyLevels: text("energy_levels"),
  physicalGoals: text("physical_goals"),
  bodyImageUrl: text("body_image_url"),
  
  // Mind Assessment
  mindHealthScore: integer("mind_health_score").default(0),
  stressFrequency: text("stress_frequency"),
  stressTriggers: text("stress_triggers"),
  sleepQuality: text("sleep_quality"),
  sleepChallenges: text("sleep_challenges"),
  mentalClarity: text("mental_clarity"),
  
  // Health Metrics
  dryPercentage: integer("dry_percentage").default(0),
  oilPercentage: integer("oil_percentage").default(0),
  primaryConcerns: text("primary_concerns"),
  programmeTierInterest: text("programme_tier_interest"),
  
  // Avatar URLs
  avatarCurrentStateUrl: text("avatar_current_state_url"),
  avatarHigherSelfUrl: text("avatar_higher_self_url"),
  
  // QR Code tracking
  qrCodeId: text("qr_code_id").unique(),
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;