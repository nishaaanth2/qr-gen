'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useState, useEffect } from 'react';
import { AlertCircle, Check, CheckCircle, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import LoadingDots from '@/components/ui/loadingdots';
import downloadQrCode from '@/utils/downloadQrCode';
import { toast, Toaster } from 'react-hot-toast';
import { QRCode } from 'qrcode.react';
import Image from 'next/image';
import QRCodeGenerator from './qrgenrator';
import { AttributeSelector } from '@/components/attribute-selector';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ColorTabs from '@/components/color-selector';

const generateFormSchema = z.object({
  url: z.string().min(1, 'URL is required').url('Please enter a valid URL'),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Body = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [qrUrl, setQrUrl] = useState<string>("https://qr.nishaanth.com");
  const [qrSize, setQrSize] = useState<number>(256);
  const [qrPadding, setQrPadding] = useState<number>(10);
  const [qrColor, setQrColor] = useState<string>('#000000');
  const [logoAspectRatio, setLogoAspectRatio] = useState<number>(1);
  const [qrBackgroundColor, setQrBackgroundColor] = useState<string>('#ffffff');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',
    defaultValues: {
      url: 'https://qr.nishaanth.com',
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.url) {
        setQrUrl(value.url);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setLogoAspectRatio(file.size);
        console.log(file.size);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    // setUploadedImage(null);
    // after remove, cant able to upload the same image again
    const input = document.getElementById('image-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
    setUploadedImage(null);
  };

  return (
    <div className="flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-4xl font-bold mb-10 ">Generate a QR Code</h1>
          <Form {...form}>
            <form>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://your-url.com"  {...field} />
                      </FormControl>
                      <FormDescription>
                        This is what your QR code will link to.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AttributeSelector 
                  defaultValue={[qrSize]} 
                  maxValue={2000} 
                  label="Size" 
                  hoverText="Controls the size of the QR code." 
                  allowMore={true} 
                  onChange={(value) => setQrSize(value[0])}
                />
                <AttributeSelector 
                  defaultValue={[qrPadding]} 
                  maxValue={100} 
                  label="Padding" 
                  hoverText="Controls the padding around the QR code." 
                  allowMore={true} 
                  onChange={(value) => setQrPadding(value[0])}
                />
                <ColorTabs 
                  title="QR Color" 
                  hoverText="Choose the color for the QR code blocks. This will determine
          the color of the scannable pattern in your QR code." 
                  onChange={(color) => setQrColor(color)}
                />
                <ColorTabs 
                  title="Background Color" 
                  hoverText="Choose the color for the QR code background. This will determine
          the color of the background of your QR code." 
                  onChange={(color) => setQrBackgroundColor(color)}
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="image-upload" className="text-sm font-medium">
                    Upload Logo (optional)
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-sm"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload" className="w-fit py-2 text-sm  rounded-md px-3 cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    Choose Logo
                  </label>
                  {uploadedImage && (
                    <div className="mt-2">
                      <p className="text-sm mb-1">Current Logo:</p>
                      <div className="w-10 h-10 relative border border-gray-400  mt-2">
                        <img src={uploadedImage} alt="Uploaded logo" className="w-full h-full object-contain" />
                        <div className="absolute w-5 h-5 top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 flex justify-center items-center rounded-full">
                          <X className="w-3 h-3 text-white" onClick={handleRemoveImage} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-1 ">
          {qrUrl && (
            <div className="">
              <h1 className="text-3xl font-bold sm:mb-5 mb-5 mt-5 sm:mt-0 text-center">
                Your QR Code 
                
                <HoverCard>
                  <HoverCardTrigger><CheckCircle className="inline-block h-5 w-5 my-auto text-green-500 mx-2" /></HoverCardTrigger>
                  <HoverCardContent className="text-sm font-normal mx-1   ">Your QR Has Been Verified</HoverCardContent>
                </HoverCard>
              </h1>
              <div>
                <div className='w-full aspect-square bg-gray-100'>
                  <div className="w-full h-full flex justify-center items-center overflow-auto">
                    <QRCodeGenerator
                      text={qrUrl}
                      size={qrSize}
                      padding={qrPadding}
                      qrColor={qrColor}
                      backgroundColor={qrBackgroundColor}
                      logoUrl={uploadedImage ?? undefined}
                      logoAspectRatio={logoAspectRatio}
                    />
                  </div>
                </div>
                <div className="flex justify-center gap-5 mt-4">
                  <Button
                    onClick={() => {
                      const canvas = document.querySelector('canvas');
                      if (canvas) {
                        const pngUrl = canvas.toDataURL('image/png');
                        downloadQrCode(pngUrl, 'qrCode');
                      }
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(qrUrl);
                      toast.success('Link copied to clipboard');
                    }}
                  >
                    ✂️ Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;