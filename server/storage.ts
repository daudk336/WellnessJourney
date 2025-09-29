import { users, quizResponses, type User, type InsertUser, type QuizResponse, type InsertQuizResponse } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quiz response methods
  createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse>;
  getQuizResponse(id: string): Promise<QuizResponse | undefined>;
  getQuizResponsesByUser(userId: string): Promise<QuizResponse[]>;
  updateQuizResponseHealthScores(id: string, scores: {
    hairHealthScore: number;
    skinHealthScore: number; 
    bodyHealthScore: number;
    mindHealthScore: number;
    dryPercentage: number;
    oilPercentage: number;
  }): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createQuizResponse(response: InsertQuizResponse): Promise<QuizResponse> {
    const [quizResponse] = await db
      .insert(quizResponses)
      .values(response)
      .returning();
    return quizResponse;
  }

  async getQuizResponse(id: string): Promise<QuizResponse | undefined> {
    const [response] = await db.select().from(quizResponses).where(eq(quizResponses.id, id));
    return response || undefined;
  }

  async getQuizResponsesByUser(userId: string): Promise<QuizResponse[]> {
    return await db.select().from(quizResponses).where(eq(quizResponses.userId, userId));
  }

  async updateQuizResponseHealthScores(id: string, scores: {
    hairHealthScore: number;
    skinHealthScore: number;
    bodyHealthScore: number;
    mindHealthScore: number;
    dryPercentage: number;
    oilPercentage: number;
  }): Promise<void> {
    await db
      .update(quizResponses)
      .set({
        hairHealthScore: scores.hairHealthScore,
        skinHealthScore: scores.skinHealthScore,
        bodyHealthScore: scores.bodyHealthScore,
        mindHealthScore: scores.mindHealthScore,
        dryPercentage: scores.dryPercentage,
        oilPercentage: scores.oilPercentage
      })
      .where(eq(quizResponses.id, id));
  }
}

export const storage = new DatabaseStorage();
