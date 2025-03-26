// Update user by ID
userRouter.put("/user/:id", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body

        const getUser = await database.findOne(req.params.id)

        if (!username || !email || !password) {
            return res.status(400).json({ error: `Please provide all the required parameters..` })
        }

        if (!getUser) {
            return res.status(404).json({ error: `No user with id ${req.params.id}` })
        }

        const updateUser = await database.update(req.params.id, req.body)

        return res.status(StatusCodes.OK).json({ updateUser });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
})

// Delete user by ID
userRouter.delete("/user/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const user = await database.findOne(id)

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `User does not exist` })
        }

        await database.remove(id)

        return res.status(StatusCodes.OK).json({ msg: `User deleted` })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
})  