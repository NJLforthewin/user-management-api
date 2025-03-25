import express, { Request, Response } from "express"
import { UnitUser, User } from "./user.interface"
import { StatusCodes } from "http-status-codes"
import * as database from "./user.database"

const userRouter = express.Router();
export default userRouter;

userRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters...` })
        }

        const user = await database.findByEmail(email)

        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: `This email has already been registered..` })
        }

        const newUser = await database.create(req.body)

        return res.status(StatusCodes.CREATED).json({ newUser })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
})

// Login user
userRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters...` })
        }

        const user = await database.findByEmail(email)

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `No user exists with the email provided..` })
        }

        const comparePassword = await database.comparePassword(email, password)

        if (!comparePassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: `Incorrect Password!` })
        }

        return res.status(StatusCodes.OK).json({ user })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
})