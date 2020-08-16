// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute({ id }: { id: string }): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const transactionExists = await transactionsRepository.findOne({
      where: {
        id,
      },
    });

    if (!transactionExists) {
      throw new Error('Transaction not found');
    }

    transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
