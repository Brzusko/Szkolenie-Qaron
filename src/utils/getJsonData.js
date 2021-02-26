const getJsonData = (res, err) => {
    return new Promise((resolve, reject) => {
        let buffer;
        res.onData((data, isLast) => {
            const chunk = Buffer.from(data);
            if (isLast) {
                let json;
                if(buffer) {
                    try {
                        json = JSON.parse(Buffer.concat([buffer, chunk]));
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    try {
                        json = JSON.parse(chunk);
                    } catch (err) {
                        reject(err);
                    }
                }
                if(json) resolve(json);
                else reject(new Error('Empty data'));
            } else {
                buffer = buffer ? Buffer.concat([buffer, chunk]) : Buffer.concat([chunk]);
            }
        });
        res.onAborted(err);
    });
}

module.exports = getJsonData;