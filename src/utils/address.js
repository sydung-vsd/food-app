const compact = (address) => {
  if (typeof address !== 'string') {
    return address;
  }
  address = address.toLowerCase();
  address = address.replace('thành phố', 'TP.');
  address = address.replace('thị xã', 'TX.');
  address = address.replace('thị trấn', 'TT.');
  address = address.replace('tỉnh', 'T.');
  address = address.replace('huyện', 'H.');
  address = address.replace('xã', 'X.');

  const addressArr = address.split(' ');
  for (let i = 0; i < addressArr.length; i++) {
    const addressUcfirst = addressArr[i][0].toUpperCase();
    addressArr[i] = addressUcfirst + addressArr[i].slice(1);
  }
  return addressArr.join(' ');
};
const removeAddressDescription = (addressString) => {
  return addressString
    .replace('TP.', '')
    .replace('TX.', '')
    .replace('TT.', '')
    .replace('T.', '')
    .replace('H.', '')
    .replace('X.', '').trim();
};
export const compactAddress = (addressList) => {
  if (addressList) {
    return addressList.map((addressItem) => {
      return {
        ...addressItem,
        name: compact(addressItem.name),
      };
    });
  } else {
    return [];
  }
};

export const shortAddress = (address, provinces, districts, wards) => {
  const { name: wardName } = wards.find((wardItem) => wardItem.code === address.ward);
  const { name: districtName } = districts.find((districtItem) => districtItem.code === address.district);
  const { name: provinceName } = provinces.find((provinceItem) => provinceItem.code === address.province);
  return `${address.street} - ${removeAddressDescription(wardName)} - ${removeAddressDescription(districtName)} - ${removeAddressDescription(provinceName)}`;
};
