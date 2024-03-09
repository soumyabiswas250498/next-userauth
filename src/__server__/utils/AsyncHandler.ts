const asyncHandler = (reqHandler: any) => async (req: any, res:any, next: any) => {
  try {
    await reqHandler(req, res, next);
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      success: error.success,
      message: error.message,
    });
    console.log(error.message, '***');
  }
};

export { asyncHandler };
