import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    // TODO
    // Get the transactions balance
    const transactions = await this.find();

    const balance = transactions.reduce(
      (accumulatedBalance, transaction) => {
        const currentBalance = accumulatedBalance;
        currentBalance[transaction.type] += transaction.value;
        currentBalance.total = currentBalance.income - currentBalance.outcome;
        return currentBalance;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return balance;
  }
}

export default TransactionsRepository;
