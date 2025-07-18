import QRCode from 'qrcode';
import jsQR from 'jsqr';

/**
 * Verifies if a QR code image contains the expected text.
 * 
 * @param {string} qrImageData - The image data URL of the QR code.
 * @param {string} expectedText - The expected text encoded in the QR code.
 * @returns {Promise<boolean>} - A promise that resolves to true if the QR code contains the expected text, false otherwise.
 */
export async function verifyQR(qrImageData: string, expectedText: string): Promise<boolean> {
  try {
    // Create an Image object to load the QR code image
    const img = new Image();
    img.src = qrImageData;

    // Wait for the image to load
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Create a canvas to draw the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to create canvas context');
    }

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Get image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Decode the QR code
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      // Compare the decoded text with the expected text
      console.log('Decoded text:', code.data);
      console.log('Expected text:', expectedText);
      return code.data === expectedText;
    } else {
      console.error('Failed to decode QR code');
      throw new Error('Failed to decode QR code');
    }
  } catch (error) {
    console.error('Error verifying QR code:', error);
    return false;
  }
}

/**
 * Checks if the QR code content is within the recommended length.
 * 
 * @param {string} text - The text to be encoded in the QR code.
 * @returns {boolean} - Returns true if the text length is within the recommended limit, false otherwise.
 */
export function isQRContentLengthValid(text: string): boolean {
  // QR codes can typically store up to about 4,296 alphanumeric characters
  const MAX_QR_CONTENT_LENGTH = 4296;
  return text.length <= MAX_QR_CONTENT_LENGTH;
}




/**
 * Decodes a QR code image and returns its content.
 * 
 * @param {string} qrImageUrl - The URL or data URL of the QR code image.
 * @returns {Promise<string | null>} - A promise that resolves to the decoded QR code content, or null if decoding fails.
 */
export async function decodeQRCode(qrImageUrl: string): Promise<string | null> {
  try {
    // Load the image
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = qrImageUrl;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });

    // Create a canvas to draw the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to create canvas context');
    }

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Get image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Decode the QR code
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      return code.data;
    } else {
      console.error('Failed to decode QR code');
      return null;
    }
  } catch (error) {
    console.error('Error decoding QR code:', error);
    return null;
  }
}

