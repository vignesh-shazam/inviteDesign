import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import os from "os";

import type { WishCompositionProps } from "@/remotion/WishComposition";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WishCompositionProps;

    if (!body.recipientName || !body.title || !body.message) {
      return NextResponse.json(
        { error: "recipientName, title, and message are required." },
        { status: 400 },
      );
    }

    // Lazy-import Remotion renderer (server-only, heavy deps)
    const { bundle } = await import("@remotion/bundler");
    const { renderMedia, selectComposition } = await import("@remotion/renderer");

    // Bundle the composition — points to our Remotion entry file
    const entryPoint = path.join(process.cwd(), "remotion", "index.tsx");

    console.log("[wish-render] Bundling composition...");
    const bundleLocation = await bundle({
      entryPoint,
      // Silence webpack warnings in Next.js context
      webpackOverride: (config) => config,
    });

    // Select the composition by ID
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "WishVideo",
      inputProps: body,
    });

    // Output to OS temp dir
    const outputFile = path.join(os.tmpdir(), `wish-${Date.now()}.mp4`);

    console.log("[wish-render] Rendering video...");
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outputFile,
      inputProps: body,
      timeoutInMilliseconds: 120_000,
      // Reduce quality slightly for faster render
      crf: 23,
    });

    // Read the rendered file
    const videoBuffer = fs.readFileSync(outputFile);

    // Clean up temp file
    fs.unlinkSync(outputFile);

    console.log(`[wish-render] Done — ${videoBuffer.byteLength} bytes`);

    return new Response(videoBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="wish-${body.recipientName.replace(/\s+/g, "-")}.mp4"`,
        "Content-Length": String(videoBuffer.byteLength),
      },
    });
  } catch (error) {
    console.error("[wish-render] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to render video.",
      },
      { status: 500 },
    );
  }
}

// Increase serverless function timeout (if supported by platform)
export const maxDuration = 120;
