import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    // Check the type of the transaction and if it is less than the total balance
    if (type === 'outcome') {
      if ((await transactionsRepository.getBalance()).total - value < 0) {
        throw new AppError(
          'Outcome transactions must be less than the total balance',
        );
      }
    }
    // Check if the category is already created with the same title
    const checkCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (checkCategory) {
      const transaction = transactionsRepository.create({
        title,
        value,
        type,
        category: checkCategory,
      });
      await transactionsRepository.save(transaction);

      return transaction;
    }

    const createdCategory = await categoriesRepository.create({
      title: category,
    });

    await categoriesRepository.save(createdCategory);

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: createdCategory,
    });

    // Create the transaction in the TransactionsRepository
    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
