const user_models = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hash = await   bcrypt.hash(password, salt);
  const newUser = new user_models({ pseudo, email, password: hash });

      newUser.save()
        .then((userRes) => res.status(200).json(userRes))
        .catch((err) => res.status(400).send(err));
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json("Missing email");
  }
  if (!password) {
    return res.status(400).json("Missing password");
  }
  //verify userLogin
  const userLogin = async () => {
    //verify Mail
    const userFound = await user_models.findOne({ email });
    if (!userFound) {
      return res.status(400).json("Username or password is incorrect");
    }

    //verify password
    const auth = await bcrypt.compare(password, userFound.password);
    if (!auth) {
      return res.status(400).json("Username or password is incorrect");
    }
    return userFound;
  };

  const user = await userLogin();

  try {
    //creating token
    const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
      expiresIn: "10s",
      algorithm: "RS256",
      subject: user.pseudo.toString(),
    });

    //creating refresh token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.PRIVATE_REFRESH_KEY,
      {
        expiresIn: "12h",
        algorithm: "RS256",
        subject: user.pseudo.toString(),
      }
    );
    //storing cookie Token
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 1000,
      SameSite: "Lax",
    });

    //storing cookie refreshToken
    res.cookie("jwtR", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 12 * 1000,
      SameSite: "Lax",
    });
    res.status(200).send({ user: user._id, token, refreshToken });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", err });
  }
};

module.exports.signOut = async (req, res) => {
  res.cookie("jwtR", "", { maxAge: 1 });
  res.status(204).send("Disconnected");
};

//MIDDLEWARE
module.exports.checkRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies.jwtR;
  // If token found
  if (refreshToken) {
    jwt.verify(
      refreshToken,
      process.env.PUBLIC_REFRESH_KEY,
      async (err, decoded) => {
        if (err) {
          res.cookie("jwtR", "", { maxAge: 1 });
          res.status(403).send("Invalid token");
        } else {
          let user = await user_models.findById(decoded.id);
          //creating token
          const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY, {
            expiresIn: "10s",
            algorithm: "RS256",
            subject: user.pseudo.toString(),
          });
          //storing cookie Token
          res.cookie("jwt", token, {httpOnly: true, maxAge: 60 * 1000, SameSite: "lax",});
          res.status(200).send(user._id);
        }
      }
    );
  } else {
    return res.status(401).json("No token");
  }
};
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.PUBLIC_KEY, async (err, decoded) => {
      if (err) {
        res.cookie("jwt", "", { maxAge: 1 });

        res.status(403).send("Invalid token");
      } else {
        console.log(decoded.id);
        let user = await user_models.findById(decoded.id);
        next();
      }
    });
  } else {
    console.log("no token");
    return res.status(401).json("No token");
  }
};
