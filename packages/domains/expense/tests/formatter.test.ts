import { capitalize, format, secureTrim } from '../formatter';

describe('[Packages | Expense-domain | Formatter] capitalize', () => {
  test('capitalize should make the first character as a capital letter', () => {
    return expect(capitalize('mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on already capitalized word', () => {
    return expect(capitalize('Mario')).toEqual('Mario');
  });

  test('capitalize should do nothing on numbers', () => {
    return expect(capitalize(123)).toEqual('123');
  });

  test('capitalize should do nothing on strings of numbers', () => {
    return expect(capitalize('123')).toEqual('123');
  });
});

describe('[Packages | Expense-domain | Formatter] secureTrim', () => {
  test('secureTrim should remove fields that are not defined in the list of public fields', () => {
    return expect(secureTrim({
      id: '314d54f4-8a5f-4c1d-b735-426b54794a44',
      merchant_name: 'Sliders',
      amount_in_cents: 12000,
      currency: 'DKK',
      status: 'processed',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a4744'
    })).toEqual(JSON.stringify({
      merchant_name: 'Sliders',
      amount_in_cents: 12000,
      status: 'processed',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a4744'
    }));
  });
});

describe('[Packages | Expense-domain | Formatter] format', () => {
  test('format should return an set of expenses that fits the API model, based on the db raw value', () => {
    return expect(format([{
      id: '314d54f4-8a5f-4c1d-b735-426b54794a44',
      merchant_name: 'Sliders',
      amount_in_cents: 12000,
      currency: 'DKK',
      status: 'processed',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a4744'
    }])).toEqual([{
      id: '314d54f4-8a5f-4c1d-b735-426b54794a44',
      merchant_name: 'Sliders',
      amount_in_cents: 12000,
      status: 'processed',
      user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a4744'
    }]);
  });
});
