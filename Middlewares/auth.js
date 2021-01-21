import jwt from 'jsonwebtoken';
const auth = (req, res, next) => {
    let decodedData;
    try {
        const token = req.headers.authorization.split(' ')[1];
        const isCutomtoken = token.length < 500;
        if (token && isCutomtoken) {
            decodedData = jwt.verify(token, process.env.SECRET)
            req.userId = decodedData?.id;
        }
        else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();

    } catch (error) {
        console.log(error);

    }
};
export default auth;