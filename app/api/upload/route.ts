import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(req: Request) {
  // Auth check
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized — please log in first' }, { status: 401 });
  }

  // Cloudinary config guard
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error('[upload] Missing Cloudinary env vars');
    return NextResponse.json(
      { error: 'Server misconfiguration: Cloudinary credentials not set' },
      { status: 500 },
    );
  }

  let file: File | null = null;
  try {
    const form = await req.formData();
    file = form.get('file') as File | null;
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Image must be under 10 MB' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
    const result = await uploadImage(base64);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[upload] Cloudinary error:', err?.message ?? err);
    return NextResponse.json(
      { error: err?.message ?? 'Upload failed — check Cloudinary credentials' },
      { status: 500 },
    );
  }
}
