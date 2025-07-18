import { QrGenerateRequest, QrGenerateResponse } from '@/utils/service';
import { NextRequest } from 'next/server';
import { nanoid } from '@/utils/utils';
import QRCode from 'qrcode';

/**
 * Validates a request object.
 *
 * @param {QrGenerateRequest} request - The request object to be validated.
 * @throws {Error} Error message if URL is missing.
 */

const validateRequest = (request: QrGenerateRequest) => {
  if (!request.url) {
    throw new Error('URL is required');
  }
};

export async function POST(request: NextRequest) {
  try {
    const reqBody = (await request.json()) as QrGenerateRequest;

    validateRequest(reqBody);

    const id = nanoid();
    const startTime = performance.now();

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(reqBody.url, {
      width: 512,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    const endTime = performance.now();
    const durationMS = endTime - startTime;

    const response: QrGenerateResponse = {
      image_url: qrCodeDataUrl,
      model_latency_ms: Math.round(durationMS),
      id: id,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
