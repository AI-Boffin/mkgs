export const landlordPrices = [
  { appliances: 1, price: 50, example: 'For example, a boiler only' },
  { appliances: 2, price: 65, example: 'For example, a boiler and gas hob' },
  { appliances: 3, price: 80, example: 'For example, a boiler, gas hob and gas fire' },
] as const;

export const carbonMonoxideAlarmPrice = 30;
export const packageSelectionEvent = 'mkgs:select-package';

export type PackageSelection = { appliances: 1 | 2 | 3; withAlarm: boolean };

export function getLandlordPrice(appliances: number, withAlarm: boolean) {
  const plan = landlordPrices.find(plan => plan.appliances === appliances);
  return plan ? plan.price + (withAlarm ? carbonMonoxideAlarmPrice : 0) : undefined;
}
