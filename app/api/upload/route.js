import { NextResponse } from 'next/server';
import { uploadImageFromBase64 } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;
    
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    
    const result = await uploadImageFromBase64(base64String, filename);

    if (result.success) {
      return NextResponse.json({
        success: true,
        url: result.url,
        publicId: result.publicId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
