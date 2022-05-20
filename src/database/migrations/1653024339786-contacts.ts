import {MigrationInterface, QueryRunner} from "typeorm";

export class contacts1653024339786 implements MigrationInterface {
    name = 'contacts1653024339786'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_contacts_users" ("usersUserId_1" integer NOT NULL, "usersUserId_2" integer NOT NULL, CONSTRAINT "PK_4112f5a98380e52db42c289686b" PRIMARY KEY ("usersUserId_1", "usersUserId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2d48ac8b8c647356bd3a85ab55" ON "users_contacts_users" ("usersUserId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_e53d8cecc388902c86b675ac2f" ON "users_contacts_users" ("usersUserId_2") `);
        await queryRunner.query(`ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '"2022-05-20T05:25:47.110Z"'`);
        await queryRunner.query(`ALTER TABLE "users_contacts_users" ADD CONSTRAINT "FK_2d48ac8b8c647356bd3a85ab551" FOREIGN KEY ("usersUserId_1") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_contacts_users" ADD CONSTRAINT "FK_e53d8cecc388902c86b675ac2ff" FOREIGN KEY ("usersUserId_2") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_contacts_users" DROP CONSTRAINT "FK_e53d8cecc388902c86b675ac2ff"`);
        await queryRunner.query(`ALTER TABLE "users_contacts_users" DROP CONSTRAINT "FK_2d48ac8b8c647356bd3a85ab551"`);
        await queryRunner.query(`ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '2022-05-19 14:44:56.085'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e53d8cecc388902c86b675ac2f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d48ac8b8c647356bd3a85ab55"`);
        await queryRunner.query(`DROP TABLE "users_contacts_users"`);
    }

}
