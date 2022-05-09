import { MigrationInterface, QueryRunner } from 'typeorm';

export class binnacles1652109931301 implements MigrationInterface {
  name = 'binnacles1652109931301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Moods" ("moodId" SERIAL NOT NULL, "mood" character varying(50) NOT NULL, "url" character varying(200) NOT NULL, CONSTRAINT "PK_b51a1fac74a8e7127df24b486d0" PRIMARY KEY ("moodId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Binnacles" ("binnacleId" SERIAL NOT NULL, "thought" character varying(200) NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT '"2022-05-09T15:25:32.712Z"', "userIdUserId" integer, "moodIdMoodId" integer, CONSTRAINT "PK_a14f0eac14ae1de36d99d59e27c" PRIMARY KEY ("binnacleId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '"2022-05-09T15:25:32.681Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "Binnacles" ADD CONSTRAINT "FK_62de33bf7e6e8b29d9d23eb1b86" FOREIGN KEY ("userIdUserId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Binnacles" ADD CONSTRAINT "FK_f8a7cb5801c766e6701d5c0048d" FOREIGN KEY ("moodIdMoodId") REFERENCES "Moods"("moodId") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `INSERT INTO "Moods" (mood, url) VALUES ('Feliz', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png'), ('Enojado', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png'), ('Neutral', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png'), ('Triste', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png'), ('Inspirado', 'https://res.cloudinary.com/dqmkha2os/image/upload/v1652110070/profiles/image_12_jfo4pc.png')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Binnacles" DROP CONSTRAINT "FK_f8a7cb5801c766e6701d5c0048d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Binnacles" DROP CONSTRAINT "FK_62de33bf7e6e8b29d9d23eb1b86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Goals" ALTER COLUMN "startDate" SET DEFAULT '2022-05-09 08:15:08.533'`,
    );
    await queryRunner.query(`DROP TABLE "Binnacles"`);
    await queryRunner.query(`DROP TABLE "Moods"`);
  }
}
