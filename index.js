const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3032;
app.use(require("morgan")("dev"));
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET || "1234";
const jwt = require("jsonwebtoken");
const { prisma } = require("./common");
const cors = require("cors");

const {
  getCustomer,
  getAllReviews,
  createNewUser,
  getUser,
  getClasses,
  addClass,
  getUserClass,
  getAllClasses,
  removeClass,
  classReviews,
  getClassRevs,
  removeRev,
  getAccount,
  getUserRevs,
  findRev,
  addLike,
  updateEmail,
  editRev,
} = require("./db");

const setToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "8h" });
};

//app.use(cors());
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//createClassType();
//"http://localhost:5173"

app.use(
  cors({
    origin: "https://steady-medovik-af726e.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//app.options("*", cors());

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const customer = await getCustomer(id);
    if (!customer) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    req.customer = customer;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or expired token" });
  }
};

app.post("/auth/register", async (req, res, next) => {
  //works
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await createNewUser(userName, email, hashedPassword);
    const token = setToken(response.id);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
});

app.post("/auth/login", async (req, res, next) => {
  //works
  try {
    const { email, password } = req.body;
    const customer = await getUser(email);
    const match = await bcrypt.compare(password, customer.password);
    if (match) {
      const token = setToken(customer.id);
      res.status(201).json(token);
    } else {
      res.status(403).json({ message: "Username and Password do not match" });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/classes", async (req, res, next) => {
  //works
  try {
    const response = await getClasses();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.put("/classes/:classId", isLoggedIn, async (req, res, next) => {
  //works
  try {
    const { classId } = req.params;
    const id = req.customer.id;
    //const customer = await getCustomer(id);
    const response = await addClass(id, classId);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.get("/classes/:classType", async (req, res, next) => {
  //works
  try {
    const { classType } = req.params;
    const response = await getUserClass(classType);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.get("/classes/users", async (req, res, next) => {
  try {
    //returns empty array
    const response = await getAllClasses();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.delete("/account/:classId", isLoggedIn, async (req, res, next) => {
  try {
    const { classId } = req.params;
    const id = req.customer.id;
    console.log(id);
    const response = await removeClass(id, classId);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.put(
  "/classes/:classId/reviews", ///classes/:classId/reviews/:userId
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { classId } = req.params;
      const userId = req.customer.id;
      const { score, comment } = req.body;

      const response = await classReviews(classId, userId, score, comment);

      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

app.get("/classes/:classId/reviews", async (req, res, next) => {
  try {
    const { classId } = req.params;
    const response = await getClassRevs(classId);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.get("/account/reviews", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.customer.id;
    const response = await getUserRevs(userId);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.delete(
  "/myReviews/:revId",
  /*isLoggedIn,*/ async (req, res, next) => {
    try {
      const { revId } = req.params;
      // const id = req.customer.id;
      const response = await removeRev(revId);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

app.patch(
  "/myReviews/:revId",
  /*isLoggedIn,*/ async (req, res, next) => {
    try {
      const { revId } = req.params;
      const { score, comment } = req.body;
      // const id = req.customer.id;
      const response = await editRev(revId, score, comment);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/classes/:classId/reviews/:id",
  isLoggedIn,
  /*isAdmin,*/ async (req, res, next) => {
    try {
      const { classId, id } = req.params;
      //const id = req.customer.id;
      const response = await findRev(classId, id);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
);

app.get("/account", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.customer.id;
    //const { id } = req.params;
    console.log("Fetching account for user:", req.customer.id);
    const response = await getAccount(id);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.get("/reviews", async (req, res, next) => {
  try {
    //const id = req.customer.id;
    //const { id } = req.params;
    const response = await getAllReviews();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.patch("/classes", async (req, res, next) => {
  try {
    const id = req.customer.id;
    const { likes } = req.body;
    const response = await addLike(likes, id);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.patch("/account", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.customer.id;
    const { email } = req.body;
    //const { id } = req.params;
    // console.log("Fetching account for user:", req.customer.id);
    const response = await updateEmail(id, email);
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, async () => {
  console.log(`I am listening on port number ${PORT}`);
});
