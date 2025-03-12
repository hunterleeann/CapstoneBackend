const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { getCustomer } = require("./db");

async function main() {
  // const user = await prisma.user.findFirstOrThrow({
  //   where: {},
  //   select: { id: true },
  // });

  // const customer = await getCustomer(user.id);

  const Yoga = await prisma.class.upsert({
    where: { classId: "1" },
    update: {},
    create: {
      classType: "Yoga",
      hour: "6:00",
      day: "Monday",
      classId: "1", 
      description: "Experience a calming and energizing Yoga class suitable for all levels. Focus on building strength, flexibility, and mindfulness through a series of postures, breathing exercises, and relaxation techniques. Whether you're a beginner or experienced, this class offers a peaceful environment to improve your physical and mental well-being. Join us and find balance on and off the mat!",
      likes: 0,
    },
  });

  const BootCamp = await prisma.class.upsert({
    where: { classId: "2" },
    update: {},
    create: {
      classType: "BootCamp",
      hour: "4:00",
      day: "Tuesday",
      classId: "2", 
      description: "Get ready to push your limits in this high-energy BootCamp class! Combining strength training, cardio, and endurance exercises, you'll build muscle, burn fat, and boost your overall fitness. Suitable for all levels, this class will challenge you and help you reach your fitness goals in a fun, motivating environment.",
      likes: 0,
    },
  });

  const Cardio = await prisma.class.upsert({
    where: { classId: "3" },
    update: {},
    create: {
      classType: "Cardio",
      hour: "6:00",
      day: "Wednesday",
      classId: "3", 
      description: "Boost your heart health and burn calories in our Cardio class! With a mix of aerobic exercises and heart-pumping moves, you'll improve your stamina, increase energy, and stay fit. Whether you're new to exercise or a seasoned athlete, this class will keep you moving and motivated every step of the way.",
      likes: 0,
    },
  });

  const Dance = await prisma.class.upsert({
    where: { classId: "4" },
    update: {},
    create: {
      classType: "Dance",
      hour: "5:00",
      day: "Thursday",
      classId: "4", 
      description: "Unleash your inner dancer in our fun and dynamic Dance class! Learn exciting moves to upbeat music while improving coordination, flexibility, and strength. Suitable for all skill levels, this class is a great way to stay active, have fun, and express yourself through movement.",
      likes: 0,
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
