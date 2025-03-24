const { disconnect } = require("process");
const { prisma } = require("./common"); 

const getCustomer = async (id) => {
  const customer = await prisma.User.findUnique({
    where: {
      id,
    },
  });
  return customer;
};

const createNewUser = async (userName, email, password) => {
  const response = await prisma.User.create({
    data: {
      userName,
      email,
      password,
    },
  });
  return response;
};

const getUser = async (email) => {
  const response = prisma.User.findFirstOrThrow({
    where: {
      email,
    },
  });
  return response;
};

const getClasses = async () => {
  const response = await prisma.Class.findMany({});
  return response;
};

const addClass = async (id, classId) => {
  const response = await prisma.user.update({
    where: { id },
    data: {
      classes: {
        connect: { classId },
      },
    },
  });
  return response;
};

const getUserClass = async (classType) => {
  const response = await prisma.class.findMany({
    where: { classType },
    include: {
      users: true,
    },
  });
  return response;
};

const getAllClasses = async () => {
  //check
  const response = await prisma.class.findAll({
    include: {
      users: true,
    },
  });
  return response;
};

const removeClass = async (id, classId) => {
  return await prisma.user.update({
    where: { id },
    data: {
      classes: {
        disconnect: { classId },
      },
    },
  });
};

const classReviews = async (classId, userId, score, comment) => {
  const response = await prisma.review.create({
    data: {
      score,
      comment,
      class: {
        connect: { classId: classId },
      },
      user: {
        connect: { id: userId },
      },
    },
  });
  return response;
};

const getClassRevs = async (classId) => {
  const response = await prisma.Review.findMany({
    where: {
      classId: classId,
    },
    include: {
      class: {
        select: {
          classType: true,
        },
      },
      user: {
        select: {
          userName: true,
        },
      },
    },
  });
  return response;
};

const removeRev = async (revId) => {
  return await prisma.review.delete({
    where: { id: revId },
  });
};

const getAccount = async (id) => {
  const response = await prisma.user.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      userName: true,
      email: true,
      classes: true,
      //   include:{
      //     Review: {
      //       select: {
      //         score: true,
      //         comment: true,
      //     }
      //   }
      // }
    },
  });
  return response;
};

const getUserRevs = async (userId) => {
  const response = await prisma.review.findMany({
    where: {
      revUserId: userId,
    },
    select: {
      score: true,
      comment: true,
      id: true,
      class: {
        select: {
          classType: true,
          classId: true,
        },
      },
    },
  });
  return response;
};

const findRev = async (classId, id) => {
  return await prisma.review.findFirstOrThrow({
    where: {
      id,
      classId,
      // },
      // select: {
      //   score: true,
      //   comment: true,
      //   class: {
      //     select: {
      //       classId: true,
      //       classType: true,
      //     }
      //   },
      //   user: {
      //     select: {
      //       userName: true,
      //     }
      //   }
    },
  });
};

const getAllReviews = async () => {
  const response = await prisma.review.findMany({
    select: {
      score: true,
      comment: true,
      id: true,
      class: {
        select: {
          classType: true,
          classId: true,
        },
      },
      user: {
        select: {
          userName: true,
        },
      },
    },
  });
  return response;
};

const addLike = async (likes, id) => {
  const response = prisma.class.update({
    where: { id },
    data: { likes },
  });
  return response;
};

const updateEmail = async (id, email) => {
  const response = prisma.User.update({
    data: {
      email,
    },
    where: {
      id,
    },
  });
  return response;
};

const editRev = async (revId, score, comment) => {
  const response = prisma.review.update({
    data: {
      score,
      comment,
    },
    where: {
      id: revId,
    },
  });
  return response;
};

module.exports = {
  getCustomer,
  createNewUser,
  getUser,
  getClasses,
  addClass,
  getUserClass,
  getAllClasses,
  classReviews,
  getClassRevs,
  removeRev,
  removeClass,
  getAccount,
  getUserRevs,
  getAllReviews,
  findRev,
  addLike,
  updateEmail,
  editRev,
};
