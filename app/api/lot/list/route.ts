

import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { Response } from '@/services/lot'

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
  const pageSize = parseInt(req.nextUrl.searchParams.get('pageSize') || '10', 10);;

  const skip = (page - 1) * pageSize;
  const lots = await prisma.lot.findMany({
    skip: skip,
    take: pageSize,
  });

  // Get total count for pagination meta info
  const totalLots = await prisma.lot.count();

  return NextResponse.json<Response>({
    data: lots,
    meta: {
      page,
      pageSize,
      totalCount: totalLots,
      totalPages: Math.ceil(totalLots / pageSize),
    },
  });
}