import { Router } from "express"
import bookRoutes from "./books"
const router = Router()


router.get("/", (req, res) => {
    res.send("Hello World")
})

router.use("/books", bookRoutes)
export default router