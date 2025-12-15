const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { clerkId: 'user_36fUiF9CnH2Y9T3odPp2gZId0gl' },
    update: { role: 'instructor' },
    create: {
      clerkId: 'user_36fUiF9CnH2Y9T3odPp2gZId0gl',
      email: 'fdanumba@gmail.com', // Replace with your actual email
      name: 'Felicitas Anumba', // Replace with your name
      role: 'instructor'
    }
  });
  
  console.log('User created/updated:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
