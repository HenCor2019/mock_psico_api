import {MigrationInterface, QueryRunner} from "typeorm";

export class init1651993624266 implements MigrationInterface {
    name = 'init1651993624266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Roles" ("role_id" SERIAL NOT NULL, "role" character varying(50) NOT NULL, CONSTRAINT "PK_cd75cb9c31c4d9845171294eef6" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("user_id" SERIAL NOT NULL, "fullname" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "photo" character varying(150) NOT NULL, "hashRefreshToken" character varying, CONSTRAINT "PK_8785e595618207cdd87e37b742b" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "users_roles_roles" ("usersUserId" integer NOT NULL, "rolesRoleId" integer NOT NULL, CONSTRAINT "PK_bc84ab4ca6284384c07c2a7f1fc" PRIMARY KEY ("usersUserId", "rolesRoleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2180422b0bd403dac542b76d18" ON "users_roles_roles" ("usersUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b5542d4b402c96e89293ded68f" ON "users_roles_roles" ("rolesRoleId") `);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_2180422b0bd403dac542b76d183" FOREIGN KEY ("usersUserId") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b5542d4b402c96e89293ded68f7" FOREIGN KEY ("rolesRoleId") REFERENCES "Roles"("role_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b5542d4b402c96e89293ded68f7"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_2180422b0bd403dac542b76d183"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5542d4b402c96e89293ded68f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2180422b0bd403dac542b76d18"`);
        await queryRunner.query(`DROP TABLE "users_roles_roles"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
    }

}
