import { Prisma, PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export async function checkUserExist(username: string): Promise<Partial<User> | null> {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
}

export async function update({ id, username, password, address }: User) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      username,
      password,
      address,
    },
  });
}

export async function create({ username, password, address }: User) {
  const data: Prisma.UserCreateInput = {
    username: username,
    password: password,
    address: address,
  };
  await prisma.user.create({ data: data });
}

export async function remove(id: number) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      password: false,
      address: true,
      createdAt: false,
      updatedAt: true,
    },
    orderBy: [
      {
        username: 'asc',
      },
    ],
  });
  return users;
}

export async function getUser(id: number): Promise<Partial<User> | null> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      password: false,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}
