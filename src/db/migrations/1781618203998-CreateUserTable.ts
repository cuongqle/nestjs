import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1781618203998 implements MigrationInterface {
    name = 'CreateUserTable1781618203998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`id1\` varchar(255) NOT NULL, \`id2\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_606ff58b0a7feeef9852c80f21\` (\`id1\`, \`id2\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_606ff58b0a7feeef9852c80f21\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
