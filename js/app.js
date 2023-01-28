document.addEventListener('DOMContentLoaded', () => {
    // Objeto para ir guardando lo que el usuario llene
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // cargar elementos
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario'); // seleccionamos al padre para inyectarle el HTML como hijos
    const spinner = document.querySelector('#spinner');
    
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')

    // asignar eventos
    // blur: se activa cuando el usuario se sale del campo
    // input: se activa cuando se esta escribiendo
    inputEmail.addEventListener('input', validar); // la funcion se pone sin parentesis
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', e => {
        e.preventDefault(); // prevenir su accionar

        // reiniciar objeto
        resetFormulario();
    })

    function validar(e){ // pasa por parametro lo que captura el evento
        //console.log(e.target.value);
        //console.log(e.target.id); // para saber que disparo el evento
        if(e.target.value.trim() === ''){ // trim me quita espacios vacios
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return; // detiene la ejecucion del codigo
        } 

        // validar el formato correcto del correo
        if(e.target.id == 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El mail no es valido', e.target.parentElement);
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }

        //console.log('Holis'); // esto no aparece si se ejecuta lo de arriba por el return
        limpiarAlerta(e.target.parentElement);

        // Agregar los valorse en el objeto mail
        email[e.target.id] = e.target.value.trim().toLowerCase();
        //console.log(email);

        // comprobar el objeto objeto email
        comprobarEmail();
    }
    function mostrarAlerta(m, ref){ // se pasa por parametro la informacion del template element de arriba para crear el parrafo
        //console.log('hubo un error');
        limpiarAlerta(ref);

        // generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = m;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // inyectar error al form
        ref.appendChild(error); // crea un hijo al final del form
        //formulario.innerHTML = alerta.innerHTML; // cambia todo el form por este nuevo elemento
    }
    
    // comprueba si hay una alerta
    function limpiarAlerta(ref){
        //console.log('limpiando...');
        const alerta = ref.querySelector('.bg-red-600'); // buscar solo en el elemento de referencia
        if(alerta){
            alerta.remove();
        }
    }
    function validarEmail(mail){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(mail);
        return resultado;
        console.log(resultado);
    }

    function comprobarEmail(){
        console.log(email);
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
        
    }

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.remove('hidden');
        spinner.classList.add('flex');

        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            resetFormulario();
            
            // Crear alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado con exito';
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
    }

    function resetFormulario(){
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }
});