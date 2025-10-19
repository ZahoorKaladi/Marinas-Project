import { Stethoscope, Ambulance, Baby, FlaskConical, Pill, HeartPulse } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    icon: Stethoscope,
    imageUrl: "https://images.unsplash.com/photo-1629904853716-f07cb66847c2?auto=format&fit=crop&q=80&w=1470",
    title: 'Free OPD',
    slug: 'free-opd',
    description: 'Our Outpatient Department offers free consultations with qualified doctors, basic diagnostics, and medications.',
    fullDescription: `<p class="mb-4 text-lg">Our Free Outpatient Department (OPD) is the first point of contact for patients. We provide free consultations with highly qualified doctors, a thorough physical examination, and basic diagnostics. Our team is committed to a patient-first approach, ensuring that every individual receives compassionate care without the burden of cost. The department is equipped to handle common ailments and provide referrals to our specialized clinics when needed.</p><p class="mt-8 font-bold text-blue-600">For appointments or general inquiries, please <a href="/contact" class="underline">contact us</a>.</p>`,
  },
  {
    id: 2,
    icon: Ambulance,
    imageUrl: "https://images.unsplash.com/photo-1571772922754-00e930f3530c?auto=format&fit=crop&q=80&w=1470",
    title: 'Emergency Services',
    slug: 'emergency-services',
    description: 'We operate a 24/7 emergency department with fully equipped ambulances and trained emergency response teams.',
    fullDescription: `<p class="mb-4 text-lg">In emergencies, every second counts. Our emergency services are available 24/7, with a dedicated team of emergency medical professionals ready to respond to any crisis. Our ambulances are equipped with advanced life-support systems to provide immediate care for trauma, cardiac arrests, and other life-threatening conditions.</p><p class="mb-4 text-lg">We work closely with local authorities in Karachi and Sindh to ensure rapid response and transportation, making sure help is always just a call away.</p><p class="mt-8 font-bold text-blue-600">For emergency assistance, please <a href="/contact" class="underline">contact us</a>.</p>`,
  },
  {
    id: 3,
    icon: Baby,
    imageUrl: "https://images.unsplash.com/photo-1601671954378-b118b2551a3?auto=format&fit=crop&q=80&w=1470",
    title: 'Maternal Care',
    slug: 'maternal-care',
    description: 'We offer a full spectrum of prenatal and postnatal care, including safe delivery services and infant healthcare programs.',
    fullDescription: `<p class="mb-4 text-lg">Maternal health is a cornerstone of our community. Our maternal care program provides comprehensive support from pregnancy to postpartum. We offer regular check-ups, nutritional guidance, and a safe, sterile environment for childbirth. Our dedicated team of gynecologists and nurses ensures both mother and baby receive the best possible care for a healthy start in life.</p><p class="mt-8 font-bold text-blue-600">For more information, please <a href="/contact" class="underline">contact our Maternal Care department</a>.</p>`,
  },
  {
    id: 4,
    icon: FlaskConical,
    imageUrl: "https://images.unsplash.com/photo-1594824403362-e612f15e85c1?auto=format&fit=crop&q=80&w=1470",
    title: 'Lab & Diagnostics',
    slug: 'lab-diagnostics',
    description: 'Our state-of-the-art laboratory provides comprehensive diagnostic services, including blood tests and advanced imaging.',
    fullDescription: `<p class="mb-4 text-lg">An accurate diagnosis is the first step to effective treatment. Our lab and diagnostics department uses modern technology to provide fast and precise results. We offer a wide range of tests, from routine blood work to advanced diagnostic imaging, all at no cost to the patient. Our technicians are highly skilled and committed to providing the best service possible.</p><p class="mt-8 font-bold text-blue-600">For appointments or questions, please <a href="/contact" class="underline">contact our lab directly</a>.</p>`,
  },
  {
    id: 5,
    icon: Pill,
    imageUrl: "https://images.unsplash.com/photo-1585435557343-3b0920317ce4?auto=format&fit=crop&q=80&w=1470",
    title: 'Pharmacy',
    slug: 'pharmacy',
    description: 'We have an on-site pharmacy that provides free medications for low-income patients, ensuring access to life-saving drugs.',
    fullDescription: `<p class="mb-4 text-lg">Our on-site pharmacy is a lifeline for our community. We provide a wide range of essential and life-saving medications at no cost to our patients. Our licensed pharmacists are available to offer guidance on medication use, ensuring that a lack of financial resources never stands in the way of a patient’s recovery.</p><p class="mt-8 font-bold text-blue-600">For a list of available medicines, please <a href="/contact" class="underline">contact our pharmacy</a>.</p>`,
  },
  {
    id: 6,
    icon: HeartPulse,
    imageUrl: "https://images.unsplash.com/photo-1520698188151-50e41793740e?auto=format&fit=crop&q=80&w=1470",
    title: 'Specialized Clinics',
    slug: 'specialized-clinics',
    description: 'Beyond general care, we provide specialized medical services in key areas such as cardiology, pediatrics, and diabetes.',
    fullDescription: `<p class="mb-4 text-lg">Our specialized clinics offer expert care for specific health issues. We have dedicated teams for cardiology, diabetes management, pediatrics, and more. Patients with chronic conditions receive ongoing monitoring, personalized treatment plans, and educational resources to help them live healthier lives.</p><p class="mt-8 font-bold text-blue-600">To schedule an appointment with a specialist, please <a href="/contact" class="underline">call us</a>.</p>`,
  },
];

export default servicesData;
