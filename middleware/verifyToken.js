// this middleware shall check the token of the request and only let through the request when token is valid 
//(signiture is valid, token is not expired and server of request knows secret)
// import jwt
import jwt from "jsonwebtoken";

// create middleware
export const verifyToken = async (req, res, next) => {
    try {
        // deconstruct token from headers
        const { token } = req.headers;
        if (!token) {
            res.status(401).send("Unauthorized");
        } else {
          // use jwt verify method - gives back payload which was used to create the token
          // verify checks if token is right
            const emailBelongingToToken = jwt.verify(
            token,
            process.env.JWT_SECRET
          );
          // check if works - should give back true or false
          console.log(emailBelongingToToken);
          // check if email belongs to token, if so we add a new property to the request namened user
            if (emailBelongingToToken) {
                req.user = emailBelongingToToken; // we add a new property to the request
                next();
            }
        }
    } catch (error) {
    } 
}