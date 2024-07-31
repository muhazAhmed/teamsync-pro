import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
import { RESPONSE_MESSAGE } from "./validations.js";

// const ObjectID = mongoose.Types.ObjectId;

export const authenticate = (req, res, next) => {
    try {
        const token = req.headers["x-api-key"];
        if (token) {
            jwt.verify(token, process?.env?.JWT_SECRET, (err, decodedToken) => {
                if (err) {
                    return res.status(403).json(RESPONSE_MESSAGE("").INVALID_TOKEN);
                }
                req.decodedToken = decodedToken;
                next();
            });
        } else {
            return res.status(401).json(RESPONSE_MESSAGE("").NO_TOKEN);
        }
    } catch (error) {
        console.log(error?.message);
        return res.status(401).json(RESPONSE_MESSAGE("").NOT_AUTHENTICATED);
    }
};

// export const authorize = (req, res, next) => {
//     try {
//         const token = req.headers["x-api-key"];
//         if (token) {
            
//         } else {
//             return res.status(401).json(RESPONSE_MESSAGE("").NO_TOKEN);
//         }
//     } catch (error) {
//         console.log(error?.message);
//         return res.status(401).json(RESPONSE_MESSAGE("").NOT_AUTHENTICATED);
//     }
// };
