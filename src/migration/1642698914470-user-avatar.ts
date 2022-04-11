import {MigrationInterface, QueryRunner} from "typeorm";

export class userAvatar1642698914470 implements MigrationInterface {
    name = 'userAvatar1642698914470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying NOT NULL DEFAULT 'https://umcs-webdev-bucket.s3.eu-central-1.amazonaws.com/avatars/default.jpeg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    }

}
