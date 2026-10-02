import {
    GoogleGenAI,
    GenerateVideosOperation,
} from "@google/genai";

const apiKey =
    process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error(
        "GEMINI_API_KEY is not configured.",
    );
}

const ai = new GoogleGenAI({
    apiKey,
});

const VIDEO_MODEL =
    "veo-3.1-generate-preview";

export type VeoVideoOperation = {
    name: string;
};

export type VeoVideoResult = {
    done: boolean;
    videoUri?: string;
    error?: string;
};

export async function startVeoVideoGeneration(
    prompt: string,
): Promise<VeoVideoOperation> {
    const operation =
        await ai.models.generateVideos({
            model: VIDEO_MODEL,
            prompt,
            config: {
                aspectRatio: "9:16",
                resolution: "720p",
                numberOfVideos: 1,
            },
        });

    if (!operation.name) {
        throw new Error(
            "Veo did not return an operation name.",
        );
    }

    return {
        name: operation.name,
    };
}

export async function getVeoVideoStatus(
    operationName: string,
): Promise<VeoVideoResult> {
    try {
        const operation =
            new GenerateVideosOperation();

        operation.name =
            operationName;

        const updatedOperation =
            await ai.operations.getVideosOperation(
                {
                    operation,
                },
            );

        if (!updatedOperation.done) {
            return {
                done: false,
            };
        }

        if (updatedOperation.error) {
            return {
                done: true,
                error: JSON.stringify(
                    updatedOperation.error,
                ),
            };
        }

        const generatedVideos =
            updatedOperation.response
                ?.generatedVideos;

        const generatedVideo =
            generatedVideos?.[0];

        const videoUri =
            generatedVideo?.video?.uri;

        if (!videoUri) {
            return {
                done: true,
                error:
                    "Veo completed but no video URI was returned.",
            };
        }

        return {
            done: true,
            videoUri,
        };
    } catch (error) {
        return {
            done: true,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to check Veo video status.",
        };
    }
}