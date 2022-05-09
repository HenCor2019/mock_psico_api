import {MigrationInterface, QueryRunner} from "typeorm";

export class goals1652084107096 implements MigrationInterface {
    name = 'goals1652084107096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Goals" ("goalId" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(200) NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT '"2022-05-09T08:15:08.533Z"', "finishDate" TIMESTAMP NOT NULL, "completed" boolean NOT NULL DEFAULT false, "userIdUserId" integer, CONSTRAINT "PK_c0b0a664e1803fd40dc4ea1392a" PRIMARY KEY ("goalId"))`);
        await queryRunner.query(`ALTER TABLE "Goals" ADD CONSTRAINT "FK_9f05d0589f4d49e2b86d99ab1f6" FOREIGN KEY ("userIdUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Goals" DROP CONSTRAINT "FK_9f05d0589f4d49e2b86d99ab1f6"`);
        await queryRunner.query(`DROP TABLE "Goals"`);
    }

}
