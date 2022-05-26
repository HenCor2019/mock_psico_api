import {MigrationInterface, QueryRunner} from "typeorm";

export class request1653517139275 implements MigrationInterface {
    name = 'request1653517139275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request" ("requesId" SERIAL NOT NULL, "professionalSlogan" character varying(200) NOT NULL DEFAULT '', "cv" character varying(200) NOT NULL, "userIdUserId" integer, CONSTRAINT "PK_65b95117d5e8f4dfc38c99e36f6" PRIMARY KEY ("requesId"))`);
        await queryRunner.query(`CREATE TABLE "request_specialities_categories" ("requestRequesId" integer NOT NULL, "categoriesCategoryId" integer NOT NULL, CONSTRAINT "PK_21ab39457eab7bcc7716edf55e4" PRIMARY KEY ("requestRequesId", "categoriesCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a97f2201c4fb4ce9fc8bec9906" ON "request_specialities_categories" ("requestRequesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_69b7c02ee2e5f7d96744c07bd7" ON "request_specialities_categories" ("categoriesCategoryId") `);
        await queryRunner.query(`CREATE TABLE "users_specialities_categories" ("usersUserId" integer NOT NULL, "categoriesCategoryId" integer NOT NULL, CONSTRAINT "PK_a967af5128315cc5311af1de0cd" PRIMARY KEY ("usersUserId", "categoriesCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9438fa00ca5accb68595ce98f" ON "users_specialities_categories" ("usersUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c406ad73aae303d7aa013c34c" ON "users_specialities_categories" ("categoriesCategoryId") `);
        await queryRunner.query(`ALTER TABLE "Users" ADD "professionalSlogan" character varying(200) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '"2022-05-25T22:19:00.736Z"'`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_1a24b5297268955471abb0b44a4" FOREIGN KEY ("userIdUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_specialities_categories" ADD CONSTRAINT "FK_a97f2201c4fb4ce9fc8bec99065" FOREIGN KEY ("requestRequesId") REFERENCES "request"("requesId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "request_specialities_categories" ADD CONSTRAINT "FK_69b7c02ee2e5f7d96744c07bd7e" FOREIGN KEY ("categoriesCategoryId") REFERENCES "Categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_specialities_categories" ADD CONSTRAINT "FK_a9438fa00ca5accb68595ce98f1" FOREIGN KEY ("usersUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_specialities_categories" ADD CONSTRAINT "FK_0c406ad73aae303d7aa013c34c4" FOREIGN KEY ("categoriesCategoryId") REFERENCES "Categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_specialities_categories" DROP CONSTRAINT "FK_0c406ad73aae303d7aa013c34c4"`);
        await queryRunner.query(`ALTER TABLE "users_specialities_categories" DROP CONSTRAINT "FK_a9438fa00ca5accb68595ce98f1"`);
        await queryRunner.query(`ALTER TABLE "request_specialities_categories" DROP CONSTRAINT "FK_69b7c02ee2e5f7d96744c07bd7e"`);
        await queryRunner.query(`ALTER TABLE "request_specialities_categories" DROP CONSTRAINT "FK_a97f2201c4fb4ce9fc8bec99065"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_1a24b5297268955471abb0b44a4"`);
        await queryRunner.query(`ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '2022-05-20 05:25:47.11'`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "professionalSlogan"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c406ad73aae303d7aa013c34c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9438fa00ca5accb68595ce98f"`);
        await queryRunner.query(`DROP TABLE "users_specialities_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_69b7c02ee2e5f7d96744c07bd7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a97f2201c4fb4ce9fc8bec9906"`);
        await queryRunner.query(`DROP TABLE "request_specialities_categories"`);
        await queryRunner.query(`DROP TABLE "request"`);
    }

}
