import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../../auth/auth-options';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const accessGrants = await prisma.accessGrant.findMany({
      where: {
        grantedToId: session.user.id,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(accessGrants);
  } catch (error) {
    console.error('Access grants fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch access grants' },
      { status: 500 }
    );
  }
}