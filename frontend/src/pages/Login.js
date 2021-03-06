import React, { useState } from 'react';
import styles from './Condominio.module.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
    const [submit, setSubmit] = useState({
        email: "",
        password: ""
    })

    const [showPass, setShowPass] = useState(false)
    const [render, setRender] = useState(false)
    const [notificacao, setNoti] = useState()
    const navigate = useNavigate()

    function handleSubmit(e) {
        
        e.preventDefault()
        
        if (!emailError(submit.email) && !passError(submit.password)) {
            fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submit)
            }).then(res => {
                if (res.status == 201) {
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                localStorage.setItem("token", data.token)
                setTimeout(() => {
                        navigate("/home")
                    }, 1000);  
            })
            .catch(error => console.log(error))
            
            
            console.log(submit)
            // navigate("/dashboard")
        }
        else {
            setRender(true)
        }
    }

    function emailError(email) {
    if (email.length == 0) {
        return (<div className={styles.error}>
            <span>Por favor introduza o seu endereço de email.</span>
        </div>)}
    }

    function passError(pass) {
        if (pass.length == 0) {
            return (
            <div className={styles.error}>
                <span>Por favor introduza a sua password.</span>
            </div>)
        }
    }

    return (
        <div className="body">
            
            <form className={styles.form} method="get" onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.main}>
                    {/* <img src={thirsty} className={styles.logo} alt="thirsty" /> */}
                    <h1 className={styles.title}>Login</h1>
                    <div className={styles.field}>
                        <label className={styles.section}>Email</label><br></br>
                        <input className={styles.input} placeholder="someone@example.com" type="text" onChange={(e) => setSubmit((t) => { return { ...t, email: e.target.value.toLowerCase() } })}/>
                        {render ? emailError(submit.email) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.section}>Password</label><br></br>
                        <input className={styles.input} placeholder="A1b2C3d$" type={showPass ? "text" : "password"} onChange={(e) => setSubmit((t) => { return { ...t, password: e.target.value } })}/> <button type="button" className={styles.pwbutton} onClick={() => setShowPass((e) => !e)}>{!showPass ? <span className="material-icons">visibility</span> : <span className="material-icons">visibility_off</span>}</button>
                        {render ? passError(submit.password) : <div className={styles.error}>󠀡󠀡</div>}
                    </div>
                    <div>
                    <button type="submit" className={styles.submit}>Login</button>
                        <div className={styles.sub}>Ainda não tem conta? <Link to="/signup" className={styles.nodecor}>Clique aqui</Link>!</div>
                    </div>
                </div>
            </form>
        </div>
    )
}