import {MigrationInterface, QueryRunner} from "typeorm";

export class pictureTagsJoinTable1642693304598 implements MigrationInterface {
    name = 'pictureTagsJoinTable1642693304598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pictures_tags" ("picture_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_7da9035d0554b81f2c23825f2ec" PRIMARY KEY ("picture_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb40383168f01ea40d34a8c06a" ON "pictures_tags" ("picture_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_34913dfa70b2825c8bc2bc0978" ON "pictures_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "pictures_tags" ADD CONSTRAINT "FK_eb40383168f01ea40d34a8c06a5" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pictures_tags" ADD CONSTRAINT "FK_34913dfa70b2825c8bc2bc09784" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pictures_tags" DROP CONSTRAINT "FK_34913dfa70b2825c8bc2bc09784"`);
        await queryRunner.query(`ALTER TABLE "pictures_tags" DROP CONSTRAINT "FK_eb40383168f01ea40d34a8c06a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34913dfa70b2825c8bc2bc0978"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb40383168f01ea40d34a8c06a"`);
        await queryRunner.query(`DROP TABLE "pictures_tags"`);
    }

}
