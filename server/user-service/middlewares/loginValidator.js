import { jwtDecode } from "../utils/functions.js";

export const loginValidator = async (req, res, next) => {
    try {
        // Access the Authorization header
        const token = req.cookies.token; 

        if (token) {

            const data = jwtDecode(token);

            req.body.userid = data._id; 
            req.role = data.role;

            next();
        }else{
            throw Error('Token is missing, please login again')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
