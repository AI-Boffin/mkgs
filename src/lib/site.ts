export const site = {
  name: 'MK Gas Safety',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mk-gas-safety-ram.it-boffins-9422.chatgpt.site',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '',
  gasSafeNumber: process.env.NEXT_PUBLIC_GAS_SAFE_NUMBER || '',
  publicIndexing: process.env.NEXT_PUBLIC_ENABLE_INDEXING === 'true',
};
export const areas = [
  { slug: 'milton-keynes', name: 'Milton Keynes', postcode: 'MK', colour: 'orange', description: 'From city-centre flats to family homes, arrange a gas safety check for your Milton Keynes property directly with Ram.', detail: 'Let Ram know your Milton Keynes postcode, the appliances you would like checked and any access arrangements. He will confirm coverage, the scope of the visit and a quote by email.' },
  { slug: 'buckingham', name: 'Buckingham', postcode: 'MK18', colour: 'green', description: 'Local gas safety checks for Buckingham landlords, homeowners and letting agents, with straightforward email booking.', detail: 'For a rental property or your own home in Buckingham, send the property postcode and appliance details. Ram will confirm availability and pricing before you agree a visit.' },
  { slug: 'newport-pagnell', name: 'Newport Pagnell', postcode: 'MK16', colour: 'purple', description: 'A personal approach to gas safety for homes and rental properties in Newport Pagnell.', detail: 'Planning an annual landlord check in Newport Pagnell? Include your current record’s due date when you enquire so Ram can discuss a suitable appointment. All appointments are confirmed by email.' },
] as const;
export const faqs = [
  { question: 'Is an annual gas safety check a legal requirement?', answer: 'For rented homes, landlords generally must arrange a gas safety check on the gas appliances and flues they provide at least every 12 months, carried out by an appropriately qualified Gas Safe registered engineer. Owner-occupiers do not have the same annual landlord-check duty; regular checks and servicing are still recommended for safety.' },
  { question: 'What is a landlord gas safety record (CP12)?', answer: 'It is the written record of a landlord’s gas safety check, often called a gas safety certificate or CP12. It records the appliances and flues checked, the findings and any safety issues. A record documents the result of the inspection; it does not mean an unsafe appliance has passed.' },
  { question: 'How much does a gas safety check cost?', answer: 'Landlord gas safety checks cost £50 for one appliance, £65 for two or £80 for three. With one carbon monoxide alarm supplied and fitted, the totals are £80, £95 and £110 respectively. These prices are per property. More than three appliances, multiple properties, servicing and repairs require a separate quote. Ram confirms the scope and final total before booking. We are currently unable to certify Powermax boilers.' },
  { question: 'Is a boiler service the same as a gas safety check?', answer: 'No. A gas safety check assesses the safety of appliances and flues within the agreed scope. A boiler service follows the manufacturer’s maintenance instructions. One does not automatically replace the other. Let Ram know what you need so the scope is agreed before the visit.' },
  { question: 'When should tenants receive the record?', answer: 'Landlords must normally give existing tenants a copy within 28 days of the check and new tenants a copy before they move in. Landlords must keep the record for at least two years. See the linked HSE guidance for the full requirements and exceptions.' },
  { question: 'What happens if an appliance is unsafe?', answer: 'The engineer will explain the issue, record the findings and advise on the action needed. Depending on the risk, an appliance may need to be turned off or disconnected in line with the applicable unsafe-situations procedure. Do not use an appliance that has been identified as unsafe.' },
  { question: 'How do I prepare for the visit?', answer: 'Make sure the gas meter, appliances and flues are accessible, arrange access with any tenants, and have your previous gas safety record available if you have one. Tell Ram about known faults and the number of appliances before the appointment.' },
  { question: 'Can I arrange everything by email?', answer: 'Yes. Email is the main way to contact Ram. Send your property details, the service you need and your preferred timing. Ram will reply to discuss the quote and availability. Submitting an enquiry does not confirm an appointment.' },
];
