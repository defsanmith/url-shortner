import { NextResponse } from "next/server";

export interface AppErrorResponse {
  message: string;
  code: number;
}

export interface AppResponse<R> {
  message: string;
  data: R;
}

export const makeErrorResponse = (error: AppErrorResponse | null) =>
  NextResponse.json(
    {
      message: error?.message || "Something went wrong",
    },
    {
      status: error?.code || 500,
    },
  );

export const makeSuccessResponse = (data: unknown, message?: string) =>
  NextResponse.json({
    data,
    message: message,
  });
