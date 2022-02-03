const router = express.Router()

router.post('/signup', (req, res)  => {
    if (validateEmail(req.body.email) && await emailAvaiable(req.body.email) && (checkPasswordStrength(req.body.password) === 4) && (req.body.password == req.body.passwordConfirmation)) {
        const user = req.body
        const passEncrypted = bcrypt.hashSync(req.body.password, saltRounds);
        user.email = user.email.toLowerCase()
        user.password = passEncrypted
        delete user.passwordConfirmation
        const id = new ObjectId()
        await createDocument({_id: id, ...user})
        console.log(id)
        res.status(201).json({ message: "Utilizador Criado com Sucesso!", _id: id})
    }
    else {
        const resposta = {
            message: "Os dados introduzidos não são válidos.",
            errors: {

            }
        }
        if (req.body.email.length === 0) resposta.errors.email = "Por favor introduza o seu endereço de email."
        else if (!validateEmail(req.body.email)) resposta.errors.email = "Por favor introduza um endereço de email válido."
        if ( !await emailAvaiable(req.body.email)) resposta.errors.email = "O endereço introduzido já está registado."
        if (checkPasswordStrength(req.body.password) < 4) {
            if (req.body.password.length === 0) resposta.errors.password = "Por favor introduza a sua password."
            else if (req.body.password.length < 8) resposta.errors.password = "A sua password deve ter no mínimo 8 caracteres."
            else resposta.errors.password = "A sua password deve ter pelo menos um número, uma mínuscula, uma maiúscula e um símbolo."
        }
        if (req.body.passwordConfirmation.length === 0) resposta.errors.passwordConfirmation = "Por favor introduza novamente a sua password."
        else if (req.body.password !== req.body.passwordConfirmation) resposta.errors.passwordConfirmation = "As passwords não coincidem."
        res.status(400).json(resposta)
        console.log(resposta)
    }

})

router.post("/login", (req, res) => {
    if (await emailAvaiable(req.body.email)) res.status(404).json({ message: "O email ou password estão incorretos" })
    else if (await validateLogin(req.body.email, req.body.password)) {
        await handleSessions(req.body.email)
        const user = await findDocumentByEmail(req.body.email)
        const token = await generateToken()
        delete user.password
        delete user.passwordConfirmation
        delete user.condominios
        await createSession({token, ...user})
        res.status(200).json({token})
    }  
    else if (validatePassword(req.body.email, req.body.password)) res.status(401).json({ message: "O email ou password estão incorretos" })
})

