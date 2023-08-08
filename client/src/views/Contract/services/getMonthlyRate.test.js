import getMonthlyRate from './getMonthlyRate';
test('two plus two', () => {
  // TODO: Return numbers instead of string 
  //   [price + ' CHF', 'Percentage: ' + percentage + '%']
  const mockContract = {
    OSPercentage: 75,
    noOSPercentage: 30,
    OSMaxTimeInMonths: 12,
    PSFPercentage: 85,
    noPSFPercentage: 40,
    PSFMaxTimeInMonths: 9,
    deathMonth: 5,
    progressionMonth: 7,
  };
  let mockDuration = 10;
  let mockPrice = 1000;
  const [price, percentage] = getMonthlyRate(
    mockContract,
    mockDuration,
    mockPrice,
  );
  const priceProcessed = price.split(' ')[0] * 1;
  let percentageProcessed = percentage.split(' ')[1];
  percentageProcessed =
    percentageProcessed.substring(0, percentageProcessed.length - 1) * 1;
  expect(priceProcessed).toBe(30);
  expect(percentageProcessed).toBe(30);
});
