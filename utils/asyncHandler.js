
// Function to send detailed error responses
const sendErrorResponse = async (err, res) => {
    if (process.env.NODE_ENV === 'development') {
        res.status(err.status).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            code: err.code
        });
    } else {
        if (err.status) {
            // Production - Hide stack traces
            res.status(err.status).json({
                status: err.status,
                message: err.message,
                code: err.code
            });
        } else {
            res.json({
                status: err.status || 400,
                message: err.details[0].context.message || err.details[0].message || "error",
            });
        }

    }
};

// Async Handler
const asyncHandler = fn => async (req, res, next) => {
    // console.log(`[${new Date().toISOString()}] - Request to ${req.method} ${req.originalUrl} started`);

    try {
        // Execute the provided async function
        await fn(req, res, next);

        // console.log(`[${new Date().toISOString()}] - Request to ${req.method} ${req.originalUrl} completed successfully`);

    } catch (err) {
        // console.error(`[${new Date().toISOString()}] - Error in request to ${req.method} ${req.originalUrl}:`, err);

        // Send detailed error response to the client
        await sendErrorResponse(err, res);

        // Pass the error to the next middleware
        return res.json({ success: false, message: "Error", err })
    }
};

module.exports = asyncHandler;