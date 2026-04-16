import { Request, Response } from "express";
import {
  createFeature,
  deleteFeature,
  getAllFeatures,
  updateFeature,
  updateFeatureStatus,
} from "./service";

export const getFeaturesController = async (req: Request, res: Response) => {
  try {
    const features = await getAllFeatures(req.query);
    res.status(200).json(features);
  } catch (error: any) {
    console.error("Error in getFeaturesController:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createFeatureController = async (req: Request, res: Response) => {
  try {
    const feature = await createFeature(req.body);
    res.status(201).json(feature);
  } catch (error: any) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export const updateFeatureController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const feature = await updateFeature(parseInt(id as string), req.body);

    if (!feature) {
      return res.status(404).json({
        message: "Feature not found",
      });
    }
    res.status(200).json(feature);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFeatureStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const feature = await updateFeatureStatus(parseInt(id as string), status);
    res.status(200).json(feature);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFeatureController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await deleteFeature(Number(id));

    if (!result) {
      return res.status(404).json({
        success: false,
        error: `Feature with ID ${id} not found`,
      });
    }

    return res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
