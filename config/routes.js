import userRouter from "../routes/user.router.js";

const routes = (app) => {
  app.use("/api/users", userRouter);

  app.get("/", function (req, res) {
    res.set("content-type", "text/html");
    res.send("Welcome!");
  });
};

export default routes;
