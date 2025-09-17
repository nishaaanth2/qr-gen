"use client";

import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { decodeQRCode } from '@/utils/verifyqr';

interface QRCodeGeneratorProps {
  text: string;
  logoUrl?: string;
  logoPadding?: number;
  logoBackgroundColor?: string;
  logoAspectRatio?: number;
  size?: number;
  padding?: number;
  backgroundColor?: string;
  qrColor?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = (props) => {
  const {
    text,
    logoUrl,
    size = 256,
    padding = 10,
    backgroundColor = '#FFFFFF',
    qrColor = '#000000',
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && text) {
      QRCode.toCanvas(
        canvas,
        text,
        {
          width: size,
          margin: padding,
          color: {
            dark: qrColor,
            light: backgroundColor,
          },
        },
        (error) => {
          if (error) console.error(error);
        }
      );

      if (logoUrl) {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        let logoDivider = 1;
        let isValid = false;
        img.src = logoUrl;

        img.onload = async () => {
          while (!isValid && logoDivider <= 10) {
            let logoSize = size / logoDivider;
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;
            ctx?.drawImage(img, x, y, logoSize, logoSize);

            const data = await decodeQRCode(canvas.toDataURL());
            if (data === text) {
              console.log('QR code is valid and matches text');
              isValid = true;
            } else {
              console.log('QR code is invalid or does not match text');
              logoDivider++;
              // Redraw the original QR code before trying with a smaller logo
              QRCode.toCanvas(
                canvas,
                text,
                {
                  width: size,
                  margin: padding,
                  color: {
                    dark: qrColor,
                    light: backgroundColor,
                  },
                },
                (error) => {
                  if (error) console.error(error);
                }
              );
            }
          }

          if (!isValid) {
            console.log('Could not generate a valid QR code with logo');
          }
        };
      }
    }
  }, [text, logoUrl, size, padding, backgroundColor, qrColor]);

  return <canvas ref={canvasRef} width={size} height={size} />;
};

export default QRCodeGenerator;