const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { getCustomer } = require("./db");

async function main() {
  const user = await prisma.user.findFirstOrThrow({
    where: {},
    select: { id: true },
  });

  const customer = await getCustomer(user.id);

  const Yoga = await prisma.class.upsert({
    where: { classId: "1" },
    update: {},
    create: {
      classType: "Yoga",
      hour: "06:00",
      day: "Monday",
      classId: "1",
    },
  });

  const BootCamp = await prisma.class.upsert({
    where: { classId: "2" },
    update: {},
    create: {
      classType: "BootCamp",
      hour: "04:00",
      day: "Tuesday",
      classId: "2",
    },
  });

  const Cardio = await prisma.class.upsert({
    where: { classId: "3" },
    update: {},
    create: {
      classType: "Cardio",
      hour: "06:00",
      day: "Wednesday",
      classId: "3",
    },
  });

  const Dance = await prisma.class.upsert({
    where: { classId: "4" },
    update: {},
    create: {
      classType: "Dance",
      hour: "05:00",
      day: "Thursday",
      classId: "4",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
