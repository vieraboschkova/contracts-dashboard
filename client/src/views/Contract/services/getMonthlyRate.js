const getMonthlyRate = (contract, duration, priceInCHF) => {
  const {
    OSPercentage,
    noOSPercentage,
    OSMaxTimeInMonths,
    PSFPercentage,
    noPSFPercentage,
    PSFMaxTimeInMonths,
    deathMonth,
    progressionMonth,
  } = contract;

  let price;
  let percentage;
  if (progressionMonth && progressionMonth < PSFMaxTimeInMonths) {
    if (deathMonth && deathMonth < OSMaxTimeInMonths) {
      percentage = noOSPercentage;
    } else {
      percentage = OSPercentage;
    }
  } else {
    if (progressionMonth && progressionMonth < OSMaxTimeInMonths) {
      percentage = noPSFPercentage;
    } else {
      percentage = PSFPercentage;
    }
  }
  price = (priceInCHF / duration) * (percentage / 100);

  return [price + ' CHF', 'Percentage: ' + percentage + '%'];
};
export default getMonthlyRate;
