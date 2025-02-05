import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const apiOnly = searchParams.get('apiOnly') === 'true';

    const where = {
      AND: [
        // Category filter
        category && category !== 'all'
          ? {
              categories: {
                some: {
                  id: category,
                },
              },
            }
          : {},
        // Search filter
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { shortDescription: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        // API filter
        apiOnly ? { hasAPI: true } : {},
      ],
    };

    const models = await prisma.aIModel.findMany({
      where,
      include: {
        categories: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    );
  }
} 