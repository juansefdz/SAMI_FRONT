const es = {
  meta: {
    title: "SAMI · Servicio Ambulatorio Médico Inmediato",
    description:
      "Solicita una ambulancia en segundos y síguela en tiempo real hasta el hospital indicado. Atención de emergencias 24/7 en Medellín.",
    ogTitle: "SAMI · Tu ambulancia, a un clic",
  },
  nav: {
    howItWorks: "Cómo funciona",
    services: "Servicios",
    audiences: "Para quién",
    about: "Nosotros",
    coverage: "Cobertura",
    contact: "Contacto",
    login: "Ingresar",
    cta: "Pedir ambulancia",
    call: "Llamar",
    faq: "Preguntas",
    menu: "Menú",
    close: "Cerrar",
  },
  hero: {
    eyebrow: "Atención 24/7 · Medellín",
    titleLead: "Tu ambulancia,",
    titleAccent: "a un clic.",
    description:
      "Pide ayuda médica con tu ubicación, sigue la unidad en el mapa y llega al hospital que corresponde. Sin llamadas eternas ni incertidumbre.",
    primary: "Pedir ambulancia",
    secondary: "Sin cuenta, en segundos",
    hotline: "Emergencia vital: llama también al 123",
    call: "Llamar",
    imageAlt: "Baliza de ambulancia encendida de noche",
  },
  tracking: {
    live: "Seguimiento en vivo",
    unit: "Unidad",
    eta: "Llega en",
    hospital: "Hospital asignado",
    level: "Complejidad nivel III",
    note: "Vista ilustrativa",
  },
  marquee: ["Atención 24/7", "Ambulancia básica TAB", "Ambulancia medicalizada TAM", "Traslados programados", "GPS en vivo", "Línea 123"],
  story: {
    kicker: "Así funciona",
    title: "Un servicio, de principio a fin",
    steps: [
      { label: "Solicitud", title: "Pides ayuda desde donde estés", text: "Tu ubicación GPS, la descripción y la gravedad del 1 al 5 llegan al despacho en segundos.", meta: "Paciente · Cl. 10 #43A-30" },
      { label: "Despacho", title: "Asignamos la unidad adecuada", text: "El centro elige la ambulancia disponible y el hospital destino según la complejidad del caso.", meta: "SAM-217 · TAM asignada" },
      { label: "En ruta", title: "La ves acercarse en vivo", text: "La tripulación reporta su posición y tú ves el tiempo estimado de llegada actualizarse.", meta: "Llega en" },
      { label: "Hospital", title: "Llegas al lugar correcto", text: "La unidad te traslada al hospital asignado mientras el paramédico registra la atención.", meta: "Hospital General · Nivel III" },
    ],
  },
  services: {
    kicker: "Servicios",
    title: "La unidad correcta para cada caso",
    items: [
      { tag: "TAM", title: "Ambulancia medicalizada", text: "Soporte vital avanzado con personal y equipos para pacientes críticos." },
      { tag: "TAB", title: "Ambulancia básica", text: "Soporte vital básico para emergencias de baja y media complejidad." },
      { tag: "Programado", title: "Traslados", text: "Entre domicilio, clínicas y hospitales, con hora acordada." },
      { tag: "GPS · 10 s", title: "Seguimiento", text: "La tripulación reporta su posición en vivo desde la terminal." },
    ],
  },
  unit: {
    kicker: "La unidad",
    title: "Ambulancias equipadas, tripulación conectada",
    specs: ["Soporte vital básico y avanzado", "Conductor + paramédico", "GPS reportado cada 10 s", "Anamnesis digital"],
  },
  roles: {
    kicker: "Una plataforma, tres vistas",
    title: "Cada quien ve lo que necesita",
    items: [
      { role: "Cliente", title: "Pide y sigue tu ambulancia", text: "Ubicación con un toque, gravedad, mapa en vivo y tiempo estimado." },
      { role: "Despacho", title: "Coordina toda la flota", text: "Servicios entrantes, asignación de ambulancia y hospital, estado de cada unidad." },
      { role: "Tripulación", title: "Terminal a bordo", text: "App Android/iOS: servicio actual, navegación, GPS en vivo y anamnesis." },
    ],
    mock: { request: "Solicitar ambulancia", severity: "Gravedad", inbound: "Entrantes", assign: "Asignar", start: "Iniciar servicio", live: "GPS en vivo" },
  },
  audiences: {
    kicker: "Para quién",
    title: "Hecho para todos los que intervienen",
    items: [
      { title: "Personas y familias", text: "Asistencia rápida y confiable cuando más la necesitas." },
      { title: "Empresas y aseguradoras", text: "Mejor atención médica para empleados y asegurados." },
      { title: "Servicios de emergencia", text: "Herramientas para coordinar flota, tripulación y despacho." },
      { title: "Hospitales y clínicas", text: "Derivación eficiente y pacientes que llegan al lugar correcto." },
    ],
  },
  about: {
    kicker: "Nosotros",
    title: "Respuesta rápida, atención humana",
    vision: "Visión",
    visionText:
      "Revolucionar la respuesta a emergencias a través de la tecnología, entregando velocidad y seguridad, liderando el sector con innovación constante.",
    mission: "Misión",
    missionText:
      "Proporcionar soluciones médicas de emergencia ágiles y personalizadas, asegurando la confianza del cliente mediante tecnología avanzada y atención excepcional.",
    team: "Equipo fundador",
  },
  contact: {
    kicker: "Alianzas",
    title: "Llevemos SAMI a tu organización",
    text: "Empresas, aseguradoras e instituciones de salud: escríbenos y te mostramos la plataforma.",
    button: "Enviar correo",
    copy: "Copiar correo",
    copied: "Copiado",
  },
  coverage: {
    kicker: "Cobertura",
    title: "Dónde atendemos",
    text: "Nuestras unidades operan hoy en estos municipios del Valle de Aburrá.",
    river: "Río Medellín",
    active: "En servicio",
    missing: "¿Tu municipio no aparece? Escríbenos",
  },
  trust: {
    kicker: "Respaldo",
    title: "Quienes confían en SAMI",
    partners: "Aliados",
    credentials: "Habilitación",
  },
  app: {
    kicker: "App móvil",
    title: "SAMI en tu celular",
    text: "Pide ayuda con un toque y sigue la ambulancia desde la app para Android y iOS. La tripulación usa la misma app como terminal a bordo.",
    available: "Disponible en",
    soon: "Próximamente",
    ios: "App Store",
    android: "Google Play",
  },
  faq: {
    kicker: "Preguntas frecuentes",
    title: "Lo que más nos preguntan",
    items: [
      { q: "¿Necesito una cuenta para pedir una ambulancia?", a: "No. Puedes pedirla solo con tu nombre, tu teléfono y tu ubicación. Después, si quieres, guardas la cuenta con un correo y una contraseña para ver tu historial." },
      { q: "¿Cuándo debo llamar al 123?", a: "Si hay riesgo vital inmediato (la persona no responde, no respira, tiene una hemorragia grave o dolor fuerte en el pecho), llama también a la línea de emergencias 123." },
      { q: "¿Qué diferencia hay entre una ambulancia TAB y una TAM?", a: "La TAB (transporte asistencial básico) da soporte vital básico para casos de baja y media complejidad. La TAM (medicalizada) lleva personal y equipos de soporte vital avanzado para pacientes críticos." },
      { q: "¿Cómo sigo la ambulancia?", a: "Al pedir el servicio ves un mapa con la posición que reporta la tripulación y el tiempo estimado de llegada, que se actualiza en vivo." },
      { q: "¿Cuánto cuesta y lo cubre mi EPS o póliza?", a: "Depende del tipo de servicio y de tu cobertura. Escríbenos y te orientamos antes de que lo necesites." },
      { q: "¿En qué zonas atienden?", a: "Revisa la sección de cobertura. Si tu municipio no aparece, escríbenos para saber cuándo llegaremos." },
    ],
  },
  footer: {
    rights: "Todos los derechos reservados.",
    emergency: "En una emergencia vital llama también a la línea 123.",
    platform: "Ir a la plataforma",
  },
};

export default es;
export type Dictionary = typeof es;
