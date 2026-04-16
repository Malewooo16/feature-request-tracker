import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate = (schema: ZodObject, source: 'query' | 'body' | 'params' = 'query') => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req[source]);

      // If it's query or params, we modify the existing object instead of replacing it
      if (source === 'query' || source === 'params') {
        // Clear existing keys to ensure only validated data remains
        Object.keys(req[source]).forEach(key => delete (req[source] as any)[key]);
        // Inject validated data
        Object.assign(req[source], validatedData);
      } else {
        // For body, replacement usually works, but Object.assign is safer
        req.body = validatedData;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.flatten().fieldErrors,
        });
      }
      next(error);
    }
  };