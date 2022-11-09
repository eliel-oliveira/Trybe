export const mockFetch = (data) => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(data),
  })};

export const mockLocalStorage = (itemKey, itemValue) => {
  jest.spyOn(localStorage.__proto__, 'getItem');
  jest.spyOn(localStorage.__proto__, 'setItem');
  // A linha seguinte serve para definir algum valor inicial no localStorage.
  // É últil se o componente precisar desse valor na renderização inicial.
  localStorage.setItem(itemKey, itemValue);

  localStorage.__proto__.setItem = jest.fn().mockImplementation((key, value) => localStorage[key] = value);
  localStorage.__proto__.getItem = jest.fn().mockImplementation((key) => localStorage[key])
};
