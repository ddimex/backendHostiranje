exports.getHome = (req, res) => {
  try {
    res.status(200).render("homepage", {});
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.getLogin = (req, res) => {
  try {
    res.status(200).render("login", {});
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.getSignup = (req, res) => {
  try {
    res.status(200).render("signup", {});
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.getHello = (req, res) => {
  try {
    res.status(200).render("hello");
  } catch (err) {
    res.status(500).send("error");
  }
};
