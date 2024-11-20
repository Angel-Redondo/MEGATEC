// Validar solo letras y longitud máxima
function validateText(input, maxLength) {
    const textRegex = /^[a-zA-Z\s]*$/;
    const errorField = document.getElementById(`${input.id}-error`);

    if (textRegex.test(input.value) && input.value.length <= maxLength) {
        errorField.classList.remove('visible'); // Ocultar error
        input.style.borderColor = 'green';
    } else {
        errorField.classList.add('visible'); // Mostrar error
        input.style.borderColor = 'red';
    }
}

// Validar email
function validateEmail(input) {
    const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const errorField = document.getElementById('email-error');

    if (emailRegex.test(input.value)) {
        errorField.classList.remove('visible'); // Ocultar error
        input.style.borderColor = 'green';
    } else {
        errorField.classList.add('visible'); // Mostrar error
        input.style.borderColor = 'red';
    }
}

// Validar solo números con exactamente 9 caracteres
function validateNumbers(input) {
    const errorField = document.getElementById('telefono-error');
    input.value = input.value.replace(/[^0-9]/g, ''); // Eliminar cualquier carácter que no sea número

    if (input.value.length === 9) { // Deben ser exactamente 9 caracteres
        errorField.classList.remove('visible'); // Ocultar mensaje de error
        input.style.borderColor = 'green'; // Cambiar el borde a verde
    } else {
        errorField.classList.add('visible'); // Mostrar mensaje de error
        input.style.borderColor = 'red'; // Cambiar el borde a rojo
    }
}


// Validar todo el formulario al enviarlo
function validateForm() {
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');

    validateText(nombre, 15);
    validateText(apellidos, 40);
    validateEmail(email);
    validateNumbers(telefono);

    // Verificar si hay errores visibles
    const errors = document.querySelectorAll('.error-message.visible');
    return errors.length === 0; // Si no hay errores, el formulario se envía
}

   document.addEventListener("DOMContentLoaded", () => {
  // Asignar precios en €
  const precios = {
      productos: {
          "web-basica": 150,  // Página web básica
          "web-avanzada": 300,  // Página web avanzada
          "tienda-online": 500,  // Tienda online
      },
      extras: {
          seo: 50,  // Optimización SEO
          social: 75,  // Gestión de redes sociales
          mantenimiento: 100,  // Mantenimiento mensual
      },
      descuentos: {
          "1mes": 0, // Sin descuento
          "3meses": 0.05, // 5% descuento
          "6meses": 0.10, // 10% descuento
      }
  };

  // Elementos del formulario
  const productoRadios = document.querySelectorAll("input[name='producto']");
  const extrasCheckboxes = document.querySelectorAll("input[name='extras']");
  const plazoSelect = document.getElementById("plazo");
  const totalDisplay = document.getElementById("total-display");

  // Función para calcular el total
  const calcularTotal = () => {
      let total = 0;

      // Sumar producto seleccionado
      const productoSeleccionado = document.querySelector("input[name='producto']:checked");
      if (productoSeleccionado) {
          total += precios.productos[productoSeleccionado.value];
      }

      // Obtener el número de meses seleccionado (plazo)
      const meses = {
          "1mes": 1,
          "3meses": 3,
          "6meses": 6,
      }[plazoSelect.value] || 1; // Si no se selecciona un plazo, por defecto se toma 1 mes

      // Multiplicar el precio del producto por los meses seleccionados
      total *= meses;

      // Sumar extras seleccionados
      extrasCheckboxes.forEach((checkbox) => {
          if (checkbox.checked) {
              total += precios.extras[checkbox.value] * meses; // Extras también se multiplican por los meses
          }
      });

      // Aplicar descuento
      const descuento = precios.descuentos[plazoSelect.value];
      total -= total * descuento;

      // Actualizar el total en pantalla
      totalDisplay.textContent = `Total: ${total.toFixed(2)} €`;
  };

  // Agregar eventos a los elementos del formulario
  productoRadios.forEach((radio) => radio.addEventListener("change", calcularTotal));
  extrasCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", calcularTotal));
  plazoSelect.addEventListener("change", calcularTotal);

  // Calcular total inicial
  calcularTotal();
});
