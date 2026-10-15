# Landlord pricing

Transcribed from the two pricing screenshots supplied by the user on 15 October 2026. The text is legible. `pricesone.jpeg` shows the CO alarm packages; `pricestwo.jpeg` shows checks without a new alarm. The reference files remain outside the repository.

| Gas appliances at one property | Check only | Check + one CO alarm supplied and fitted |
| --- | --- | --- |
| 1 | £50 | £80 |
| 2 | £65 | £95 |
| 3 | £80 | £110 |

The difference is £30 per property for one carbon monoxide alarm supplied and fitted. The old MK1–MK6 labels describe the packages; they are not postcode coverage restrictions.

Both screenshots also state:

- Ensure access to the property before booking.
- Currently unable to certify Powermax boilers.

The site includes these restrictions. It does not imply that selecting a package confirms an appointment or guarantees a safety pass. More than three appliances, multiple properties, servicing and repairs require a quote.

VAT treatment and the alarm's make, model, warranty and any future replacement service are not stated in the screenshots. No claims about these have been added. Confirm the final total and scope before accepting a booking; confirm tax presentation before public launch.

Price data is defined in `src/lib/pricing.ts`. The homepage pricing toggle, enquiry form package summary and structured offers use that data. Package selections fill the landlord service, exact appliance count and alarm choice in the enquiry form. The selected details and listed total appear in the enquiry draft. If the visitor changes the count or alarm option, the total updates; if the visitor selects a service or count without a listed package, no package price is shown.
