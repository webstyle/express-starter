import * as jwt from "jsonwebtoken";

export class JWT {
    generateToken(data) {
        return jwt.sign(data, 'key');
    }

    parseToken(token) {
        jwt.verify(token, 'key', (err, data) => {
            if (err) return Promise.reject(err);

            return Promise.resolve(data);
        });
    }
}