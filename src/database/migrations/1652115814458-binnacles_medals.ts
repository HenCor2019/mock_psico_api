import { MigrationInterface, QueryRunner } from 'typeorm';

export class binnaclesMedals1652115814458 implements MigrationInterface {
  name = 'binnaclesMedals1652115814458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Moods" ("moodId" SERIAL NOT NULL, "mood" character varying(50) NOT NULL, "url" character varying(200) NOT NULL, CONSTRAINT "PK_b51a1fac74a8e7127df24b486d0" PRIMARY KEY ("moodId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Medals" ("medalId" SERIAL NOT NULL, "medal" character varying(50) NOT NULL, "thumbnail" character varying(200) NOT NULL, CONSTRAINT "PK_5b1156b328e681cafca258469d9" PRIMARY KEY ("medalId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Binnacles" ("binnacleId" SERIAL NOT NULL, "thought" character varying(200) NOT NULL, "binnacleDate" date NOT NULL, "userIdUserId" integer, "moodIdMoodId" integer, CONSTRAINT "PK_a14f0eac14ae1de36d99d59e27c" PRIMARY KEY ("binnacleId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_medals_medals" ("usersUserId" integer NOT NULL, "medalsMedalId" integer NOT NULL, CONSTRAINT "PK_be8ef52ae7684fa9630c5300aac" PRIMARY KEY ("usersUserId", "medalsMedalId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce5916c38636d901aa9b66ee62" ON "users_medals_medals" ("usersUserId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df5e8ea8dab36015dc472f8371" ON "users_medals_medals" ("medalsMedalId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '"2022-05-09T17:03:35.831Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Binnacles" ADD CONSTRAINT "FK_62de33bf7e6e8b29d9d23eb1b86" FOREIGN KEY ("userIdUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Binnacles" ADD CONSTRAINT "FK_f8a7cb5801c766e6701d5c0048d" FOREIGN KEY ("moodIdMoodId") REFERENCES "Moods"("moodId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_medals_medals" ADD CONSTRAINT "FK_ce5916c38636d901aa9b66ee623" FOREIGN KEY ("usersUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_medals_medals" ADD CONSTRAINT "FK_df5e8ea8dab36015dc472f8371e" FOREIGN KEY ("medalsMedalId") REFERENCES "Medals"("medalId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `INSERT INTO "Moods" (mood, url) VALUES ('Feliz', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png'), ('Enojado', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png'), ('Neutral', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png'), ('Triste', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png'), ('Inspirado', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png')`,
    );
    await queryRunner.query(
      `INSERT INTO "Medals" (medal, thumbnail) VALUES ('Silver', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652115266/medalA_gi1nu8.png')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_medals_medals" DROP CONSTRAINT "FK_df5e8ea8dab36015dc472f8371e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_medals_medals" DROP CONSTRAINT "FK_ce5916c38636d901aa9b66ee623"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Binnacles" DROP CONSTRAINT "FK_f8a7cb5801c766e6701d5c0048d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Binnacles" DROP CONSTRAINT "FK_62de33bf7e6e8b29d9d23eb1b86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '2022-05-09 08:15:08.533'`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df5e8ea8dab36015dc472f8371"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce5916c38636d901aa9b66ee62"`,
    );
    await queryRunner.query(`DROP TABLE "users_medals_medals"`);
    await queryRunner.query(`DROP TABLE "Binnacles"`);
    await queryRunner.query(`DROP TABLE "Medals"`);
    await queryRunner.query(`DROP TABLE "Moods"`);
  }
}
