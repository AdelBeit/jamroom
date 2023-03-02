import React from "react";

export const baseURL = (instrument) => {
  switch (instrument) {
    case "toms":
    case "tom":
      return "./samples/drums/toms/";
    case "snares":
    case "snare":
      return "./samples/drums/snares/";
    case "hi_hats":
    case "hi_hat":
    case "hihats":
    case "hihat":
      return "./samples/drums/hi_hats/";
    case "closed_hats":
    case "closed_hat":
    case "closedhats":
    case "closedhat":
      return "./samples/drums/closed_hats/";
    case "kicks":
    case "kick":
      return "./samples/drums/kicks/";
    case "keyboard":
    case "keys":
      return "./samples/piano/";
    case "keyboard":
    case "keys":
      return "./samples/piano/";
    default:
      return "./samples/";
  }
};

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

export const preventDefault = (e: React.TouchEvent | React.MouseEvent) => {
  e.preventDefault();
};

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();

    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

export const setCookie = (name: string, value: string, expDays = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();

  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}