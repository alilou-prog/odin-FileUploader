import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../lib/Form";

const signup_form = {
    title: "Sign up",
    inputs: [
        {
            label: "firstname",
            name: "firstname",
            type: "text",
        },
        {
            label: "lastname",
            name: "lastname",
            type: "text",
        },
        {
            label: "password",
            name: "password",
            type: "password",
        }
    ],
    on_submit: () => {alert("sign up")}
}

export default function Sign_up() {
    const [errors, set_errors] = useState(null)
    const navigate = useNavigate()

    async function handle_submit(e) {
        e.preventDefault();
        const form_data = new FormData(e.currentTarget);

        const res = await fetch('/api/users', 
            {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(Object.fromEntries(form_data.entries()))
            }
        )
        if(res.ok) {
            navigate("/")
        }
        else {
            const data = await res.json()
            set_errors(data.errors)
        }
    }

    return (
        <Form form={signup_form}/>
    )
}