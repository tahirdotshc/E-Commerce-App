import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function registerUserController(request, response) {
    try {
        const { name, email, password } = request.body
        if (!name || email || !password) {
            return response.status(400).json({
                message: "provide email, name, password", error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email: email })

        if (user) {
            return response.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashePassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel(
            {
                email: email,
                password: hashePassword,
                name: name
            }
        )
        const save = await newUser.save()
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })

    }

}
