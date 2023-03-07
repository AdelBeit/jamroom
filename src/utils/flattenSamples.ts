export const flattenSamples = (samples) => {
  const smallSelection = (acc, instrument) => {
    const firstSampleName = Object.keys(samples[instrument])[0];
    const firstSample = samples[instrument][firstSampleName];
    return {
      ...acc,
      [firstSampleName]: firstSample,
    };
  };
  const selectAll = (acc, instrument) => ({ ...acc, ...samples[instrument] });
  return Object.keys(samples).reduce(selectAll, {});
};
