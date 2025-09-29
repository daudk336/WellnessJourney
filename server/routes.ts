import type { Express } from "express";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { storage } from "./storage";
import { insertQuizResponseSchema } from "@shared/schema";
import { calculateHealthScores } from "./utils/healthCalculator";
import multer from "multer";
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";
import QRCode from "qrcode";
import { randomUUID } from "crypto";

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

export function registerRoutes(app: Express): Express {
  // Submit quiz response
  app.post("/api/quiz/submit", async (req, res) => {
    try {
      const validatedData = insertQuizResponseSchema.parse(req.body);
      
      // Calculate health scores from responses
      const healthScores = calculateHealthScores(validatedData);
      
      // Create quiz response with calculated scores
      const quizResponseData = {
        ...validatedData,
        ...healthScores
      };
      
      const quizResponse = await storage.createQuizResponse(quizResponseData);
      
      res.json({
        success: true,
        data: {
          id: quizResponse.id,
          healthMetrics: {
            hairHealth: quizResponse.hairHealthScore || 0,
            skinHealth: quizResponse.skinHealthScore || 0,
            bodyHealth: quizResponse.bodyHealthScore || 0,
            mindHealth: quizResponse.mindHealthScore || 0,
            dryPercentage: quizResponse.dryPercentage || 0,
            oilPercentage: quizResponse.oilPercentage || 0
          }
        }
      });
    } catch (error) {
      console.error("Quiz submission error:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Invalid quiz data"
      });
    }
  });

  // Get quiz response
  app.get("/api/quiz/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const quizResponse = await storage.getQuizResponse(id);
      
      if (!quizResponse) {
        return res.status(404).json({
          success: false,
          error: "Quiz response not found"
        });
      }
      
      res.json({
        success: true,
        data: quizResponse
      });
    } catch (error) {
      console.error("Get quiz response error:", error);
      res.status(500).json({
        success: false,
        error: "Internal server error"
      });
    }
  });

  // Upload and process image
  app.post("/api/images/upload", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No image file provided"
        });
      }

      const { type = 'general' } = req.body; // scalp, face, body, or general
      
      // Process image with Sharp
      const processedImageBuffer = await sharp(req.file.buffer)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'uploads');
      await fs.mkdir(uploadsDir, { recursive: true });

      // Generate unique filename
      const filename = `${type}_${Date.now()}_${randomUUID().slice(0, 8)}.jpg`;
      const filepath = path.join(uploadsDir, filename);

      // Save processed image
      await fs.writeFile(filepath, processedImageBuffer);

      const imageUrl = `/uploads/${filename}`;

      res.json({
        success: true,
        data: {
          url: imageUrl,
          type,
          originalName: req.file.originalname,
          size: processedImageBuffer.length
        }
      });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to process image"
      });
    }
  });

  // Generate QR code for GHL integration
  app.post("/api/qr/generate", async (req, res) => {
    try {
      const { quizResponseId, userInfo } = req.body;
      
      if (!quizResponseId) {
        return res.status(400).json({
          success: false,
          error: "Quiz response ID is required"
        });
      }

      // Create QR data for GHL Voice Agent integration
      const qrData = {
        quizId: quizResponseId,
        timestamp: new Date().toISOString(),
        userInfo: userInfo || {},
        callbackUrl: `${req.protocol}://${req.get('host')}/api/ghl/callback`
      };

      // Generate QR code
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        margin: 1,
        color: {
          dark: '#2D5016', // Primary color
          light: '#FFFFFF'
        },
        width: 300
      });

      res.json({
        success: true,
        data: {
          qrCode: qrCodeDataUrl,
          qrData,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
        }
      });
    } catch (error) {
      console.error("QR code generation error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate QR code"
      });
    }
  });

  // GHL webhook callback
  app.post("/api/ghl/callback", async (req, res) => {
    try {
      const { quizId, callData, voiceAgentResults } = req.body;
      
      console.log("GHL Callback received:", {
        quizId,
        callData,
        voiceAgentResults
      });
      
      // Here you would process the voice agent results
      // and update the quiz response or trigger follow-up actions
      
      res.json({
        success: true,
        message: "Callback processed successfully"
      });
    } catch (error) {
      console.error("GHL callback error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to process callback"
      });
    }
  });

  // Serve uploaded images
  app.get("/uploads/:filename", async (req, res) => {
    try {
      const { filename } = req.params;
      const filepath = path.join(process.cwd(), 'uploads', filename);
      
      // Check if file exists
      await fs.access(filepath);
      
      res.sendFile(filepath);
    } catch (error) {
      res.status(404).json({
        success: false,
        error: "Image not found"
      });
    }
  });

  return app;
}