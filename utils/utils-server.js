
const getMe = async (req, jwt, err) => {
  const token = req.headers["authorization"]
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET)
    } catch (error) {
      throw new err('Your session expired, Sign In again')
    }
  }
}


export {
  getMe
}