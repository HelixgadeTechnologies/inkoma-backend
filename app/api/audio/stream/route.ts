import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const storyId = searchParams.get('storyId');
  const nodeId = searchParams.get('nodeId');

  // Stub response for audio stream endpoints
  return NextResponse.json({
    status: 'ok',
    storyId,
    nodeId,
    narrationType: 'oral_narration_tts',
    audioFormat: 'audio/mpeg',
    message: 'Oral narration stream endpoint initialized.',
  });
}
