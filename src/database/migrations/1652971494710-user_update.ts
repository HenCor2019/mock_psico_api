import {MigrationInterface, QueryRunner} from "typeorm";

export class userUpdate1652971494710 implements MigrationInterface {
    name = 'userUpdate1652971494710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "displayName" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "aboutMe" character varying(200) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '"2022-05-19T14:44:56.085Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '2022-05-09 17:03:35.831'`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "aboutMe"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "displayName"`);
    }

}
