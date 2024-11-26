const { decodeSessionJwt } = require("../helpers/authentication");
const { getBorrowingRecordByUser } = require("../models/BorrowingRecords");
const { getUserBySessionToken } = require("../models/User");

const getBorrowingRecords = async (req, res) => {
  try {
    // Decode the JWT token and get the user information
    const decodedToken = decodeSessionJwt(req, res);
    const user = await getUserBySessionToken(decodedToken.sessionToken);

    const userId = user._id;

    // Unauthorized if no user found
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Extract pagination parameters from query string
    let { page = 1, limit = 10 } = req.query;

    // Convert to integer values
    page = parseInt(page);
    limit = parseInt(limit);

    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the borrowing records with pagination
    const records = await getBorrowingRecordByUser(userId)
      .skip(skip)
      .limit(limit);

    // Get the total number of records for the user
    const totalRecords =
      await getBorrowingRecordByUser(userId).countDocuments();

    return res.status(200).json({
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        pageSize: limit,
        totalRecords,
      },
      records,
    });
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
