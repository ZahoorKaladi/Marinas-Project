import { Stethoscope, Ambulance, Baby, FlaskConical, Pill, HeartPulse } from 'lucide-react';

const servicesHomepageData = [
  {
    id: 1,
    icon: Stethoscope,
    title: 'Free OPD',
    description: 'Outpatient department services including consultations with qualified doctors, basic diagnostics, and medications.',
    slug: 'free-opd',
  },
  {
    id: 2,
    icon: Ambulance,
    title: 'Emergency Services',
    description: '24/7 emergency care with fully equipped ambulances and trained emergency response teams.',
    slug: 'emergency-services',
  },
  {
    id: 3,
    icon: Baby,
    title: 'Maternal Care',
    description: 'Prenatal and postnatal care, safe delivery services, and infant healthcare programs.',
    slug: 'maternal-care',
  },
  {
    id: 4,
    icon: FlaskConical,
    title: 'Lab & Diagnostics',
    description: 'Comprehensive laboratory services including blood tests, imaging, and other diagnostic procedures.',
    slug: 'lab-diagnostics',
  },
  {
    id: 5,
    icon: Pill,
    title: 'Pharmacy',
    description: 'Free medications for low-income patients and subsidized medicines for others.',
    slug: 'pharmacy',
  },
  {
    id: 6,
    icon: HeartPulse,
    title: 'Specialized Clinics',
    description: 'Specialized care in cardiology, diabetes, pediatrics, and other critical health areas.',
    slug: 'specialized-clinics',
  },
];

export default servicesHomepageData;