import {MigrationInterface, QueryRunner} from "typeorm";

export class pictureCreatedDate1643052406610 implements MigrationInterface {
    name = 'pictureCreatedDate1643052406610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pictures" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pictures" DROP COLUMN "created_at"`);
    }

}
