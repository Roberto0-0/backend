import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675277430209 implements MigrationInterface {
    name = 'default1675277430209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d0af6f5866201d5cb424767744\` ON \`companies\``);
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD UNIQUE INDEX \`IDX_5fc5f722482cb60492fb62d70e\` (\`company\`)`);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD CONSTRAINT \`FK_6d64e8c7527a9e4af83cc66cbf7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` DROP FOREIGN KEY \`FK_6d64e8c7527a9e4af83cc66cbf7\``);
        await queryRunner.query(`ALTER TABLE \`companies\` DROP INDEX \`IDX_5fc5f722482cb60492fb62d70e\``);
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d0af6f5866201d5cb424767744\` ON \`companies\` (\`email\`)`);
    }

}
