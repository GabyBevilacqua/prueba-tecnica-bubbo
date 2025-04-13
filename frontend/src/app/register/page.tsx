"use client";
import '../register/register.css';
import RegisterForm from "@/components/RegisterForm";


export default function RegisterPage() {
  return (
    <div className="register-page">
      <h1 className="register-title">BIENVENIDO</h1>
      <p className="register-subtitle">Crea una cuenta para acceder a todas las funciones.</p>
      <RegisterForm />
    </div>
  );
}