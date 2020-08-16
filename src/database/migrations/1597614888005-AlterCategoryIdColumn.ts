import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterCategoryIdColumn1597614888005
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'transactions',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'transactions',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
      }),
    );
  }
}
