import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { calculateMetabolicScores } from '@/lib/scoring/metabolic-scores';
import { analyzeWithClaude } from '@/lib/ai/claude-analysis';
import { generateFreeReport } from '@/lib/reports/generate-free';
import { generatePremiumReport } from '@/lib/reports/generate-premium';
import { sendAuditReport } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const responsesJson = formData.get('responses') as string;
    const responses = JSON.parse(responsesJson);

    // Upload photos (base64 ou cloud storage)
    const photoFace = formData.get('photoFace') as File | null;
    const photoBack = formData.get('photoBack') as File | null;
    const photoSide = formData.get('photoSide') as File | null;

    // Convert photos to base64 for storage (ou upload vers S3/Cloudinary)
    const photoFaceBase64 = photoFace ? await fileToBase64(photoFace) : null;
    const photoBackBase64 = photoBack ? await fileToBase64(photoBack) : null;
    const photoSideBase64 = photoSide ? await fileToBase64(photoSide) : null;

    // Create audit record
    const audit = await prisma.audit.create({
      data: {
        userId: session.user.id,
        type: 'GRATUIT',
        status: 'PROCESSING',
        responses,
        photoFace: photoFaceBase64,
        photoBack: photoBackBase64,
        photoSide: photoSideBase64,
      },
      include: {
        user: true,
      },
    });

    // STEP 1: Calculate metabolic scores (40 axes)
    console.log('🔢 Calculating metabolic scores...');
    const scores = await calculateMetabolicScores(responses);

    // STEP 2: Analyze with Claude (morphotype, profile, blockages)
    console.log('🤖 Analyzing with Claude AI...');
    const aiAnalysis = await analyzeWithClaude(responses, scores, {
      photoFace: photoFaceBase64 ?? undefined,
      photoBack: photoBackBase64 ?? undefined,
      photoSide: photoSideBase64 ?? undefined,
    });

    // STEP 3: Generate FREE report
    console.log('📄 Generating FREE report...');
    const freeReportHtml = await generateFreeReport({
      userName: audit.user.name || 'User',
      responses,
      scores,
      aiAnalysis,
    });

    // Update audit with results
    await prisma.audit.update({
      where: { id: audit.id },
      data: {
        scores: JSON.parse(JSON.stringify(scores)),
        aiAnalysis: JSON.parse(JSON.stringify(aiAnalysis)),
        htmlFree: freeReportHtml,
        status: 'COMPLETED',
        completedAt: new Date(),
        generatedAt: new Date(),
      },
    });

    // STEP 4: Send report by email
    console.log('📧 Sending report by email...');
    try {
      await sendAuditReport({
        email: audit.user.email,
        name: audit.user.name || 'User',
        auditId: audit.id,
        reportHtml: freeReportHtml,
        isPremium: false,
      });
      console.log('✅ Report sent successfully!');
    } catch (emailError) {
      console.error('⚠️ Failed to send email:', emailError);
      // Continue even if email fails - user can still access report in dashboard
    }

    return NextResponse.json({
      success: true,
      auditId: audit.id,
      message: 'Audit généré avec succès et envoyé par email',
    });
  } catch (error: any) {
    console.error('Erreur génération audit:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
}
