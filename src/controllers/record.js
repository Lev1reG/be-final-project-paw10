const { decodeSessionJwt } = require("../helpers/authentication");
const { getBorrowingRecordByUser } = require("../models/BorrowingRecords");
const { getUserBySessionToken } = require("../models/User");

const getBorrowingRecords = async (req, res) => {
  try {
    const decodedToken = decodeSessionJwt(req, res); 
    const user = await getUserBySessionToken(decodedToken.sessionToken);

    const userId = user._id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const records = await getBorrowingRecordByUser(userId);

    return res.status(200).send(records);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    }); 
  }
};

module.exports = {
  getBorrowingRecords,
};
