import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1652065986521 implements MigrationInterface {
  name = 'init1652065986521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Categories" ("categoryId" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_10c1b454629a8cef1a75818564c" PRIMARY KEY ("categoryId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Roles" ("role_id" SERIAL NOT NULL, "role" character varying(50) NOT NULL, CONSTRAINT "PK_cd75cb9c31c4d9845171294eef6" PRIMARY KEY ("role_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Tips" ("tipId" SERIAL NOT NULL, "description" character varying(200) NOT NULL, "userIdUserId" integer, CONSTRAINT "PK_02c3879f6c3e89cb39db7ab64cc" PRIMARY KEY ("tipId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Users" ("userId" SERIAL NOT NULL, "fullname" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "hashPassword" character varying(200) NOT NULL, "photo" character varying(150) NOT NULL, "hashRefreshToken" character varying(200), CONSTRAINT "PK_a06d29e81a4b836dddfd684ab87" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Testimonials" ("testimonyId" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(150) NOT NULL, "userIdUserId" integer, CONSTRAINT "PK_56b1d06d572a150de8ef4ac784e" PRIMARY KEY ("testimonyId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tips_categories_categories" ("tipsTipId" integer NOT NULL, "categoriesCategoryId" integer NOT NULL, CONSTRAINT "PK_8fbe300c2521b05d8ceb6f8418f" PRIMARY KEY ("tipsTipId", "categoriesCategoryId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e0a1fa1ab9e9fe2d51851ec40e" ON "tips_categories_categories" ("tipsTipId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_10a4e142dca56d87e928e029fb" ON "tips_categories_categories" ("categoriesCategoryId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users_roles_roles" ("usersUserId" integer NOT NULL, "rolesRoleId" integer NOT NULL, CONSTRAINT "PK_bc84ab4ca6284384c07c2a7f1fc" PRIMARY KEY ("usersUserId", "rolesRoleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2180422b0bd403dac542b76d18" ON "users_roles_roles" ("usersUserId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b5542d4b402c96e89293ded68f" ON "users_roles_roles" ("rolesRoleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "Tips" ADD CONSTRAINT "FK_82fca49e499768047746e0f9e2c" FOREIGN KEY ("userIdUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Testimonials" ADD CONSTRAINT "FK_e082dcf0fb679d26c556eb7f182" FOREIGN KEY ("userIdUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tips_categories_categories" ADD CONSTRAINT "FK_e0a1fa1ab9e9fe2d51851ec40e5" FOREIGN KEY ("tipsTipId") REFERENCES "Tips"("tipId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tips_categories_categories" ADD CONSTRAINT "FK_10a4e142dca56d87e928e029fb9" FOREIGN KEY ("categoriesCategoryId") REFERENCES "Categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_2180422b0bd403dac542b76d183" FOREIGN KEY ("usersUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b5542d4b402c96e89293ded68f7" FOREIGN KEY ("rolesRoleId") REFERENCES "Roles"("role_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `INSERT INTO "Categories" (name) VALUES ('Cocaina'), ('Anfetamina'), ('Alcohol'), ('Benzodiacepinas'), ('Cannabis'), ('LSD'), ('éxtasis'), ('PCP')`,
    );
    await queryRunner.query(
      `INSERT INTO "Roles" (role) values ('User'),('Psychologist'),('Moderator'),('Admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b5542d4b402c96e89293ded68f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_2180422b0bd403dac542b76d183"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tips_categories_categories" DROP CONSTRAINT "FK_10a4e142dca56d87e928e029fb9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tips_categories_categories" DROP CONSTRAINT "FK_e0a1fa1ab9e9fe2d51851ec40e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Testimonials" DROP CONSTRAINT "FK_e082dcf0fb679d26c556eb7f182"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tips" DROP CONSTRAINT "FK_82fca49e499768047746e0f9e2c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b5542d4b402c96e89293ded68f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2180422b0bd403dac542b76d18"`,
    );
    await queryRunner.query(`DROP TABLE "users_roles_roles"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_10a4e142dca56d87e928e029fb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e0a1fa1ab9e9fe2d51851ec40e"`,
    );
    await queryRunner.query(`DROP TABLE "tips_categories_categories"`);
    await queryRunner.query(`DROP TABLE "Testimonials"`);
    await queryRunner.query(`DROP TABLE "Users"`);
    await queryRunner.query(`DROP TABLE "Tips"`);
    await queryRunner.query(`DROP TABLE "Roles"`);
    await queryRunner.query(`DROP TABLE "Categories"`);
  }
}
