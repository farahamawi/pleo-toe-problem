import { Expense } from './types';

const publicFields = ['merchant_name', 'amount_in_cents', 'status', 'user_id'];

export function capitalize(word) {
  const str = `${word}`;
  return str[0].toUpperCase() + str.slice(1);
}

export function secureTrim(expense: Expense): string {
  return JSON.stringify(expense, publicFields);
}

export function format(rawExpenses): Expense[] {
  return rawExpenses.map(rawExpense => (
    {
      id: rawExpense.id,
      merchant_name: rawExpense.merchant_name,
      amount_in_cents: rawExpense.amount_in_cents,
      status: rawExpense.status,
      user_id: rawExpense.user_id
    }
  ))
 
}
