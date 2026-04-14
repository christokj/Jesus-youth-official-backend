import { NextFunction, Request, Response } from "express";

interface ApiErrorShape {
  status?: number;
  message?: string;
  stack?: string;
  code?: string | number;
  details?: Array<{ context?: { message?: string }; message?: string }>;
}

const sendErrorResponse = async (err: ApiErrorShape, res: Response) => {
  if (process.env.NODE_ENV === "development") {
    res.status(err.status || 500).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      code: err.code,
    });
    return;
  }

  if (err.status) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      code: err.code,
    });
    return;
  }

  const detail = err.details?.[0];
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: detail?.context?.message || detail?.message || err.message || "error",
  });
};

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      await sendErrorResponse(error as ApiErrorShape, res);
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "Error" });
      }
    }
  };

export default asyncHandler;
