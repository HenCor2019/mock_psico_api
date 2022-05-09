import {MigrationInterface, QueryRunner} from "typeorm";

export class testimonials1652074667075 implements MigrationInterface {
    name = 'testimonials1652074667075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "testimonials_categories_categories" ("testimonialsTestimonyId" integer NOT NULL, "categoriesCategoryId" integer NOT NULL, CONSTRAINT "PK_d33fd4147bb9264daa5be73cbf3" PRIMARY KEY ("testimonialsTestimonyId", "categoriesCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ecd26e6a991068e13cfbd8f0c" ON "testimonials_categories_categories" ("testimonialsTestimonyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_949c025ac52ef2d0ad2715c3e6" ON "testimonials_categories_categories" ("categoriesCategoryId") `);
        await queryRunner.query(`ALTER TABLE "testimonials_categories_categories" ADD CONSTRAINT "FK_9ecd26e6a991068e13cfbd8f0c3" FOREIGN KEY ("testimonialsTestimonyId") REFERENCES "Testimonials"("testimonyId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "testimonials_categories_categories" ADD CONSTRAINT "FK_949c025ac52ef2d0ad2715c3e6d" FOREIGN KEY ("categoriesCategoryId") REFERENCES "Categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testimonials_categories_categories" DROP CONSTRAINT "FK_949c025ac52ef2d0ad2715c3e6d"`);
        await queryRunner.query(`ALTER TABLE "testimonials_categories_categories" DROP CONSTRAINT "FK_9ecd26e6a991068e13cfbd8f0c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_949c025ac52ef2d0ad2715c3e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ecd26e6a991068e13cfbd8f0c"`);
        await queryRunner.query(`DROP TABLE "testimonials_categories_categories"`);
    }

}
