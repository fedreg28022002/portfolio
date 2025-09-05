// ContactForm.jsx
import emailjs from "@emailjs/browser";
import React from "@astrojs/react"; // necesario para JSX

export default function ContactForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("🔥 Formulario enviado!"); // ✅ Debug

    const form = event.target;
    console.log("📝 Datos del form:", new FormData(form)); // ✅ Debug

    try {
      console.log("📧 Iniciando envío..."); // ✅ Debug

      const result = await emailjs.sendForm(
        "service_xr1ipft",
        "template_ypvljgb",
        form,
        "63_IVlol45Sb2k-Aa"
      );

      console.log("✅ Resultado:", result); // ✅ Debug
      alert("Mensaje enviado correctamente ✅");
      form.reset();
    } catch (error) {
      console.error("❌ Error completo:", error); // ✅ Debug
      alert("Hubo un error: " + error.message);
    }
  };

  return (
    <section className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-6 rounded-2xl bg-white p-8 shadow-lg"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-secondaryCyan focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Correo
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-secondaryCyan focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="tel"
            name="telefono"
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-secondaryCyan focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Asunto
          </label>
          <input
            type="text"
            name="asunto"
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-secondaryCyan focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Mensaje
          </label>
          <textarea
            name="mensaje"
            required
            rows="5"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-secondaryCyan focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-secondaryCyan py-3 font-semibold text-white transition duration-300 hover:bg-primaryBlue"
        >
          Enviar mensaje
        </button>
      </form>
    </section>
  );
}
