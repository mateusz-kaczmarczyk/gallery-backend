import {MigrationInterface, QueryRunner} from "typeorm";

export class initPictureTable1642113881348 implements MigrationInterface {
    name = 'initPictureTable1642113881348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pictures" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "private" boolean NOT NULL, "path" character varying NOT NULL, "extension" character varying NOT NULL, CONSTRAINT "PK_7aa5e10dd31983e9f05b9f1fc85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pictures" ADD CONSTRAINT "FK_c647ed24872743b25024ee4f8b4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pictures" DROP CONSTRAINT "FK_c647ed24872743b25024ee4f8b4"`);
        await queryRunner.query(`DROP TABLE "pictures"`);
    }

}
