// ContactForm.jsx
import emailjs from "@emailjs/browser";
import React, { useState } from "react";

export default function ContactForm() {
  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [honeypot, setHoneypot] =
    useState("");

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault();

    // 🛡️ 1. Protección Honeypot (campo oculto anti-bots)
    if (honeypot) {
      console.log("Bot detectado");
      return;
    }

    // 🛡️ 2. Rate limiting básico
    const lastSubmit =
      localStorage.getItem(
        "lastFormSubmit",
      );
    const now = Date.now();

    if (
      lastSubmit &&
      now - parseInt(lastSubmit) < 60000
    ) {
      alert(
        "Por favor espera 1 minuto antes de enviar otro mensaje",
      );
      return;
    }

    // 🛡️ 3. Validación y sanitización básica
    const formData = new FormData(form);
    const nombre = formData
      .get("nombre")
      ?.trim();
    const email = formData
      .get("email")
      ?.trim();
    const telefono = formData
      .get("telefono")
      ?.trim();
    const asunto = formData
      .get("asunto")
      ?.trim();
    const mensaje = formData
      .get("mensaje")
      ?.trim();

    setIsSubmitting(true);
    console.log("Formulario enviado!"); // ✅ Debug

    const form = event.target;
    console.log(
      "Datos del form:",
      new FormData(form),
    ); // ✅ Debug

    // Validaciones
    if (
      !nombre ||
      nombre.length < 2 ||
      nombre.length > 100
    ) {
      alert(
        "El nombre debe tener entre 2 y 100 caracteres",
      );
      setIsSubmitting(false);
      return;
    }

    if (
      !email ||
      !email.match(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      )
    ) {
      alert(
        "Por favor ingresa un email válido",
      );
      setIsSubmitting(false);
      return;
    }

    if (mensaje.length > 1000) {
      alert(
        "El mensaje no puede exceder 1000 caracteres",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Iniciando envío..."); // ✅ Debug

      const result =
        await emailjs.sendForm(
          import.meta.env
            .PUBLIC_EMAILJS_SERVICE_ID,
          import.meta.env
            .PUBLIC_EMAILJS_TEMPLATE_ID,
          form,
          import.meta.env
            .PUBLIC_EMAILJS_PUBLIC_KEY,
        );

      if (result.status === 200) {
        alert(
          "¡Mensaje enviado correctamente! Te responderé pronto.",
        );
        form.reset();
        localStorage.setItem(
          "lastFormSubmit",
          now.toString(),
        );
      }
      form.reset();
    } catch (error) {
      console.error(
        "Error completo:",
        error,
      ); // ✅ Debug
      alert(
        "Hubo un error al enviar el mensaje. Por favor intenta nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form w-full max-w-lg"
    >
      {/* 🛡️ Campo Honeypot (oculto, solo los bots lo llenan) */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) =>
          setHoneypot(e.target.value)
        }
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />

      {/* Nombre */}
      <div className="form-group">
        <label
          className="form-label"
          htmlFor="nombre"
        >
          Nombre Completo
        </label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          required
          minLength={2}
          maxLength={100}
          placeholder="Juan Pérez"
          className="form-input"
          autoComplete="name"
        />
      </div>

      {/* Correo */}
      <div className="form-group">
        <label
          className="form-label"
          htmlFor="email"
        >
          Correo Electrónico
        </label>
        <input
          type="email"
          name="email"
          required
          maxLength={100}
          placeholder="juan@ejemplo.com"
          className="form-input"
          autoComplete="email"
        />
      </div>

      {/* Teléfono */}
      <div className="form-group">
        <label
          className="form-label"
          htmlFor="telefono"
        >
          Teléfono
        </label>
        <input
          type="tel"
          name="telefono"
          required
          maxLength={20}
          placeholder="+54 9 11 1234-5678"
          className="form-input"
          autoComplete="tel"
        />
      </div>

      {/* Asunto */}
      <div className="form-group">
        <label
          className="form-label"
          htmlFor="asunto"
        >
          Asunto
        </label>
        <input
          type="text"
          name="asunto"
          required
          minLength={3}
          maxLength={100}
          placeholder="Consulta sobre proyecto web"
          className="form-input"
        />
      </div>

      {/* Mensaje */}
      <div className="form-group">
        <label
          className="form-label"
          htmlFor="mensaje"
        >
          Mensaje
        </label>
        <textarea
          name="mensaje"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          placeholder="Cuéntanos sobre tu proyecto..."
          className="form-textarea"
        />
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="form-submit-button"
      >
        {isSubmitting
          ? "Enviando..."
          : "Enviar Mensaje"}
      </button>
    </form>
  );
}
