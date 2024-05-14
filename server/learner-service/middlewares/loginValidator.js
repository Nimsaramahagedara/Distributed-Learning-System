import { jwtDecode } from "../utils/functions.js";

export const loginValidator = (req, res, next) => {
    // Access the Authorization header
    const authorizationHeader = req.headers['authorization'];
  
    if (authorizationHeader) {
      
      const token = authorizationHeader.split(' ')[1];

      const data = jwtDecode(token);

      req.body.userid = data._id; 
      req.role = data.role;
  
      next();
    } else {
      // Handle the case where the Authorization header is missing
      res.status(401).json({ message: 'Unauthorized: Token is Missing, Please Login Again' });
    }
  }