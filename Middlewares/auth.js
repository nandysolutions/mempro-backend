import jwt from 'jsonwebtoken';
import decode from 'jwt-decode'
const auth = (req, res, next) => {
    try {
        let decodedData;
        const token = req.headers.authorization.split(' ')[1];
        const isCutomtoken = token.length < 500;
        if (token && isCutomtoken) {
            decodedData = jwt.decode(token, process.env.SECRET)
            req.userId = decodedData?.id;
        }
        else {
            decodedData = decode(token);
            if (decodedData?.sub === undefined) {
                req.userId = decodedData.user_id
            } else {
                req.userId = decodedData?.sub;
            }
        }
        next();

    } catch (error) {
        console.log(error);

    }
};
export default auth;