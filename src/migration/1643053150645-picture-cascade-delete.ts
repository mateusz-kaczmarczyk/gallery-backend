import {MigrationInterface, QueryRunner} from "typeorm";

export class pictureCascadeDelete1643053150645 implements MigrationInterface {
    name = 'pictureCascadeDelete1643053150645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_3dd8a7d4a2fabb14fe2bfbe65b9"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_3dd8a7d4a2fabb14fe2bfbe65b9" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_3dd8a7d4a2fabb14fe2bfbe65b9"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_3dd8a7d4a2fabb14fe2bfbe65b9" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
